
import type { MarkdownContent, ContentIndex } from '@/types/content';
import type { ContentStructure } from '@/types/ata';
import { createComprehensiveATAData, buildContentStructure } from '@/utils/ataContentGenerator';

export class ContentService {
  private static contentIndex: ContentIndex | null = null;
  private static contents: MarkdownContent[] = [];
  private static contentStructure: ContentStructure | null = null;
  private static initialized = false;

  private static async initialize() {
    if (this.initialized) return;
    
    try {
      const { index, contents } = await createComprehensiveATAData();
      this.contentIndex = index;
      this.contents = contents;
      this.contentStructure = buildContentStructure(index);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize content:', error);
      // Fallback to empty data
      this.contentIndex = {};
      this.contents = [];
      this.contentStructure = {};
      this.initialized = true;
    }
  }

  static async getContentStructure(): Promise<ContentStructure> {
    await this.initialize();
    return this.contentStructure || {};
  }

  static async getContentByChapterAndSection(chapter: string, section: string): Promise<MarkdownContent[]> {
    await this.initialize();
    return this.contentIndex?.[chapter]?.[section] || [];
  }

  static async getSpecificContent(chapter: string, section: string, slug: string): Promise<MarkdownContent | null> {
    const sectionContents = await this.getContentByChapterAndSection(chapter, section);
    return sectionContents.find(content => content.slug === slug) || null;
  }

  static async getAllContents(): Promise<MarkdownContent[]> {
    await this.initialize();
    return this.contents;
  }

  static async searchContents(query: string): Promise<MarkdownContent[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    const contents = await this.getAllContents();
    const lowercaseQuery = query.toLowerCase().trim();
    console.log(`🔍 Searching for: "${lowercaseQuery}"`);
    
    const results = contents.filter(content => {
      const titleMatch = content.title.toLowerCase().includes(lowercaseQuery);
      const contentMatch = content.content.toLowerCase().includes(lowercaseQuery);
      const chapterMatch = content.ataChapter.includes(lowercaseQuery);
      const sectionMatch = content.subSection?.toLowerCase().includes(lowercaseQuery);
      
      return titleMatch || contentMatch || chapterMatch || sectionMatch;
    });

    console.log(`✅ Found ${results.length} search results`);
    return results;
  }

  static async getContentStats() {
    const contents = await this.getAllContents();
    const contentIndex = await this.initialize().then(() => this.contentIndex || {});
    
    return {
      totalContent: contents.length,
      chapters: Object.keys(contentIndex).length,
      difficulties: contents.reduce((acc, content) => {
        acc[content.difficulty] = (acc[content.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}
