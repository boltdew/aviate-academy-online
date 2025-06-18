
import type { MarkdownContent, ContentIndex } from '@/types/content';
import type { ContentStructure } from '@/types/ata';
import { createComprehensiveATAData, buildContentStructure } from '@/utils/ataContentGenerator';

export class ContentService {
  private static contentIndex: ContentIndex;
  private static contents: MarkdownContent[];
  private static contentStructure: ContentStructure;

  static {
    const { index, contents } = createComprehensiveATAData();
    this.contentIndex = index;
    this.contents = contents;
    this.contentStructure = buildContentStructure(index);
  }

  static getContentStructure(): ContentStructure {
    return this.contentStructure;
  }

  static getContentByChapterAndSection(chapter: string, section: string): MarkdownContent[] {
    return this.contentIndex[chapter]?.[section] || [];
  }

  static getSpecificContent(chapter: string, section: string, slug: string): MarkdownContent | null {
    const sectionContents = this.getContentByChapterAndSection(chapter, section);
    return sectionContents.find(content => content.slug === slug) || null;
  }

  static getAllContents(): MarkdownContent[] {
    return this.contents;
  }

  static searchContents(query: string): MarkdownContent[] {
    const lowercaseQuery = query.toLowerCase();
    return this.contents.filter(content =>
      content.title.toLowerCase().includes(lowercaseQuery) ||
      content.content.toLowerCase().includes(lowercaseQuery)
    );
  }

  static getContentStats() {
    return {
      totalContent: this.contents.length,
      chapters: Object.keys(this.contentIndex).length,
      difficulties: this.contents.reduce((acc, content) => {
        acc[content.difficulty] = (acc[content.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}
