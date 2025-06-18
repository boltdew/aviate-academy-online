
export interface Bookmark {
  id: string;
  contentId: string;
  title: string;
  chapter: string;
  section: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  contentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BookmarkService {
  private static BOOKMARKS_KEY = 'aerolearn_bookmarks';
  private static NOTES_KEY = 'aerolearn_notes';

  static getBookmarks(): Bookmark[] {
    const stored = localStorage.getItem(this.BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static addBookmark(contentId: string, title: string, chapter: string, section: string): void {
    const bookmarks = this.getBookmarks();
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      contentId,
      title,
      chapter,
      section,
      createdAt: new Date()
    };
    bookmarks.push(newBookmark);
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }

  static removeBookmark(contentId: string): void {
    const bookmarks = this.getBookmarks().filter(b => b.contentId !== contentId);
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }

  static isBookmarked(contentId: string): boolean {
    return this.getBookmarks().some(b => b.contentId === contentId);
  }

  static getNotes(): Note[] {
    const stored = localStorage.getItem(this.NOTES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getNote(contentId: string): Note | null {
    return this.getNotes().find(n => n.contentId === contentId) || null;
  }

  static saveNote(contentId: string, content: string): void {
    const notes = this.getNotes();
    const existingIndex = notes.findIndex(n => n.contentId === contentId);
    
    if (existingIndex >= 0) {
      notes[existingIndex] = {
        ...notes[existingIndex],
        content,
        updatedAt: new Date()
      };
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        contentId,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      notes.push(newNote);
    }
    
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  static deleteNote(contentId: string): void {
    const notes = this.getNotes().filter(n => n.contentId !== contentId);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }
}
