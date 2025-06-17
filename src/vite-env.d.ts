
/// <reference types="vite/client" />

// Virtual module declarations for markdown processor
declare module 'virtual:content-index' {
  import type { ContentIndex } from '@/types/content';
  const contentIndex: ContentIndex;
  export default contentIndex;
}

declare module 'virtual:all-content' {
  import type { MarkdownContent } from '@/types/content';
  const allContent: MarkdownContent[];
  export default allContent;
}

declare module 'virtual:content/*' {
  import type { MarkdownContent } from '@/types/content';
  const content: MarkdownContent[];
  export default content;
}
