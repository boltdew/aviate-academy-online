
/**
 * Simple markdown to HTML converter
 */
export const parseMarkdown = (markdown: string): string => {
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
