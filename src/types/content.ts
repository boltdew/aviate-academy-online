
export interface MarkdownContent {
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

export interface ContentIndex {
  [ataChapter: string]: {
    [subSection: string]: MarkdownContent[];
  };
}

// Virtual module declarations
declare module 'virtual:content-index' {
  const contentIndex: ContentIndex;
  export default contentIndex;
}

declare module 'virtual:all-content' {
  const allContent: MarkdownContent[];
  export default allContent;
}

declare module 'virtual:content/*' {
  const content: MarkdownContent[];
  export default content;
}
