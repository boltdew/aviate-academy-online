
import type { MarkdownContent, ContentIndex } from '@/types/content';

// Safe imports with fallbacks for development
let contentIndex: ContentIndex = {};
let allContent: MarkdownContent[] = [];

// Try to import the virtual modules, with fallbacks
try {
  // These imports will work after the plugin processes the content
  const indexModule = await import('virtual:content-index');
  const allContentModule = await import('virtual:all-content');
  contentIndex = indexModule.default || {};
  allContent = allContentModule.default || [];
} catch (error) {
  console.log('Virtual content modules not available yet, using fallbacks');
  // Fallback to sample data for development
  const sampleContent: MarkdownContent = {
    id: '29-basics-principles',
    title: 'Hydraulic System Principles',
    slug: 'principles',
    ataChapter: '29',
    subSection: 'basics',
    content: 'Sample hydraulic system content...',
    frontmatter: { title: 'Hydraulic System Principles', difficulty: 'Beginner' },
    difficulty: 'Beginner',
    durationMinutes: 30,
    filePath: '29/basics/principles.md'
  };
  
  allContent = [sampleContent];
  contentIndex = {
    '29': {
      'basics': [sampleContent]
    }
  };
}

export class ContentService {
  private static contentIndex: ContentIndex = contentIndex;
  private static allContent: MarkdownContent[] = allContent;

  static getAllContent(): MarkdownContent[] {
    return this.allContent;
  }

  static getContentByChapter(ataChapter: string): MarkdownContent[] {
    const chapterContent = this.contentIndex[ataChapter];
    if (!chapterContent) return [];
    
    return Object.values(chapterContent).flat();
  }

  static getContentByChapterAndSection(ataChapter: string, subSection: string): MarkdownContent[] {
    return this.contentIndex[ataChapter]?.[subSection] || [];
  }

  static getContentById(id: string): MarkdownContent | undefined {
    return this.allContent.find(content => content.id === id);
  }

  static searchContent(query: string): MarkdownContent[] {
    const lowercaseQuery = query.toLowerCase();
    return this.allContent.filter(content => 
      content.title.toLowerCase().includes(lowercaseQuery) ||
      content.content.toLowerCase().includes(lowercaseQuery) ||
      content.ataChapter.toLowerCase().includes(lowercaseQuery) ||
      content.subSection?.toLowerCase().includes(lowercaseQuery)
    );
  }

  static getAvailableChapters(): string[] {
    return Object.keys(this.contentIndex);
  }

  static getChapterSections(ataChapter: string): string[] {
    return Object.keys(this.contentIndex[ataChapter] || {});
  }

  static getContentStats() {
    const totalContent = this.allContent.length;
    const chapters = Object.keys(this.contentIndex).length;
    const difficulties = this.allContent.reduce((acc, content) => {
      if (content.difficulty) {
        acc[content.difficulty] = (acc[content.difficulty] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalContent,
      chapters,
      difficulties,
    };
  }
}
