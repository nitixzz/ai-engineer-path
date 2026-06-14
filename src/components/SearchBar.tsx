import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllTopics } from '../utils/roadmapLoader';
import { useNotesStore } from '../stores/useNotesStore';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const { topicNotes } = useNotesStore();
  
  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Search function
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    
    const searchQuery = query.toLowerCase();
    const allTopics = getAllTopics();
    const searchResults: any[] = [];
    
    allTopics.forEach((topic) => {
      const matches: string[] = [];
      
      // Search in title
      if (topic.title.toLowerCase().includes(searchQuery)) {
        matches.push(`Title: ${topic.title}`);
      }
      
      // Search in overview
      if (topic.overview.toLowerCase().includes(searchQuery)) {
        const index = topic.overview.toLowerCase().indexOf(searchQuery);
        const snippet = topic.overview.substring(Math.max(0, index - 30), Math.min(topic.overview.length, index + 70));
        matches.push(`Overview: ...${snippet}...`);
      }
      
      // Search in key concepts
      topic.keyConcepts.forEach((concept) => {
        if (concept.toLowerCase().includes(searchQuery)) {
          matches.push(`Concept: ${concept}`);
        }
      });
      
      // Search in notes
      const noteContent = topicNotes[topic.id];
      if (noteContent && noteContent.toLowerCase().includes(searchQuery)) {
        const index = noteContent.toLowerCase().indexOf(searchQuery);
        const snippet = noteContent.substring(Math.max(0, index - 30), Math.min(noteContent.length, index + 70));
        matches.push(`Notes: ...${snippet}...`);
      }
      
      if (matches.length > 0) {
        searchResults.push({
          topic,
          matches: matches.slice(0, 2) // Limit to 2 matches per topic
        });
      }
    });
    
    setResults(searchResults.slice(0, 10)); // Limit to 10 results
  }, [query, topicNotes]);
  
  const handleResultClick = (topicId: string) => {
    navigate(`/topic/${topicId}`);
    setQuery('');
    setShowResults(false);
  };
  
  const handleClear = () => {
    setQuery('');
    setResults([]);
  };
  
  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search topics, concepts, or notes..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map(({ topic, matches }) => (
            <button
              key={topic.id}
              onClick={() => handleResultClick(topic.id)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">{topic.title}</div>
              <div className="text-xs text-gray-500 mb-2">
                {topic.difficulty} • {topic.estimatedHours}h
              </div>
              {matches.map((match: string, i: number) => (
                <div key={i} className="text-sm text-gray-600 truncate">
                  {match}
                </div>
              ))}
            </button>
          ))}
        </div>
      )}
      
      {/* No Results */}
      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-gray-500 text-center">
            No results found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}

// Made with Bob
