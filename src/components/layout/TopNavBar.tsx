import { Menu, X, BookOpen, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';
import { useProgressStore } from '../../stores/useProgressStore';
import { getTotalTopics } from '../../utils/roadmapLoader';
import SearchBar from '../SearchBar';

export default function TopNavBar() {
  const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useUIStore();
  const { getOverallProgress } = useProgressStore();
  
  const totalTopics = getTotalTopics();
  const overallProgress = getOverallProgress(totalTopics);
  
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-6 flex-shrink-0 z-10">
      {/* Left: Sidebar Toggle */}
      <button
        onClick={toggleLeftSidebar}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle left sidebar"
      >
        {leftSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Center: Search Bar */}
      <SearchBar />
      
      {/* Right: Practice Console, Progress & Notes Toggle */}
      <div className="flex items-center gap-4">
        {/* Practice Console Link */}
        <Link
          to="/practice"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <Code2 size={18} />
          Practice Console
        </Link>
        
        {/* Overall Progress */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg">
          <div className="text-sm font-medium text-primary-700">
            {overallProgress}% Complete
          </div>
        </div>
        
        {/* Notes Toggle */}
        <button
          onClick={toggleRightSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle notes panel"
        >
          <BookOpen size={20} className={rightSidebarOpen ? 'text-primary-600' : 'text-gray-600'} />
        </button>
      </div>
    </header>
  );
}

// Made with Bob
