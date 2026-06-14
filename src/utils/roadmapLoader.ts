import { Phase, Topic } from '../types';
import phase0 from '../data/roadmap/phase-0.json';
import phase1 from '../data/roadmap/phase-1.json';
import phase2 from '../data/roadmap/phase-2.json';
import phase3 from '../data/roadmap/phase-3.json';
import phase4 from '../data/roadmap/phase-4.json';
import phase5 from '../data/roadmap/phase-5.json';

// Transform function to normalize topic structure
function normalizePhase(phase: any): Phase {
  return {
    ...phase,
    topics: phase.topics.map((topic: any) => {
      // If topic already has the correct structure, return as is
      if (topic.videoResources && topic.articleResources) {
        return topic;
      }
      
      // Transform combined resources array into separate arrays
      const videoResources = topic.resources
        ? topic.resources
            .filter((r: any) => r.type === 'video')
            .map((r: any) => ({
              title: r.title,
              source: r.channel || r.source,
              url: r.url
            }))
        : [];
      
      const articleResources = topic.resources
        ? topic.resources
            .filter((r: any) => r.type === 'article')
            .map((r: any) => ({
              title: r.title,
              source: r.source,
              url: r.url
            }))
        : [];
      
      // Transform nextTopics array to nextTopicId
      const nextTopicId = topic.nextTopics && topic.nextTopics.length > 0
        ? topic.nextTopics[0]
        : null;
      
      return {
        ...topic,
        videoResources,
        articleResources,
        nextTopicId
      };
    })
  };
}

// Import all available phases
const availablePhases: Phase[] = [
  phase0 as Phase,
  phase1 as Phase,
  normalizePhase(phase2),
  normalizePhase(phase3),
  normalizePhase(phase4),
  normalizePhase(phase5),
];

// Placeholder phases for phases not yet created
const placeholderPhases: Phase[] = [
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
