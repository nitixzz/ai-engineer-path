import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  expandedPhases: string[];
  
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  togglePhase: (phaseId: string) => void;
  expandPhase: (phaseId: string) => void;
  collapsePhase: (phaseId: string) => void;
  expandAllPhases: (phaseIds: string[]) => void;
  collapseAllPhases: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      leftSidebarOpen: true,
      rightSidebarOpen: true,
      expandedPhases: [],
      
      toggleLeftSidebar: () => {
        set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen }));
      },
      
      toggleRightSidebar: () => {
        set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen }));
      },
      
      togglePhase: (phaseId: string) => {
        set((state) => ({
          expandedPhases: state.expandedPhases.includes(phaseId)
            ? state.expandedPhases.filter((id) => id !== phaseId)
            : [...state.expandedPhases, phaseId],
        }));
      },
      
      expandPhase: (phaseId: string) => {
        set((state) => ({
          expandedPhases: state.expandedPhases.includes(phaseId)
            ? state.expandedPhases
            : [...state.expandedPhases, phaseId],
        }));
      },
      
      collapsePhase: (phaseId: string) => {
        set((state) => ({
          expandedPhases: state.expandedPhases.filter((id) => id !== phaseId),
        }));
      },
      
      expandAllPhases: (phaseIds: string[]) => {
        set({ expandedPhases: phaseIds });
      },
      
      collapseAllPhases: () => {
        set({ expandedPhases: [] });
      },
    }),
    {
      name: 'ai-engineer-path-ui',
    }
  )
);

// Made with Bob
