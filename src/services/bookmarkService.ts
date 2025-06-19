
import { InputValidator } from '@/utils/inputValidator';

interface Bookmark {
  id: string;
  title: string;
  chapter: string;
  section: string;
  timestamp: number;
}

interface Note {
  id: string;
  content: string;
  timestamp: number;
}

export class BookmarkService {
  private static BOOKMARKS_KEY = 'aerolearn_bookmarks';
  private static NOTES_KEY = 'aerolearn_notes';

  static getBookmarks(): Bookmark[] {
    try {
      const stored = localStorage.getItem(this.BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  }

  static addBookmark(id: string, title: string, chapter: string, section: string): void {
    try {
      // Validate inputs
      const titleValidation = InputValidator.validateNote(title);
      if (!titleValidation.isValid) {
        console.error('Invalid bookmark title:', titleValidation.errors);
        return;
      }

      const bookmarks = this.getBookmarks();
      const existing = bookmarks.find(b => b.id === id);
      
      if (!existing) {
        const newBookmark: Bookmark = {
          id: id.replace(/[<>'"]/g, ''), // Basic sanitization for ID
          title: titleValidation.sanitizedValue,
          chapter: chapter.replace(/[<>'"]/g, ''),
          section: section.replace(/[<>'"]/g, ''),
          timestamp: Date.now()
        };
        bookmarks.push(newBookmark);
        localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
        console.log('✅ Bookmark added:', id);
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  }

  static removeBookmark(id: string): void {
    try {
      const sanitizedId = id.replace(/[<>'"]/g, '');
      const bookmarks = this.getBookmarks();
      const filtered = bookmarks.filter(b => b.id !== sanitizedId);
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(filtered));
      console.log('🗑️ Bookmark removed:', sanitizedId);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  }

  static isBookmarked(id: string): boolean {
    try {
      const sanitizedId = id.replace(/[<>'"]/g, '');
      const bookmarks = this.getBookmarks();
      return bookmarks.some(b => b.id === sanitizedId);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  }

  static saveNote(id: string, content: string): boolean {
    try {
      // Validate note content
      const validation = InputValidator.validateNote(content);
      if (!validation.isValid) {
        console.error('Invalid note content:', validation.errors);
        return false;
      }

      const notes = this.getNotes();
      const note: Note = {
        id: id.replace(/[<>'"]/g, ''),
        content: validation.sanitizedValue,
        timestamp: Date.now()
      };
      notes[note.id] = note;
      localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
      console.log('📝 Note saved:', note.id);
      return true;
    } catch (error) {
      console.error('Error saving note:', error);
      return false;
    }
  }

  static getNote(id: string): Note | null {
    try {
      const sanitizedId = id.replace(/[<>'"]/g, '');
      const notes = this.getNotes();
      return notes[sanitizedId] || null;
    } catch (error) {
      console.error('Error loading note:', error);
      return null;
    }
  }

  private static getNotes(): Record<string, Note> {
    try {
      const stored = localStorage.getItem(this.NOTES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading notes:', error);
      return {};
    }
  }
}
