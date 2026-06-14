import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TopicProgress, TopicStatus } from '../types';

interface ProgressState {
  topicProgress: Record<string, TopicProgress>;
  lastViewedTopic: string | null;
  completionDates: string[];
  
  // Actions
  markTopicComplete: (topicId: string) => void;
  markTopicInProgress: (topicId: string) => void;
  toggleExerciseComplete: (topicId: string) => void;
  setLastViewed: (topicId: string) => void;
  
  // Computed
  getTopicStatus: (topicId: string) => TopicStatus;
  getOverallProgress: (totalTopics: number) => number;
  getPhaseProgress: (topicIds: string[]) => number;
  getCompletedCount: () => number;
  getInProgressCount: () => number;
  getNotStartedCount: (totalTopics: number) => number;
  getCurrentStreak: () => number;
  getLongestStreak: () => number;
  getTimeInvested: (topics: Array<{ id: string; estimatedHours: number }>) => number;
  getHoursRemaining: (topics: Array<{ id: string; estimatedHours: number }>) => number;
  getRecentlyCompleted: (topics: Array<{ id: string; title: string }>) => Array<{ id: string; title: string; completedAt: string }>;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      topicProgress: {},
      lastViewedTopic: null,
      completionDates: [],
      
      markTopicComplete: (topicId) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          topicProgress: {
            ...state.topicProgress,
            [topicId]: {
              ...state.topicProgress[topicId],
              status: 'completed',
              completedAt: new Date().toISOString(),
              lastViewedAt: new Date().toISOString(),
              exerciseCompleted: state.topicProgress[topicId]?.exerciseCompleted || false,
            },
          },
          completionDates: state.completionDates.includes(today)
            ? state.completionDates
            : [...state.completionDates, today].sort(),
        }));
      },
      
      markTopicInProgress: (topicId) => {
        set((state) => {
          const existing = state.topicProgress[topicId];
          // Don't change status if already completed
          if (existing?.status === 'completed') {
            return state;
          }
          
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: {
                status: 'in-progress',
                completedAt: null,
                exerciseCompleted: existing?.exerciseCompleted || false,
                lastViewedAt: new Date().toISOString(),
              },
            },
          };
        });
      },
      
      toggleExerciseComplete: (topicId) => {
        set((state) => ({
          topicProgress: {
            ...state.topicProgress,
            [topicId]: {
              ...state.topicProgress[topicId],
              status: state.topicProgress[topicId]?.status || 'in-progress',
              completedAt: state.topicProgress[topicId]?.completedAt || null,
              lastViewedAt: new Date().toISOString(),
              exerciseCompleted: !state.topicProgress[topicId]?.exerciseCompleted,
            },
          },
        }));
      },
      
      setLastViewed: (topicId) => {
        set({ lastViewedTopic: topicId });
        get().markTopicInProgress(topicId);
      },
      
      getTopicStatus: (topicId) => {
        return get().topicProgress[topicId]?.status || 'not-started';
      },
      
      getOverallProgress: (totalTopics) => {
        const completed = get().getCompletedCount();
        return totalTopics > 0 ? Math.round((completed / totalTopics) * 100) : 0;
      },
      
      getPhaseProgress: (topicIds) => {
        const progress = get().topicProgress;
        const completed = topicIds.filter(
          (id) => progress[id]?.status === 'completed'
        ).length;
        return topicIds.length > 0 ? Math.round((completed / topicIds.length) * 100) : 0;
      },
      
      getCompletedCount: () => {
        return Object.values(get().topicProgress).filter(
          (p) => p.status === 'completed'
        ).length;
      },
      
      getInProgressCount: () => {
        return Object.values(get().topicProgress).filter(
          (p) => p.status === 'in-progress'
        ).length;
      },
      
      getNotStartedCount: (totalTopics) => {
        const completed = get().getCompletedCount();
        const inProgress = get().getInProgressCount();
        return totalTopics - completed - inProgress;
      },
      
      getCurrentStreak: () => {
        const dates = get().completionDates.sort().reverse();
        if (dates.length === 0) return 0;
        
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < dates.length; i++) {
          const date = new Date(dates[i]);
          date.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (date.getTime() === expectedDate.getTime()) {
            streak++;
          } else {
            break;
          }
        }
        
        return streak;
      },
      
      getLongestStreak: () => {
        const dates = get().completionDates.sort();
        if (dates.length === 0) return 0;
        
        let longestStreak = 1;
        let currentStreak = 1;
        
        for (let i = 1; i < dates.length; i++) {
          const prevDate = new Date(dates[i - 1]);
          const currDate = new Date(dates[i]);
          
          const diffTime = currDate.getTime() - prevDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          
          if (diffDays === 1) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
          } else if (diffDays > 1) {
            currentStreak = 1;
          }
        }
        
        return longestStreak;
      },
      
      getTimeInvested: (topics) => {
        const progress = get().topicProgress;
        return topics
          .filter((topic) => progress[topic.id]?.status === 'completed')
          .reduce((sum, topic) => sum + topic.estimatedHours, 0);
      },
      
      getHoursRemaining: (topics) => {
        const progress = get().topicProgress;
        return topics
          .filter((topic) => progress[topic.id]?.status !== 'completed')
          .reduce((sum, topic) => sum + topic.estimatedHours, 0);
      },
      
      getRecentlyCompleted: (topics) => {
        const progress = get().topicProgress;
        return topics
          .filter((topic) => progress[topic.id]?.status === 'completed')
          .map((topic) => ({
            id: topic.id,
            title: topic.title,
            completedAt: progress[topic.id].completedAt!,
          }))
          .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
          .slice(0, 5);
      },
    }),
    {
      name: 'ai-engineer-path-progress',
    }
  )
);

// Made with Bob
