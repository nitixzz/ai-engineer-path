import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardHome from './pages/DashboardHome';
import TopicDetail from './pages/TopicDetail';
import PortfolioTracker from './pages/PortfolioTracker';
import CareerMilestones from './pages/CareerMilestones';
import PracticeConsole from './pages/PracticeConsole';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="topic/:topicId" element={<TopicDetail />} />
          <Route path="portfolio" element={<PortfolioTracker />} />
          <Route path="career" element={<CareerMilestones />} />
        </Route>
        {/* Practice Console - Full screen, no layout */}
        <Route path="/practice" element={<PracticeConsole />} />
      </Routes>
    </Router>
  );
}

export default App;

// Made with Bob
