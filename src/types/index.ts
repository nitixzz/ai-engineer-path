// Core data types for the AI Engineer Path application

export type TopicStatus = 'not-started' | 'in-progress' | 'completed';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProjectStatus = 'idea' | 'in-progress' | 'complete' | 'deployed';
export type MilestoneStatus = 'not-started' | 'in-progress' | 'done';

export interface Resource {
  title: string;
  source: string;
  url: string;
}

export interface Topic {
  id: string;
  title: string;
  estimatedHours: number;
  difficulty: Difficulty;
  overview: string;
  detailedNotes: string;
  keyConcepts: string[];
  videoResources: Resource[];
  articleResources: Resource[];
  practiceExercise: string;
  prerequisites: string[]; // topic IDs
  nextTopicId: string | null;
}

export interface Phase {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  topics: Topic[];
}

export interface TopicProgress {
  status: TopicStatus;
  completedAt: string | null;
  exerciseCompleted: boolean;
  lastViewedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  dateStarted: string;
  dateCompleted: string | null;
  features: string[];
  learnings: string;
}

export interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  status: MilestoneStatus;
  notes: string;
}

export interface SearchResult {
  topicId: string;
  title: string;
  phaseTitle: string;
  snippet: string;
  matchType: 'title' | 'overview' | 'concept' | 'notes';
}

export interface Stats {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  notStartedTopics: number;
  currentStreak: number;
  longestStreak: number;
  timeInvested: number;
  hoursRemaining: number;
}

// Made with Bob
