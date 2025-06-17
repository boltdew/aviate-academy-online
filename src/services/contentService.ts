
import type { MarkdownContent, ContentIndex } from '@/types/content';

// Initialize with fallback data
let contentIndex: ContentIndex = {};
let allContent: MarkdownContent[] = [];
let isInitialized = false;

// Create some sample data as fallback
const createSampleData = () => {
  const sampleContents: MarkdownContent[] = [
    {
      id: '21-basics-introduction',
      title: 'Air Conditioning System Introduction',
      slug: 'introduction',
      ataChapter: '21',
      subSection: 'basics',
      content: 'Aircraft air conditioning systems are essential for maintaining a comfortable and safe environment...',
      frontmatter: { title: 'Air Conditioning System Introduction', difficulty: 'Beginner', duration: 25 },
      difficulty: 'Beginner',
      durationMinutes: 25,
      filePath: '21/basics/introduction.md'
    },
    {
      id: '21-systems-distribution',
      title: 'Air Distribution Systems',
      slug: 'distribution',
      ataChapter: '21',
      subSection: 'systems',
      content: 'The air distribution system ensures that conditioned air reaches all areas of the aircraft cabin...',
      frontmatter: { title: 'Air Distribution Systems', difficulty: 'Intermediate', duration: 35 },
      difficulty: 'Intermediate',
      durationMinutes: 35,
      filePath: '21/systems/distribution.md'
    },
    {
      id: '29-basics-principles',
      title: 'Hydraulic System Principles',
      slug: 'principles',
      ataChapter: '29',
      subSection: 'basics',
      content: 'Hydraulic systems are essential components in modern aircraft, providing the power needed...',
      frontmatter: { title: 'Hydraulic System Principles', difficulty: 'Beginner', duration: 30 },
      difficulty: 'Beginner',
      durationMinutes: 30,
      filePath: '29/basics/principles.md'
    },
    {
      id: '27-primary-elevators',
      title: 'Elevator Control Systems',
      slug: 'elevators',
      ataChapter: '27',
      subSection: 'primary',
      content: 'Elevator control systems provide longitudinal (pitch) control of the aircraft...',
      frontmatter: { title: 'Elevator Control Systems', difficulty: 'Intermediate', duration: 45 },
      difficulty: 'Intermediate',
      durationMinutes: 45,
      filePath: '27/primary/elevators.md'
    },
    {
      id: '32-systems-retraction',
      title: 'Landing Gear Retraction Systems',
      slug: 'retraction',
      ataChapter: '32',
      subSection: 'systems',
      content: 'Landing gear retraction systems allow aircraft to retract and extend the landing gear...',
      frontmatter: { title: 'Landing Gear Retraction Systems', difficulty: 'Intermediate', duration: 55 },
      difficulty: 'Intermediate',
      durationMinutes: 55,
      filePath: '32/systems/retraction.md'
    }
  ];

  // Build the content index
  const index: ContentIndex = {};
  sampleContents.forEach(content => {
    const chapter = content.ataChapter;
    const section = content.subSection || 'main';
    
    if (!index[chapter]) {
      index[chapter] = {};
    }
    if (!index[chapter][section]) {
      index[chapter][section] = [];
    }
    
    index[chapter][section].push(content);
  });

  return { index, contents: sampleContents };
};

// Initialize content asynchronously
const initializeContent = async () => {
  if (isInitialized) return;
  
  try {
    console.log('🔄 Attempting to load virtual content modules...');
    
    // Try to load virtual modules
    const indexModule = await import('virtual:content-index');
    const allContentModule = await import('virtual:all-content');
    
    if (indexModule.default && Object.keys(indexModule.default).length > 0) {
      contentIndex = indexModule.default;
      allContent = allContentModule.default || [];
      console.log(`✅ Loaded ${allContent.length} content items from virtual modules`);
    } else {
      throw new Error('Virtual modules are empty');
    }
  } catch (error) {
    console.log('⚠️ Virtual content modules not available, using sample data');
    const sampleData = createSampleData();
    contentIndex = sampleData.index;
    allContent = sampleData.contents;
    console.log(`📚 Using ${allContent.length} sample content items`);
  }
  
  isInitialized = true;
};

// Initialize immediately
initializeContent();

export class ContentService {
  static async ensureInitialized() {
    if (!isInitialized) {
      await initializeContent();
    }
  }

  static getAllContent(): MarkdownContent[] {
    console.log(`📖 ContentService.getAllContent() returning ${allContent.length} items`);
    return allContent;
  }

  static getContentByChapter(ataChapter: string): MarkdownContent[] {
    console.log(`🔍 ContentService.getContentByChapter(${ataChapter})`);
    const chapterContent = contentIndex[ataChapter];
    if (!chapterContent) {
      console.log(`❌ No content found for chapter ${ataChapter}`);
      return [];
    }
    
    const result = Object.values(chapterContent).flat();
    console.log(`✅ Found ${result.length} items for chapter ${ataChapter}`);
    return result;
  }

  static getContentByChapterAndSection(ataChapter: string, subSection: string): MarkdownContent[] {
    return contentIndex[ataChapter]?.[subSection] || [];
  }

  static getContentById(id: string): MarkdownContent | undefined {
    return allContent.find(content => content.id === id);
  }

  static searchContent(query: string): MarkdownContent[] {
    const lowercaseQuery = query.toLowerCase();
    const results = allContent.filter(content => 
      content.title.toLowerCase().includes(lowercaseQuery) ||
      content.content.toLowerCase().includes(lowercaseQuery) ||
      content.ataChapter.toLowerCase().includes(lowercaseQuery) ||
      content.subSection?.toLowerCase().includes(lowercaseQuery)
    );
    console.log(`🔍 Search for "${query}" returned ${results.length} results`);
    return results;
  }

  static getAvailableChapters(): string[] {
    const chapters = Object.keys(contentIndex);
    console.log(`📋 Available chapters: ${chapters.join(', ')}`);
    return chapters;
  }

  static getChapterSections(ataChapter: string): string[] {
    return Object.keys(contentIndex[ataChapter] || {});
  }

  static getContentStats() {
    const totalContent = allContent.length;
    const chapters = Object.keys(contentIndex).length;
    const difficulties = allContent.reduce((acc, content) => {
      if (content.difficulty) {
        acc[content.difficulty] = (acc[content.difficulty] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    console.log(`📊 Content stats: ${totalContent} total, ${chapters} chapters`);
    return {
      totalContent,
      chapters,
      difficulties,
    };
  }
}
