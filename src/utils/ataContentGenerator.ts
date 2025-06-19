
import type { MarkdownContent, ContentIndex } from '@/types/content';
import type { ContentStructure } from '@/types/ata';
import { ataStructure } from '@/data/ataStructure';
import { parseMarkdown } from './markdownParser';

// Import markdown files dynamically
const importMarkdownFiles = async () => {
  const markdownFiles: Record<string, string> = {};
  
  // Import all markdown files from the content directory
  const modules = import.meta.glob('/content/**/*.md', { as: 'raw' });
  
  for (const path in modules) {
    const content = await modules[path]();
    markdownFiles[path] = content;
  }
  
  return markdownFiles;
};

/**
 * Parses frontmatter from markdown content
 */
const parseFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }
  
  const frontmatterText = match[1];
  const contentWithoutFrontmatter = content.replace(frontmatterRegex, '');
  
  // Simple YAML parser for frontmatter
  const frontmatter: Record<string, any> = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Convert to number if possible
      if (!isNaN(Number(value)) && value !== '') {
        frontmatter[key] = Number(value);
      } else {
        frontmatter[key] = value;
      }
    }
  });
  
  return { frontmatter, content: contentWithoutFrontmatter };
};

/**
 * Extracts ATA chapter and section from file path
 */
const extractATAInfo = (filePath: string) => {
  // Remove /content/ prefix and .md suffix
  const cleanPath = filePath.replace('/content/', '').replace('.md', '');
  const parts = cleanPath.split('/');
  
  if (parts.length >= 2) {
    return {
      chapter: parts[0],
      section: parts[1],
      slug: parts[parts.length - 1]
    };
  }
  
  return null;
};

/**
 * Generates comprehensive ATA content data from markdown files
 */
export const createComprehensiveATAData = async () => {
  const markdownFiles = await importMarkdownFiles();
  const sampleContents: MarkdownContent[] = [];
  const index: ContentIndex = {};

  // Process each markdown file
  for (const [filePath, rawContent] of Object.entries(markdownFiles)) {
    const ataInfo = extractATAInfo(filePath);
    
    if (!ataInfo) continue;
    
    const { frontmatter, content } = parseFrontmatter(rawContent);
    const parsedContent = parseMarkdown(content);
    
    const markdownContent: MarkdownContent = {
      id: `${ataInfo.chapter}-${ataInfo.section}-${ataInfo.slug}`,
      title: frontmatter.title || `Chapter ${ataInfo.chapter} - ${ataInfo.section}`,
      slug: ataInfo.slug,
      ataChapter: ataInfo.chapter,
      subSection: ataInfo.section,
      content: parsedContent,
      frontmatter: frontmatter,
      difficulty: frontmatter.difficulty || 'Intermediate',
      durationMinutes: frontmatter.duration || 30,
      filePath: filePath.replace('/content/', '')
    };

    sampleContents.push(markdownContent);

    // Build index
    if (!index[ataInfo.chapter]) {
      index[ataInfo.chapter] = {};
    }
    if (!index[ataInfo.chapter][ataInfo.section]) {
      index[ataInfo.chapter][ataInfo.section] = [];
    }
    index[ataInfo.chapter][ataInfo.section].push(markdownContent);
  }

  return { index, contents: sampleContents };
};

/**
 * Builds content structure for UI components
 */
export const buildContentStructure = (contentIndex: ContentIndex): ContentStructure => {
  const structure: ContentStructure = {};
  
  Object.entries(contentIndex).forEach(([chapterCode, chapterData]) => {
    structure[chapterCode] = {
      title: ataStructure[chapterCode]?.title || `Chapter ${chapterCode}`,
      sections: {}
    };

    Object.entries(chapterData).forEach(([sectionKey, sectionContent]) => {
      structure[chapterCode].sections[sectionKey] = {
        files: sectionContent.map(content => ({
          id: content.id,
          title: content.title,
          slug: content.slug
        }))
      };
    });
  });

  return structure;
};
