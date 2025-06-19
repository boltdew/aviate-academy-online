
import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { parseMarkdown } from '@/utils/markdownParser';

interface SecureMarkdownProps {
  content: string;
  className?: string;
}

export function SecureMarkdown({ content, className = '' }: SecureMarkdownProps) {
  const sanitizedHtml = useMemo(() => {
    // Parse markdown to HTML
    const htmlContent = parseMarkdown(content);
    
    // Sanitize the HTML to prevent XSS attacks
    const cleanHtml = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'code', 'pre',
        'ul', 'ol', 'li', 'blockquote', 'table',
        'thead', 'tbody', 'tr', 'th', 'td'
      ],
      ALLOWED_ATTR: ['class'],
      KEEP_CONTENT: true,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false
    });
    
    return cleanHtml;
  }, [content]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
