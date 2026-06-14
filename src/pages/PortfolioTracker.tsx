import { usePortfolioStore } from '../stores/usePortfolioStore';
import { ExternalLink, Github, TrendingUp } from 'lucide-react';

export default function PortfolioTracker() {
  const { projects, getReadinessScore } = usePortfolioStore();
  const readinessScore = getReadinessScore();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-700';
      case 'complete': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-orange-100 text-orange-700';
      case 'idea': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Portfolio Tracker
        </h1>
        <p className="text-lg text-gray-600">
          Track your AI projects and showcase your work
        </p>
      </div>
      
      {/* Readiness Score */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-12 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              Portfolio Readiness
            </h2>
            <p className="text-gray-600">
              Your portfolio is <span className="font-semibold">{readinessScore}%</span> ready for job applications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={32} />
            </div>
            <span className="text-5xl font-bold text-gray-900">{readinessScore}%</span>
          </div>
        </div>
        
        {/* Readiness Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">Deployed Projects</p>
            <p className="text-xs text-gray-600">
              {projects.filter(p => p.status === 'deployed').length} of {projects.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">GitHub Links</p>
            <p className="text-xs text-gray-600">
              {projects.filter(p => p.githubUrl).length} of {projects.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">Live Demos</p>
            <p className="text-xs text-gray-600">
              {projects.filter(p => p.liveUrl).length} of {projects.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">Documented</p>
            <p className="text-xs text-gray-600">
              {projects.filter(p => p.learnings && p.learnings.length > 50).length} of {projects.length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">
              {project.description}
            </p>
            
            {/* Tech Stack */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Key Features</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Github size={16} />
                  GitHub
                </a>
              ) : (
                <span className="text-sm text-gray-400">No GitHub link</span>
              )}
              
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              ) : (
                <span className="text-sm text-gray-400">No live demo</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Made with Bob
