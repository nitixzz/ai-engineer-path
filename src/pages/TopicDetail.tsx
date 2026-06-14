import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowRight, ExternalLink, BookOpen, Code2 } from 'lucide-react';
import { useProgressStore } from '../stores/useProgressStore';
import { usePyodideStore } from '../stores/usePyodideStore';
import { useEffect, useState } from 'react';
import { getTopicById } from '../utils/roadmapLoader';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';
import ReadingProgress from '../components/ReadingProgress';

export default function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { getTopicStatus, markTopicComplete, setLastViewed, toggleExerciseComplete } = useProgressStore();
  const { setCurrentCode, clearOutput } = usePyodideStore();
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  
  useEffect(() => {
    if (topicId) {
      setLastViewed(topicId);
    }
  }, [topicId, setLastViewed]);
  
  const tryInConsole = (code: string) => {
    setCurrentCode(code);
    clearOutput();
    navigate('/practice');
  };
  
  if (!topicId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Topic not found</p>
      </div>
    );
  }
  
  const result = getTopicById(topicId);
  
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">Topic not found</p>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  const { topic, phase } = result;
  const status = getTopicStatus(topicId);
  const isCompleted = status === 'completed';
  const progress = useProgressStore.getState().topicProgress[topicId];
  const exerciseCompleted = progress?.exerciseCompleted || false;
  
  return (
    <>
      <ReadingProgress />
      <div className="max-w-4xl mx-auto px-8 py-12 animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
          Dashboard
        </Link>
        <span className="text-sm text-gray-400 mx-2">/</span>
        <span className="text-sm text-gray-700">{phase.title}</span>
        <span className="text-sm text-gray-400 mx-2">/</span>
        <span className="text-sm text-gray-900 font-medium">{topic.title}</span>
      </div>
      
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
              {topic.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {topic.difficulty}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Clock size={16} />
                {topic.estimatedHours}h
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {phase.title}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => markTopicComplete(topicId)}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors flex-shrink-0
              ${isCompleted
                ? 'bg-green-100 text-green-700'
                : 'bg-primary-600 text-white hover:bg-primary-700'
              }
            `}
          >
            {isCompleted ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                Completed
              </span>
            ) : (
              'Mark Complete'
            )}
          </button>
        </div>
        
        {isCompleted && progress?.completedAt && (
          <p className="text-sm text-gray-500">
            Completed on {new Date(progress.completedAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        )}
      </header>
      
      {/* Overview */}
      <section className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{topic.overview}</p>
      </section>
      
      {/* Detailed Notes */}
      <section className="mb-8 prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match;
              const codeString = String(children).replace(/\n$/, '');
              const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
              
              return !isInline ? (
                <div
                  className="relative group"
                  onMouseEnter={() => setHoveredCode(codeId)}
                  onMouseLeave={() => setHoveredCode(null)}
                >
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                  >
                    {codeString}
                  </SyntaxHighlighter>
                  {match[1] === 'python' && (
                    <button
                      onClick={() => tryInConsole(codeString)}
                      className={`
                        absolute top-2 right-2 flex items-center gap-2 px-3 py-1.5
                        bg-green-600 text-white text-sm rounded-lg hover:bg-green-700
                        transition-all shadow-lg
                        ${hoveredCode === codeId ? 'opacity-100' : 'opacity-0'}
                      `}
                    >
                      <Code2 size={14} />
                      Try in Console
                    </button>
                  )}
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          } as Components}
        >
          {topic.detailedNotes}
        </ReactMarkdown>
      </section>
      
      {/* Key Concepts */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Key Concepts
        </h2>
        <div className="flex flex-wrap gap-2">
          {topic.keyConcepts.map((concept, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {concept}
            </span>
          ))}
        </div>
      </section>
      
      {/* Video Resources */}
      {topic.videoResources.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Video Resources
          </h2>
          <div className="space-y-3">
            {topic.videoResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{resource.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{resource.source}</div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
      
      {/* Article Resources */}
      {topic.articleResources.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Articles & Documentation
          </h2>
          <div className="space-y-3">
            {topic.articleResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{resource.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{resource.source}</div>
                  </div>
                  <BookOpen size={16} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
      
      {/* Practice Exercise */}
      {topic.practiceExercise && (
        <section className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Practice Exercise
            </h2>
            <button
              onClick={() => toggleExerciseComplete(topicId)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${exerciseCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-100'
                }
              `}
            >
              {exerciseCompleted ? '✓ Completed' : 'Mark as Done'}
            </button>
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{topic.practiceExercise}</ReactMarkdown>
          </div>
        </section>
      )}
      
      {/* Prerequisites */}
      {topic.prerequisites.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Prerequisites
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Complete these topics first for better understanding:
          </p>
          <div className="space-y-2">
            {topic.prerequisites.map((prereqId) => {
              const prereqResult = getTopicById(prereqId);
              if (!prereqResult) return null;
              const prereqStatus = getTopicStatus(prereqId);
              
              return (
                <Link
                  key={prereqId}
                  to={`/topic/${prereqId}`}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  {prereqStatus === 'completed' ? (
                    <CheckCircle2 size={16} className="text-green-600" />
                  ) : (
                    <Clock size={16} className="text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">{prereqResult.topic.title}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Next Topic */}
      {topic.nextTopicId && (
        <section className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Up</h3>
          {(() => {
            const nextResult = getTopicById(topic.nextTopicId);
            if (!nextResult) return null;
            
            return (
              <Link
                to={`/topic/${topic.nextTopicId}`}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                {nextResult.topic.title}
                <ArrowRight size={20} />
              </Link>
            );
          })()}
        </section>
      )}
      </div>
    </>
  );
}

// Made with Bob
