
export interface ATAStructure {
  [chapterCode: string]: {
    title: string;
    sections: {
      [sectionCode: string]: {
        title: string;
        items: string[];
      };
    };
  };
}

export interface ContentMapping {
  [ataCode: string]: string;
}

export interface ContentStats {
  totalContent: number;
  chapters: number;
  difficulties: Record<string, number>;
}

export interface ContentStructure {
  [chapterCode: string]: {
    title: string;
    sections: {
      [sectionKey: string]: {
        files: Array<{
          id: string;
          title: string;
          slug: string;
        }>;
      };
    };
  };
}
