
/**
 * Secure markdown to HTML converter with XSS protection
 */
export const parseMarkdown = (markdown: string): string => {
  // Validate input
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous content before processing
  let content = markdown
    // Remove script tags and their content
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    // Remove on* event handlers
    .replace(/\son\w+\s*=\s*['""][^'""]*['"]/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove data URLs that could contain HTML
    .replace(/data:text\/html[^)'""\s]*/gi, '');
  
  // Remove frontmatter (content between --- at the start)
  content = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Convert markdown to HTML with strict patterns
  content = content
    // Headers (limit to h1-h6)
    .replace(/^#{6}\s+(.*$)/gim, '<h6>$1</h6>')
    .replace(/^#{5}\s+(.*$)/gim, '<h5>$1</h5>')
    .replace(/^#{4}\s+(.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Code blocks (with safer handling)
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
