import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, ProjectStatus } from '../types';

interface PortfolioState {
  projects: Project[];
  
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  getReadinessScore: () => number;
  getProjectsByStatus: (status: ProjectStatus) => Project[];
}

const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'SAP Q&A Bot',
    description: 'Basic Claude API chatbot with SAP Security persona',
    status: 'complete',
    techStack: ['Python', 'Claude API', 'Streamlit'],
    githubUrl: '',
    liveUrl: '',
    dateStarted: new Date().toISOString().split('T')[0],
    dateCompleted: null,
    features: [
      'Claude API integration',
      'System prompt configuration',
      'Basic chat interface',
      'SAP security domain knowledge'
    ],
    learnings: 'Learned how to integrate Claude API and create domain-specific chatbots.'
  },
  {
    id: 'proj-2',
    name: 'SAP Policy RAG Chatbot',
    description: 'Full RAG pipeline over SAP documents with citations',
    status: 'in-progress',
    techStack: ['Python', 'Claude API', 'ChromaDB', 'LangChain'],
    githubUrl: '',
    liveUrl: '',
    dateStarted: new Date().toISOString().split('T')[0],
    dateCompleted: null,
    features: [
      'Document loading and chunking',
      'Vector embeddings with ChromaDB',
      'Semantic search',
      'Source citation',
      'RAG pipeline implementation'
    ],
    learnings: 'Understanding RAG architecture and vector databases.'
  },
  {
    id: 'proj-3',
    name: 'SAP Document Chat (Streamlit)',
    description: 'Deployed web app with file upload and chat UI',
    status: 'in-progress',
    techStack: ['Python', 'Streamlit', 'Claude API', 'ChromaDB'],
    githubUrl: '',
    liveUrl: '',
    dateStarted: new Date().toISOString().split('T')[0],
    dateCompleted: null,
    features: [
      'File upload functionality',
      'Real-time document processing',
      'Interactive chat interface',
      'Session state management',
      'Streamlit deployment'
    ],
    learnings: 'Building production-ready AI applications with Streamlit.'
  },
  {
    id: 'proj-4',
    name: 'SAP Access Review Agent',
    description: 'Multi-tool AI agent automating SoD conflict checks',
    status: 'idea',
    techStack: ['Python', 'Claude API', 'Tool Use', 'Pandas'],
    githubUrl: '',
    liveUrl: '',
    dateStarted: new Date().toISOString().split('T')[0],
    dateCompleted: null,
    features: [
      'Tool/function calling',
      'Multi-step reasoning',
      'Data analysis automation',
      'SoD conflict detection',
      'Report generation'
    ],
    learnings: 'Planning to learn AI agents and tool use patterns.'
  }
];

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      projects: defaultProjects,
      
      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: `proj-${Date.now()}`,
        };
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
      },
      
      updateProject: (id: string, updates: Partial<Project>) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },
      
      deleteProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },
      
      getProject: (id: string) => {
        return get().projects.find((p) => p.id === id);
      },
      
      getReadinessScore: () => {
        const projects = get().projects;
        if (projects.length === 0) return 0;
        
        let score = 0;
        const maxScore = projects.length * 4; // 4 points per project
        
        projects.forEach((project) => {
          // 1 point for being deployed or complete
          if (project.status === 'deployed' || project.status === 'complete') {
            score += 1;
          }
          
          // 1 point for having GitHub URL
          if (project.githubUrl && project.githubUrl.trim() !== '') {
            score += 1;
          }
          
          // 1 point for having live URL
          if (project.liveUrl && project.liveUrl.trim() !== '') {
            score += 1;
          }
          
          // 1 point for having learnings documented
          if (project.learnings && project.learnings.trim().length > 50) {
            score += 1;
          }
        });
        
        return Math.round((score / maxScore) * 100);
      },
      
      getProjectsByStatus: (status: ProjectStatus) => {
        return get().projects.filter((p) => p.status === status);
      },
    }),
    {
      name: 'ai-engineer-path-portfolio',
    }
  )
);

// Made with Bob
