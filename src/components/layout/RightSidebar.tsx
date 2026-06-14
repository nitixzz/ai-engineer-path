import { useParams } from 'react-router-dom';
import { StickyNote } from 'lucide-react';
import { useNotesStore } from '../../stores/useNotesStore';
import { useState, useEffect } from 'react';

export default function RightSidebar() {
  const { topicId } = useParams();
  const { getNote, saveNote } = useNotesStore();
  const [noteContent, setNoteContent] = useState('');
  
  // Load note when topic changes
  useEffect(() => {
    if (topicId) {
      setNoteContent(getNote(topicId));
    }
  }, [topicId, getNote]);
  
  // Auto-save with debounce
  useEffect(() => {
    if (!topicId) return;
    
    const timeoutId = setTimeout(() => {
      saveNote(topicId, noteContent);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [noteContent, topicId, saveNote]);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <StickyNote size={20} className="text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">My Notes</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {topicId ? 'Notes for this topic' : 'Select a topic to take notes'}
        </p>
      </div>
      
      {/* Notes Editor */}
      <div className="flex-1 overflow-hidden">
        {topicId ? (
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write your notes here... (Markdown supported)"
            className="w-full h-full p-6 resize-none focus:outline-none font-mono text-sm"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <StickyNote size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No topic selected</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      {topicId && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Auto-saved • Markdown supported
          </p>
        </div>
      )}
    </div>
  );
}

// Made with Bob
