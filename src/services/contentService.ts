
import type { MarkdownContent, ContentIndex } from '@/types/content';

// Import the processed content at build time
import contentIndex from 'virtual:content-index';
import allContent from 'virtual:all-content';

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
