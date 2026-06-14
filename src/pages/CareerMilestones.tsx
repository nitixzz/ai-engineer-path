import { useCareerStore } from '../stores/useCareerStore';
import { Calendar, CheckCircle2, Clock, Circle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function CareerMilestones() {
  const { milestones, getCompletionPercentage } = useCareerStore();
  const completionPercentage = getCompletionPercentage();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="text-green-600" size={24} />;
      case 'in-progress':
        return <Clock className="text-orange-600" size={24} />;
      default:
        return <Circle className="text-gray-400" size={24} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getDaysUntil = (targetDate: string) => {
    const days = differenceInDays(new Date(targetDate), new Date());
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };
  
  // Sort milestones by target date
  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );
  
  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Career Milestones
        </h1>
        <p className="text-lg text-gray-600">
          Track your journey from SAP to AI Engineering
        </p>
      </div>
      
      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 mb-12 border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              Overall Progress
            </h2>
            <p className="text-gray-600">
              {milestones.filter(m => m.status === 'done').length} of {milestones.length} milestones completed
            </p>
          </div>
          <div className="text-5xl font-bold text-gray-900">
            {completionPercentage}%
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {/* Milestones */}
        <div className="space-y-8">
          {sortedMilestones.map((milestone) => (
            <div key={milestone.id} className="relative pl-16">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full">
                {getStatusIcon(milestone.status)}
              </div>
              
              {/* Milestone Card */}
              <div className={`bg-white rounded-xl p-6 border-2 ${getStatusColor(milestone.status)} shadow-sm`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {format(new Date(milestone.targetDate), 'MMM d, yyyy')}
                      </span>
                      <span className={`font-medium ${
                        getDaysUntil(milestone.targetDate) === 'Overdue' 
                          ? 'text-red-600' 
                          : 'text-gray-700'
                      }`}>
                        {getDaysUntil(milestone.targetDate)}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {milestone.status.replace('-', ' ')}
                  </span>
                </div>
                
                {milestone.notes && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {milestone.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-gray-900">
              {milestones.filter(m => m.status === 'done').length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-orange-600" size={24} />
            <span className="text-2xl font-bold text-gray-900">
              {milestones.filter(m => m.status === 'in-progress').length}
            </span>
          </div>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Circle className="text-gray-400" size={24} />
            <span className="text-2xl font-bold text-gray-900">
              {milestones.filter(m => m.status === 'not-started').length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Not Started</p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
