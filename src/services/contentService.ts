import type { MarkdownContent, ContentIndex } from '@/types/content';

// Initialize with fallback data
let contentIndex: ContentIndex = {};
let allContent: MarkdownContent[] = [];
let isInitialized = false;

// Simple markdown to HTML converter
const parseMarkdown = (markdown: string): string => {
  // Remove frontmatter (content between --- at the start)
  let content = markdown.replace(/^---[\s\S]*?---\n/, '');
  
  // Convert markdown to HTML
  content = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]*)`/gim, '<code>$1</code>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Line breaks
    .replace(/\n\n/gim, '</p><p>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|l|b|p])/gim, '<p>')
    .replace(/$/gim, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/gim, '')
    // Fix list wrapping
    .replace(/<p>(<li>.*<\/li>)<\/p>/gim, '<ul>$1</ul>')
    .replace(/<\/li><li>/gim, '</li><li>')
    // Fix blockquote wrapping
    .replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/gim, '$1')
    // Fix code block wrapping
    .replace(/<p>(<pre><code>[\s\S]*?<\/code><\/pre>)<\/p>/gim, '$1');

  return content;
};

// Create some sample data as fallback
const createSampleData = () => {
  const sampleContents: MarkdownContent[] = [
    {
      id: '21-basics-introduction',
      title: 'Air Conditioning System Introduction',
      slug: 'introduction',
      ataChapter: '21',
      subSection: 'basics',
      content: parseMarkdown(`# Air Conditioning System Introduction

## Overview

Aircraft air conditioning systems are essential for maintaining a comfortable and safe environment for passengers and crew during flight. These systems control temperature, humidity, and air quality within the aircraft cabin.

## Key Functions

### Temperature Control
- Maintain comfortable cabin temperature
- Adapt to varying external conditions
- Provide heating and cooling as needed

### Air Quality Management
- Filter incoming air
- Control humidity levels
- Ensure adequate ventilation

## System Components

### Air Cycle Machine (ACM)
The heart of the air conditioning system that:
- Compresses incoming air
- Cools the air through expansion
- Removes moisture from the air

### Heat Exchangers
- Primary heat exchanger
- Secondary heat exchanger
- Intercooler

## Operating Principles

The air conditioning system operates on the air cycle refrigeration principle, using compressed air from the engine compressor stages. This air is cooled, dried, and distributed throughout the cabin.

## Safety Considerations

⚠️ **Important**: Always follow proper procedures when:
- Servicing air conditioning components
- Checking system pressures
- Performing maintenance tasks

## Next Steps

Continue with:
- System components in detail
- Troubleshooting procedures
- Maintenance practices`),
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
      content: parseMarkdown(`# Air Distribution Systems

## Distribution Network

The air distribution system ensures that conditioned air reaches all areas of the aircraft cabin efficiently and evenly.

## Main Distribution Components

### Distribution Manifolds
- Primary distribution manifold
- Secondary distribution lines
- Individual cabin outlets

### Flow Control Valves
- Temperature control valves
- Volume control dampers
- Emergency shutoff valves

## Cabin Zones

### Passenger Cabin
- Overhead distribution
- Under-seat return air
- Individual passenger controls

### Flight Deck
- Dedicated temperature control
- Independent air supply
- Enhanced filtration

### Cargo Compartments
- Temperature monitoring
- Humidity control for sensitive cargo
- Emergency ventilation systems

## Air Flow Patterns

Understanding proper air flow ensures:
- Even temperature distribution
- Adequate air exchange rates
- Minimal contamination spread

## Maintenance Points

Regular inspection of:
- Distribution ducting
- Outlet grilles and filters
- Control valve operation
- Temperature sensors`),
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
      
      // Parse markdown content for all items
      allContent = allContent.map(item => ({
        ...item,
        content: parseMarkdown(item.content)
      }));
      
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

  static getSpecificContent(chapter: string, section: string, file: string): MarkdownContent | null {
    console.log(`🎯 ContentService.getSpecificContent(${chapter}, ${section}, ${file})`);
    const chapterContent = contentIndex[chapter];
    if (!chapterContent || !chapterContent[section]) {
      console.log(`❌ No content found for chapter ${chapter}, section ${section}`);
      return null;
    }
    
    const content = chapterContent[section].find(item => item.slug === file);
    if (content) {
      console.log(`✅ Found specific content: ${content.title}`);
      return content;
    } else {
      console.log(`❌ No content found for file ${file} in chapter ${chapter}, section ${section}`);
      return null;
    }
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

  static getContentStructure() {
    const structure: Record<string, { title: string; sections: Record<string, { files: Array<{ id: string; title: string; slug: string }> }> }> = {};
    
    // Chapter titles mapping
    const chapterTitles: Record<string, string> = {
      '21': 'Air Conditioning',
      '22': 'Auto Flight',
      '23': 'Communications',
      '24': 'Electrical Power',
      '25': 'Equipment and Furnishings',
      '26': 'Fire Protection',
      '27': 'Flight Controls',
      '28': 'Fuel',
      '29': 'Hydraulic Power',
      '30': 'Ice and Rain Protection',
      '31': 'Indicating-Recording Systems',
      '32': 'Landing Gear',
      '33': 'Lights',
      '34': 'Navigation',
      '35': 'Oxygen',
      '38': 'Water-Waste',
      '42': 'Integrated Modular Avionics',
      '44': 'Cabin Systems',
      '45': 'Central Maintenance System',
      '46': 'Information Systems',
      '47': 'Inert Gas System',
      '49': 'Airborne Auxiliary Power',
      '50': 'Cargo and Accessory Compartments'
    };

    Object.entries(contentIndex).forEach(([chapterCode, chapterData]) => {
      structure[chapterCode] = {
        title: chapterTitles[chapterCode] || `Chapter ${chapterCode}`,
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
