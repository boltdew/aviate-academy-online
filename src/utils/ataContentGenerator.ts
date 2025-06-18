
import type { MarkdownContent, ContentIndex } from '@/types/content';
import type { ContentStructure } from '@/types/ata';
import { ataStructure, contentMapping } from '@/data/ataStructure';
import { parseMarkdown } from './markdownParser';

/**
 * Generates comprehensive ATA content data
 */
export const createComprehensiveATAData = () => {
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
          content: parseMarkdown(generateContentMarkdown(title, chapterData.title)),
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

/**
 * Generates markdown content for a given title and chapter
 */
const generateContentMarkdown = (title: string, chapterTitle: string): string => {
  return `# ${title}

## Overview
This section covers the ${title.toLowerCase()} within the ${chapterTitle.toLowerCase()} system of the aircraft.

## Technical Details
The ${title.toLowerCase()} is a critical component that ensures proper operation of the ${chapterTitle.toLowerCase()} system.

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

For detailed troubleshooting procedures, refer to the aircraft maintenance manual.`;
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
