import { Note } from '@/types/note';

export const getNotes = (): Note[] => {
  if (typeof window !== 'undefined') {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  }
  return [];
};

export const saveNote = (note: Note): Note[] => {
  const notes = getNotes();
  const existing = notes.findIndex(n => n.id === note.id);
  if (existing >= 0) {
    notes[existing] = note;
  } else {
    notes.push(note);
  }
  localStorage.setItem('notes', JSON.stringify(notes));
  return notes;
};

export const deleteNote = (id: string): Note[] => {
  const notes = getNotes().filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
  return notes;
}; 