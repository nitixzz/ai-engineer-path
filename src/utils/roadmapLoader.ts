import { Phase, Topic } from '../types';
import phase0 from '../data/roadmap/phase-0.json';
import phase1 from '../data/roadmap/phase-1.json';

// Import all available phases
const availablePhases: Phase[] = [
  phase0 as Phase,
  phase1 as Phase,
];

// Placeholder phases for phases not yet created
const placeholderPhases: Phase[] = [
  {
    id: 'phase-2',
    title: 'Phase 2: Developer Tools & Workflow',
    difficulty: 'Beginner',
    description: 'Master essential developer tools and workflows',
    topics: []
  },
  {
    id: 'phase-3',
    title: 'Phase 3: APIs & Web Fundamentals',
    difficulty: 'Beginner',
    description: 'Learn how APIs work and web fundamentals',
    topics: []
  },
  {
    id: 'phase-4',
    title: 'Phase 4: LLM API Mastery (Claude/OpenAI)',
    difficulty: 'Intermediate',
    description: 'Master working with LLM APIs',
    topics: []
  },
  {
    id: 'phase-5',
    title: 'Phase 5: RAG (Retrieval Augmented Generation)',
    difficulty: 'Intermediate',
    description: 'Build RAG systems from scratch',
    topics: []
  },
  {
    id: 'phase-6',
    title: 'Phase 6: Vector Databases',
    difficulty: 'Intermediate',
    description: 'Work with vector databases for semantic search',
    topics: []
  },
  {
    id: 'phase-7',
    title: 'Phase 7: LangChain & AI Frameworks',
    difficulty: 'Intermediate',
    description: 'Use AI frameworks to build faster',
    topics: []
  },
  {
    id: 'phase-8',
    title: 'Phase 8: Building & Shipping Products',
    difficulty: 'Intermediate',
    description: 'Turn AI prototypes into production apps',
    topics: []
  },
  {
    id: 'phase-9',
    title: 'Phase 9: Data Science Foundations',
    difficulty: 'Intermediate',
    description: 'Essential data science skills for AI',
    topics: []
  },
  {
    id: 'phase-10',
    title: 'Phase 10: Deployment & Production',
    difficulty: 'Advanced',
    description: 'Deploy AI applications to production',
    topics: []
  },
  {
    id: 'phase-11',
    title: 'Phase 11: Mathematics for Machine Learning',
    difficulty: 'Advanced',
    description: 'Mathematical foundations of ML',
    topics: []
  },
  {
    id: 'phase-12',
    title: 'Phase 12: Advanced AI Engineering',
    difficulty: 'Advanced',
    description: 'Advanced AI engineering concepts',
    topics: []
  },
  {
    id: 'phase-13',
    title: 'Phase 13: Software Engineering Practices',
    difficulty: 'Intermediate',
    description: 'Professional software engineering practices',
    topics: []
  },
  {
    id: 'phase-14',
    title: 'Phase 14: Interview Preparation',
    difficulty: 'Advanced',
    description: 'Prepare for AI engineering interviews',
    topics: []
  }
];

// Combine available and placeholder phases
const allPhases = [...availablePhases, ...placeholderPhases];

export function getAllPhases(): Phase[] {
  return allPhases;
}

export function getPhaseById(phaseId: string): Phase | undefined {
  return allPhases.find(phase => phase.id === phaseId);
}

export function getAllTopics(): Topic[] {
  return allPhases.flatMap(phase => phase.topics);
}

export function getTopicById(topicId: string): { topic: Topic; phase: Phase } | undefined {
  for (const phase of allPhases) {
    const topic = phase.topics.find(t => t.id === topicId);
    if (topic) {
      return { topic, phase };
    }
  }
  return undefined;
}

export function getTotalTopics(): number {
  return getAllTopics().length;
}

export function getTotalEstimatedHours(): number {
  return getAllTopics().reduce((sum, topic) => sum + topic.estimatedHours, 0);
}

export function getPhaseTopics(phaseId: string): Topic[] {
  const phase = getPhaseById(phaseId);
  return phase ? phase.topics : [];
}

// Made with Bob
