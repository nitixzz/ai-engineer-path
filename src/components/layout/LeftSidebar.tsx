import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, CheckCircle2, Circle, Dot } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { useProgressStore } from '../../stores/useProgressStore';
import { getAllPhases } from '../../utils/roadmapLoader';
import { Phase, Topic } from '../../types';

export default function LeftSidebar() {
  const { expandedPhases, togglePhase } = useUIStore();
  const { getTopicStatus } = useProgressStore();
  
  const roadmapData = getAllPhases();
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="block">
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            AI Engineer Path
          </h1>
          <p className="text-sm text-gray-500 mt-1">Your Learning Journey</p>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="space-y-2">
          {roadmapData.map((phase) => {
            const isExpanded = expandedPhases.includes(phase.id);
            const completedTopics = phase.topics.filter(
              t => getTopicStatus(t.id) === 'completed'
            ).length;
            
            return (
              <div key={phase.id} className="space-y-1">
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-gray-900 flex-1">
                    {phase.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {completedTopics}/{phase.topics.length}
                  </span>
                </button>
                
                {/* Topics */}
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {phase.topics.map((topic) => {
                      const status = getTopicStatus(topic.id);
                      const statusColor = 
                        status === 'completed' ? 'text-green-600' :
                        status === 'in-progress' ? 'text-orange-600' :
                        'text-gray-400';
                      
                      return (
                        <Link
                          key={topic.id}
                          to={`/topic/${topic.id}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          {status === 'completed' ? (
                            <CheckCircle2 size={16} className={statusColor} />
                          ) : status === 'in-progress' ? (
                            <Dot size={24} className={statusColor} />
                          ) : (
                            <Circle size={16} className={statusColor} />
                          )}
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                            {topic.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {topic.estimatedHours}h
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>{roadmapData.length} Phases • {roadmapData.reduce((sum: number, p: Phase) => sum + p.topics.length, 0)} Topics</p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
