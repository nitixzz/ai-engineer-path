import { Outlet } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';
import LeftSidebar from './LeftSidebar';
import TopNavBar from './TopNavBar';
import RightSidebar from './RightSidebar';

export default function MainLayout() {
  const { leftSidebarOpen, rightSidebarOpen } = useUIStore();
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <aside
        className={`
          ${leftSidebarOpen ? 'w-80' : 'w-0'}
          transition-all duration-300 ease-in-out
          border-r border-gray-200 bg-white
          overflow-hidden flex-shrink-0
        `}
      >
        {leftSidebarOpen && <LeftSidebar />}
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavBar />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
      
      {/* Right Sidebar */}
      <aside
        className={`
          ${rightSidebarOpen ? 'w-96' : 'w-0'}
          transition-all duration-300 ease-in-out
          border-l border-gray-200 bg-white
          overflow-hidden flex-shrink-0
        `}
      >
        {rightSidebarOpen && <RightSidebar />}
      </aside>
    </div>
  );
}

// Made with Bob
