import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotesState {
  topicNotes: Record<string, string>;
  
  saveNote: (topicId: string, content: string) => void;
  getNote: (topicId: string) => string;
  clearNote: (topicId: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      topicNotes: {},
      
      saveNote: (topicId: string, content: string) => {
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: content,
          },
        }));
      },
      
      getNote: (topicId: string) => {
        return get().topicNotes[topicId] || '';
      },
      
      clearNote: (topicId: string) => {
        set((state) => {
          const { [topicId]: _, ...rest } = state.topicNotes;
          return { topicNotes: rest };
        });
      },
    }),
    {
      name: 'ai-engineer-path-notes',
    }
  )
);

// Made with Bob
