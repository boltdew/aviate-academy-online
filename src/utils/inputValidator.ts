
import DOMPurify from 'dompurify';

export interface ValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errors: string[];
}

export class InputValidator {
  static readonly MAX_NOTE_LENGTH = 10000;
  static readonly MAX_TITLE_LENGTH = 200;

  static validateNote(input: string): ValidationResult {
    const errors: string[] = [];
    
    // Check length
    if (input.length > this.MAX_NOTE_LENGTH) {
      errors.push(`Note cannot exceed ${this.MAX_NOTE_LENGTH} characters`);
    }
    
    // Sanitize the input
    const sanitizedValue = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    }).trim();
    
    // Check for potentially malicious patterns
    const suspiciousPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /data:text\/html/gi
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(input)) {
        errors.push('Input contains potentially unsafe content');
        break;
      }
    }
    
    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    };
  }

  static validateSearchQuery(input: string): ValidationResult {
    const errors: string[] = [];
    
    // Check length
    if (input.length > 100) {
      errors.push('Search query cannot exceed 100 characters');
    }
    
    // Basic sanitization
    const sanitizedValue = input.replace(/[<>'"]/g, '').trim();
    
    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    };
  }
}
