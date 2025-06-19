
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
      const bookmarks = this.getBookmarks();
      const existing = bookmarks.find(b => b.id === id);
      
      if (!existing) {
        const newBookmark: Bookmark = {
          id,
          title,
          chapter,
          section,
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
      const bookmarks = this.getBookmarks();
      const filtered = bookmarks.filter(b => b.id !== id);
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(filtered));
      console.log('🗑️ Bookmark removed:', id);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  }

  static isBookmarked(id: string): boolean {
    try {
      const bookmarks = this.getBookmarks();
      return bookmarks.some(b => b.id === id);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  }

  static saveNote(id: string, content: string): void {
    try {
      const notes = this.getNotes();
      const note: Note = {
        id,
        content,
        timestamp: Date.now()
      };
      notes[id] = note;
      localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
      console.log('📝 Note saved:', id);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }

  static getNote(id: string): Note | null {
    try {
      const notes = this.getNotes();
      return notes[id] || null;
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
