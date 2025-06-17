
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
