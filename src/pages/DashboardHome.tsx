import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Clock, TrendingUp, Target, Flame } from 'lucide-react';
import { useProgressStore } from '../stores/useProgressStore';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { useCareerStore } from '../stores/useCareerStore';
import { getAllTopics, getTotalEstimatedHours } from '../utils/roadmapLoader';
import { format, differenceInDays } from 'date-fns';

export default function DashboardHome() {
  const {
    topicProgress,
    lastViewedTopic,
    getOverallProgress,
    getCurrentStreak,
    getTimeInvested
  } = useProgressStore();
  
  const { projects, getReadinessScore } = usePortfolioStore();
  const { milestones } = useCareerStore();
  
  const allTopics = getAllTopics();
  const totalTopics = allTopics.length;
  const totalHours = getTotalEstimatedHours();
  
  const completedTopics = allTopics.filter(t => topicProgress[t.id]?.status === 'completed');
  const inProgressTopics = allTopics.filter(t => topicProgress[t.id]?.status === 'in-progress');
  const notStartedTopics = allTopics.filter(t => !topicProgress[t.id] || topicProgress[t.id].status === 'not-started');
  
  const overallProgress = getOverallProgress(totalTopics);
  const currentStreak = getCurrentStreak();
  const timeInvested = getTimeInvested(allTopics);
  
  // Get last viewed topic details
  const lastViewedTopicData = lastViewedTopic ? allTopics.find(t => t.id === lastViewedTopic) : null;
  const lastViewed = lastViewedTopicData ? {
    id: lastViewedTopicData.id,
    title: lastViewedTopicData.title,
    phase: allTopics.find(t => t.id === lastViewedTopicData.id) ? 'Phase' : 'Unknown'
  } : null;
  
  const recentlyCompleted = completedTopics
    .sort((a, b) => {
      const dateA = topicProgress[a.id]?.completedAt || '';
      const dateB = topicProgress[b.id]?.completedAt || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .slice(0, 5);
  
  const portfolioReadiness = getReadinessScore();
  
  const nextMilestone = milestones
    .filter(m => m.status !== 'done' && m.targetDate)
    .sort((a, b) => new Date(a.targetDate!).getTime() - new Date(b.targetDate!).getTime())[0];
  
  const daysUntilMilestone = nextMilestone?.targetDate 
    ? differenceInDays(new Date(nextMilestone.targetDate), new Date())
    : null;
  
  // This Week's Focus - suggest one topic, one project, one milestone
  const suggestedTopic = inProgressTopics[0] || notStartedTopics[0];
  const suggestedProject = projects.find(p => p.status === 'in-progress') || projects.find(p => p.status === 'idea');
  const suggestedMilestone = milestones.find(m => m.status === 'in-progress') || milestones.find(m => m.status === 'not-started');
  
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-3">
          AI Engineer Path
        </h1>
        <p className="text-xl text-gray-600">
          Your journey from SAP to AI Engineering
        </p>
      </header>
      
      {/* Main Progress Ring & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Overall Progress */}
        <div className="lg:col-span-2 bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 border border-primary-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Overall Progress
              </h2>
              <p className="text-gray-600">
                {completedTopics.length} of {totalTopics} topics completed
              </p>
            </div>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
                  className="text-primary-600 transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {Math.round(overallProgress)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">Completed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedTopics.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Clock size={20} />
                <span className="text-sm font-medium">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{inProgressTopics.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <BookOpen size={20} />
                <span className="text-sm font-medium">Not Started</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{notStartedTopics.length}</p>
            </div>
          </div>
        </div>
        
        {/* Streak & Time */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="text-orange-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Current Streak</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{currentStreak}</p>
            <p className="text-sm text-gray-600">days in a row</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-blue-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Time Invested</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{timeInvested}h</p>
            <p className="text-sm text-gray-600">of {totalHours}h total</p>
          </div>
        </div>
      </div>
      
      {/* This Week's Focus */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-indigo-100 mb-12">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Target size={28} className="text-indigo-600" />
          This Week's Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Learning */}
          <div className="bg-white rounded-lg p-5">
            <div className="text-sm font-medium text-indigo-600 mb-2">📚 Learning</div>
            {suggestedTopic ? (
              <>
                <h3 className="font-semibold text-gray-900 mb-2">{suggestedTopic.title}</h3>
                <Link
                  to={`/topic/${suggestedTopic.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                >
                  Start learning <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <p className="text-sm text-gray-500">All topics completed! 🎉</p>
            )}
          </div>
          
          {/* Portfolio */}
          <div className="bg-white rounded-lg p-5">
            <div className="text-sm font-medium text-purple-600 mb-2">💼 Portfolio</div>
            {suggestedProject ? (
              <>
                <h3 className="font-semibold text-gray-900 mb-2">{suggestedProject.name}</h3>
                <Link
                  to="/portfolio"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                >
                  Continue building <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <p className="text-sm text-gray-500">All projects complete!</p>
            )}
          </div>
          
          {/* Career */}
          <div className="bg-white rounded-lg p-5">
            <div className="text-sm font-medium text-pink-600 mb-2">🎯 Career</div>
            {suggestedMilestone ? (
              <>
                <h3 className="font-semibold text-gray-900 mb-2">{suggestedMilestone.title}</h3>
                <Link
                  to="/career"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                >
                  Take action <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <p className="text-sm text-gray-500">All milestones complete!</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Continue Where You Left Off */}
        {lastViewed && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
              Continue Where You Left Off
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-5 border border-primary-100">
              <h3 className="font-semibold text-gray-900 mb-2">{lastViewed.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{lastViewed.phase}</p>
              <Link
                to={`/topic/${lastViewed.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Resume Learning <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
        
        {/* Recently Completed */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
            Recently Completed
          </h2>
          {recentlyCompleted.length > 0 ? (
            <div className="space-y-3">
              {recentlyCompleted.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/topic/${topic.id}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{topic.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(topicProgress[topic.id].completedAt!), 'MMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No completed topics yet. Start learning!</p>
          )}
        </div>
      </div>
      
      {/* Portfolio & Career Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Readiness */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Portfolio Readiness
            </h2>
            <Link
              to="/portfolio"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Score</span>
              <span className="text-2xl font-bold text-gray-900">{portfolioReadiness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${portfolioReadiness}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{project.name}</span>
                <span className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${project.status === 'complete' ? 'bg-green-100 text-green-700' :
                    project.status === 'deployed' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'in-progress' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'}
                `}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Career Milestone */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Next Career Milestone
            </h2>
            <Link
              to="/career"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all →
            </Link>
          </div>
          {nextMilestone ? (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
              <h3 className="font-semibold text-gray-900 mb-2">{nextMilestone.title}</h3>
              {daysUntilMilestone !== null && (
                <p className="text-sm text-gray-600 mb-3">
                  {daysUntilMilestone > 0 
                    ? `${daysUntilMilestone} days remaining`
                    : daysUntilMilestone === 0
                    ? 'Due today!'
                    : `${Math.abs(daysUntilMilestone)} days overdue`
                  }
                </p>
              )}
              <Link
                to="/career"
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View details <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No upcoming milestones</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
