import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Milestone, MilestoneStatus } from '../types';

interface CareerState {
  milestones: Milestone[];
  
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;
  getMilestone: (id: string) => Milestone | undefined;
  getUpcomingMilestone: () => Milestone | null;
  getCompletionPercentage: () => number;
  getMilestonesByStatus: (status: MilestoneStatus) => Milestone[];
}

const defaultMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    title: 'Apply to BITS WILP M.Tech AI/ML (July 2026 batch)',
    targetDate: '2026-07-01',
    status: 'not-started',
    notes: 'Research admission requirements, prepare documents, and submit application.'
  },
  {
    id: 'milestone-2',
    title: 'Retake IELTS (target 7+, schedule Sep-Nov 2026)',
    targetDate: '2026-11-30',
    status: 'not-started',
    notes: 'Book IELTS exam, prepare for all sections, aim for 7+ overall score.'
  },
  {
    id: 'milestone-3',
    title: 'LinkedIn profile overhaul (headline, about section, skills, portfolio links)',
    targetDate: '2026-08-15',
    status: 'not-started',
    notes: 'Update headline to AI Engineer, rewrite about section, add portfolio projects, optimize for recruiters.'
  },
  {
    id: 'milestone-4',
    title: 'Publish first technical blog post (SAP RAG bot writeup)',
    targetDate: '2026-09-01',
    status: 'not-started',
    notes: 'Write detailed blog post about building SAP RAG chatbot, publish on Medium or personal blog.'
  },
  {
    id: 'milestone-5',
    title: 'Connect with 10 AI engineers + 5 BITS WILP alumni on LinkedIn',
    targetDate: '2026-08-30',
    status: 'not-started',
    notes: 'Network with AI engineers and BITS WILP alumni, send personalized connection requests.'
  },
  {
    id: 'milestone-6',
    title: 'Complete BITS WILP Semester 1 preview (Andrew Ng ML course)',
    targetDate: '2026-12-31',
    status: 'not-started',
    notes: 'Complete Andrew Ng Machine Learning course on Coursera to prepare for BITS WILP.'
  },
  {
    id: 'milestone-7',
    title: 'Apply to first 5 AI engineer roles (test market readiness)',
    targetDate: '2026-10-15',
    status: 'not-started',
    notes: 'Apply to 5 AI engineer positions to test resume and portfolio effectiveness.'
  },
  {
    id: 'milestone-8',
    title: 'First mock interview completed',
    targetDate: '2026-09-30',
    status: 'not-started',
    notes: 'Schedule and complete mock interview with peer or mentor, get feedback.'
  },
  {
    id: 'milestone-9',
    title: 'BITS WILP Semester 1 start',
    targetDate: '2027-01-15',
    status: 'not-started',
    notes: 'Begin first semester of BITS WILP M.Tech AI/ML program.'
  }
];

export const useCareerStore = create<CareerState>()(
  persist(
    (set, get) => ({
      milestones: defaultMilestones,
      
      addMilestone: (milestone) => {
        const newMilestone: Milestone = {
          ...milestone,
          id: `milestone-${Date.now()}`,
        };
        set((state) => ({
          milestones: [...state.milestones, newMilestone],
        }));
      },
      
      updateMilestone: (id: string, updates: Partial<Milestone>) => {
        set((state) => ({
          milestones: state.milestones.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        }));
      },
      
      deleteMilestone: (id: string) => {
        set((state) => ({
          milestones: state.milestones.filter((m) => m.id !== id),
        }));
      },
      
      getMilestone: (id: string) => {
        return get().milestones.find((m) => m.id === id);
      },
      
      getUpcomingMilestone: () => {
        const now = new Date();
        const upcoming = get()
          .milestones
          .filter((m) => m.status !== 'done' && new Date(m.targetDate) >= now)
          .sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
        
        return upcoming.length > 0 ? upcoming[0] : null;
      },
      
      getCompletionPercentage: () => {
        const milestones = get().milestones;
        if (milestones.length === 0) return 0;
        
        const completed = milestones.filter((m) => m.status === 'done').length;
        return Math.round((completed / milestones.length) * 100);
      },
      
      getMilestonesByStatus: (status: MilestoneStatus) => {
        return get().milestones.filter((m) => m.status === status);
      },
    }),
    {
      name: 'ai-engineer-path-career',
    }
  )
);

// Made with Bob
