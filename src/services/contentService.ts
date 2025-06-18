
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

// Create comprehensive ATA content data
const createComprehensiveATAData = () => {
  const ataStructure = {
    '21': {
      title: 'AIR CONDITIONING',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'COMPRESSION', items: ['01'] },
        '20': { title: 'TEMPERATURE CONTROL', items: ['01'] }
      }
    },
    '22': {
      title: 'AUTO FLIGHT',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'AUTOPILOT', items: ['01'] },
        '20': { title: 'SPEED/ATTITUDE CORRECTION', items: ['01'] }
      }
    },
    '23': {
      title: 'COMMUNICATIONS',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'SPEECH COMMUNICATIONS', items: ['01'] },
        '20': { title: 'DATA TRANSMISSION', items: ['01'] }
      }
    },
    '24': {
      title: 'ELECTRICAL POWER',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'GENERATION', items: ['01'] },
        '20': { title: 'DISTRIBUTION', items: ['01'] }
      }
    },
    '25': {
      title: 'EQUIPMENT/FURNISHINGS',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'FLIGHT COMPARTMENT', items: ['01'] },
        '20': { title: 'PASSENGER COMPARTMENT', items: ['01'] }
      }
    },
    '26': {
      title: 'FIRE PROTECTION',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'DETECTION', items: ['01'] },
        '20': { title: 'EXTINGUISHING', items: ['01'] }
      }
    },
    '27': {
      title: 'FLIGHT CONTROLS',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'AILERON & TAB', items: ['01'] },
        '20': { title: 'RUDDER', items: ['01'] }
      }
    },
    '28': {
      title: 'FUEL',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'STORAGE', items: ['01'] },
        '20': { title: 'DISTRIBUTION', items: ['01'] }
      }
    },
    '29': {
      title: 'HYDRAULIC POWER',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'MAIN SYSTEM', items: ['01'] },
        '20': { title: 'AUXILIARY SYSTEM', items: ['01'] }
      }
    },
    '30': {
      title: 'ICE & RAIN PROTECTION',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'WING ANTI-ICE', items: ['01'] },
        '20': { title: 'WINDSHIELD ANTI-ICE', items: ['01'] }
      }
    },
    '32': {
      title: 'LANDING GEAR',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'MAIN GEAR', items: ['01'] },
        '20': { title: 'NOSE GEAR', items: ['01'] }
      }
    },
    '33': {
      title: 'LIGHTS',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'FLIGHT COMPARTMENT', items: ['01'] },
        '20': { title: 'CABIN LIGHTS', items: ['01'] }
      }
    },
    '34': {
      title: 'NAVIGATION',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'FLIGHT ENVIRONMENT DATA', items: ['01'] },
        '20': { title: 'ATTITUDE & DIRECTION', items: ['01'] }
      }
    },
    '35': {
      title: 'OXYGEN',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'CREW OXYGEN', items: ['01'] },
        '20': { title: 'PASSENGER OXYGEN', items: ['01'] }
      }
    },
    '36': {
      title: 'PNEUMATIC',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'PRESSURE CONTROL', items: ['01'] }
      }
    },
    '38': {
      title: 'WATER/WASTE',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'POTABLE WATER', items: ['01'] },
        '20': { title: 'WASTE DISPOSAL', items: ['01'] }
      }
    },
    '49': {
      title: 'AUXILIARY POWER UNIT (APU)',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'POWER PLANT', items: ['01'] },
        '20': { title: 'FUEL & AIR', items: ['01'] }
      }
    },
    '52': {
      title: 'DOORS',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'PASSENGER/CREW DOORS', items: ['01'] },
        '20': { title: 'CARGO DOORS', items: ['01'] }
      }
    },
    '70': {
      title: 'ENGINE (GENERAL)',
      sections: {
        '00': { title: 'GENERAL', items: ['01'] },
        '10': { title: 'INSPECTION', items: ['01'] },
        '20': { title: 'CLEANING/STRIPPING', items: ['01'] }
      }
    }
  };

  const contentMapping = {
    '21-00-01': 'System Description',
    '21-10-01': 'Air Cycle Machine',
    '21-20-01': 'Cabin Temperature Regulation',
    '22-00-01': 'Autopilot System',
    '22-10-01': 'Flight Director',
    '22-20-01': 'Yaw Damper',
    '23-00-01': 'VHF System',
    '23-10-01': 'Cockpit Audio',
    '23-20-01': 'ACARS',
    '24-00-01': 'Electrical System Overview',
    '24-10-01': 'IDG (Integrated Drive Generator)',
    '24-20-01': 'Bus Transfer',
    '25-00-01': 'Cabin Layout',
    '25-10-01': 'Pilot Seats',
    '25-20-01': 'Overhead Bins',
    '26-00-01': 'Fire Detection System',
    '26-10-01': 'Smoke Detectors',
    '26-20-01': 'Fire Bottles',
    '27-00-01': 'Primary Flight Controls',
    '27-10-01': 'Aileron Actuation',
    '27-20-01': 'Rudder Pedal Mechanism',
    '28-00-01': 'Fuel System Overview',
    '28-10-01': 'Center Tank',
    '28-20-01': 'Fuel Pumps',
    '29-00-01': 'Hydraulic Reservoirs',
    '29-10-01': 'Engine-Driven Pumps',
    '29-20-01': 'Power Transfer Unit',
    '30-00-01': 'Anti-Ice System',
    '30-10-01': 'Leading Edge Slats',
    '30-20-01': 'Heated Windows',
    '32-00-01': 'Landing Gear Doors',
    '32-10-01': 'Shock Strut',
    '32-20-01': 'Steering System',
    '33-00-01': 'Exterior Lighting',
    '33-10-01': 'Instrument Panel Lights',
    '33-20-01': 'Emergency Path Lighting',
    '34-00-01': 'GPS System',
    '34-10-01': 'Air Data Computers',
    '34-20-01': 'Inertial Reference Units',
    '35-00-01': 'Oxygen Masks',
    '35-10-01': 'Quick-Donning Masks',
    '35-20-01': 'Chemical Generators',
    '36-00-01': 'Bleed Air System',
    '36-10-01': 'Bleed Valves',
    '38-00-01': 'Lavatory System',
    '38-10-01': 'Water Tanks',
    '38-20-01': 'Vacuum Toilets',
    '49-00-01': 'APU Controls',
    '49-10-01': 'APU Starter',
    '49-20-01': 'APU Fuel Feed',
    '52-00-01': 'Emergency Exits',
    '52-10-01': 'Slide Deployment',
    '52-20-01': 'Cargo Door Actuation',
    '70-00-01': 'Engine Removal/Installation',
    '70-10-01': 'Fan Blade Inspection',
    '70-20-01': 'Compressor Washing'
  };

  const sampleContents: MarkdownContent[] = [];
  const index: ContentIndex = {};

  // Generate content for each ATA item
  Object.entries(ataStructure).forEach(([chapter, chapterData]) => {
    Object.entries(chapterData.sections).forEach(([section, sectionData]) => {
      sectionData.items.forEach(item => {
        const ataCode = `${chapter}-${section}-${item}`;
        const title = contentMapping[ataCode] || `${chapterData.title} - ${sectionData.title}`;
        
        const content: MarkdownContent = {
          id: `${chapter}-${section}-${item}`,
          title: title,
          slug: `${chapter}-${section}-${item}`,
          ataChapter: chapter,
          subSection: `${section}`,
          content: parseMarkdown(`# ${title}

## Overview
This section covers the ${title.toLowerCase()} within the ${chapterData.title.toLowerCase()} system of the aircraft.

## Technical Details
The ${title.toLowerCase()} is a critical component that ensures proper operation of the ${chapterData.title.toLowerCase()} system.

### Key Features
- Advanced engineering design
- Redundant safety systems
- Efficient operation protocols
- Maintenance-friendly architecture

### System Integration
This component integrates seamlessly with other aircraft systems to provide:
- Reliable performance
- Safety compliance
- Operational efficiency
- Regulatory adherence

## Maintenance Procedures
Regular inspection and maintenance of the ${title.toLowerCase()} includes:
1. Visual inspection protocols
2. Functional testing procedures
3. Calibration requirements
4. Replacement schedules

## Safety Considerations
⚠️ **Important Safety Notes:**
- Follow all manufacturer guidelines
- Use proper personal protective equipment
- Verify system isolation before maintenance
- Document all maintenance actions

## Technical Specifications
- Operating temperature range: -40°C to +70°C
- Pressure rating: As per manufacturer specifications
- Material specifications: Aircraft-grade materials
- Certification: FAA/EASA approved

## Troubleshooting Guide
Common issues and their solutions:
- System performance degradation
- Unusual operational noise
- Warning light activation
- Communication interface problems

For detailed troubleshooting procedures, refer to the aircraft maintenance manual.`),
          frontmatter: { 
            title: title, 
            difficulty: 'Intermediate', 
            duration: 30,
            ataCode: ataCode
          },
          difficulty: 'Intermediate',
          durationMinutes: 30,
          filePath: `${chapter}/${section}/${ataCode}.md`
        };

        sampleContents.push(content);

        // Build index
        if (!index[chapter]) {
          index[chapter] = {};
        }
        if (!index[chapter][section]) {
          index[chapter][section] = [];
        }
        index[chapter][section].push(content);
      });
    });
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
    console.log('⚠️ Virtual content modules not available, using comprehensive ATA data');
    const ataData = createComprehensiveATAData();
    contentIndex = ataData.index;
    allContent = ataData.contents;
    console.log(`📚 Using ${allContent.length} comprehensive ATA content items`);
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
    
    // Chapter titles mapping - comprehensive ATA structure
    const chapterTitles: Record<string, string> = {
      '21': 'AIR CONDITIONING',
      '22': 'AUTO FLIGHT',
      '23': 'COMMUNICATIONS',
      '24': 'ELECTRICAL POWER',
      '25': 'EQUIPMENT/FURNISHINGS',
      '26': 'FIRE PROTECTION',
      '27': 'FLIGHT CONTROLS',
      '28': 'FUEL',
      '29': 'HYDRAULIC POWER',
      '30': 'ICE & RAIN PROTECTION',
      '32': 'LANDING GEAR',
      '33': 'LIGHTS',
      '34': 'NAVIGATION',
      '35': 'OXYGEN',
      '36': 'PNEUMATIC',
      '38': 'WATER/WASTE',
      '49': 'AUXILIARY POWER UNIT (APU)',
      '52': 'DOORS',
      '70': 'ENGINE (GENERAL)'
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
