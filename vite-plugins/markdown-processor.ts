
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface MarkdownContent {
  id: string;
  title: string;
  slug: string;
  ataChapter: string;
  subSection?: string;
  content: string;
  frontmatter: Record<string, any>;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes?: number;
  filePath: string;
}

interface ContentIndex {
  [ataChapter: string]: {
    [subSection: string]: MarkdownContent[];
  };
}

export function markdownProcessor(): Plugin {
  let contentIndex: ContentIndex = {};
  let allContent: MarkdownContent[] = [];

  const processMarkdownFiles = (contentDir: string) => {
    const processDirectory = (dir: string, ataChapter?: string, subSection?: string): void => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          // Determine ATA chapter and subsection from directory structure
          const dirName = item;
          if (!ataChapter) {
            // Top level directory is ATA chapter
            processDirectory(itemPath, dirName);
          } else {
            // Subdirectory is subsection
            processDirectory(itemPath, ataChapter, dirName);
          }
        } else if (item.endsWith('.md')) {
          // Process markdown file
          const fileContent = fs.readFileSync(itemPath, 'utf-8');
          const { data: frontmatter, content } = matter(fileContent);
          
          const slug = path.basename(item, '.md');
          const id = `${ataChapter || 'general'}-${subSection || 'main'}-${slug}`;
          
          const markdownContent: MarkdownContent = {
            id,
            title: frontmatter.title || slug.replace(/-/g, ' '),
            slug,
            ataChapter: ataChapter || frontmatter.ataChapter || 'general',
            subSection: subSection || frontmatter.subSection,
            content,
            frontmatter,
            difficulty: frontmatter.difficulty,
            durationMinutes: frontmatter.duration || frontmatter.durationMinutes,
            filePath: path.relative(contentDir, itemPath),
          };
          
          // Add to index
          const chapter = markdownContent.ataChapter;
          const section = markdownContent.subSection || 'main';
          
          if (!contentIndex[chapter]) {
            contentIndex[chapter] = {};
          }
          if (!contentIndex[chapter][section]) {
            contentIndex[chapter][section] = [];
          }
          
          contentIndex[chapter][section].push(markdownContent);
          allContent.push(markdownContent);
        }
      }
    };

    if (fs.existsSync(contentDir)) {
      processDirectory(contentDir);
    }
  };

  return {
    name: 'markdown-processor',
    buildStart() {
      // Process markdown files at build start
      const contentDir = path.resolve(process.cwd(), 'content');
      contentIndex = {};
      allContent = [];
      processMarkdownFiles(contentDir);
      
      console.log(`📚 Processed ${allContent.length} markdown files across ${Object.keys(contentIndex).length} ATA chapters`);
    },
    resolveId(id) {
      if (id === 'virtual:content-index') {
        return id;
      }
      if (id === 'virtual:all-content') {
        return id;
      }
      if (id.startsWith('virtual:content/')) {
        return id;
      }
    },
    load(id) {
      if (id === 'virtual:content-index') {
        return `export default ${JSON.stringify(contentIndex, null, 2)};`;
      }
      if (id === 'virtual:all-content') {
        return `export default ${JSON.stringify(allContent, null, 2)};`;
      }
      if (id.startsWith('virtual:content/')) {
        const [, chapter, section] = id.replace('virtual:content/', '').split('/');
        const chapterContent = contentIndex[chapter];
        if (chapterContent) {
          const sectionContent = section ? chapterContent[section] : chapterContent;
          return `export default ${JSON.stringify(sectionContent, null, 2)};`;
        }
        return 'export default [];';
      }
    },
    handleHotUpdate({ file }) {
      // Re-process content on file changes in development
      if (file.includes('/content/') && file.endsWith('.md')) {
        const contentDir = path.resolve(process.cwd(), 'content');
        contentIndex = {};
        allContent = [];
        processMarkdownFiles(contentDir);
        console.log(`🔄 Reprocessed content due to change in ${path.basename(file)}`);
      }
    },
  };
}
