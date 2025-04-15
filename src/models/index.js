// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const JournalCadence = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
};

const NotificationType = {
  MESSAGE: 'MESSAGE'
};

const ProjectStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

const SubscriptionTier = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM'
};

const TaskStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

const ThoughtAttributes = {
  OVERALL_TONE: 'overallTone',
  PEOPLE: 'people',
  PROJECTS: 'projects',
  CATEGORIES: 'categories',
  EMOTIONS: 'emotions',
  REMINDERS: 'reminders',
  QUESTIONS: 'questions',
  PLACES: 'places',
  EVENTS: 'events'
};

const WritingStyle = {
  SIMPLE: 'SIMPLE',
  FUNNY: 'FUNNY',
  DETAILED: 'DETAILED',
  ENGINEERING: 'ENGINEERING',
  POETIC: 'POETIC',
  NARRATIVE: 'NARRATIVE',
  REFLECTIVE: 'REFLECTIVE',
  WHIMSICAL: 'WHIMSICAL',
  SPIRITUAL: 'SPIRITUAL',
  MOTIVATIONAL: 'MOTIVATIONAL'
};

const WritingBrevity = {
  SHORT: 'SHORT',
  MEDIUM: 'MEDIUM',
  LONG: 'LONG'
};

const {
  Biography,
  HealthReport,
  JournalEntry,
  Notification,
  Project,
  SubscriptionPlan,
  Task,
  Thought,
  User,
  BiographyThoughts,
  HealthReportThoughts,
  JournalEntryThoughts,
  ProjectThoughts,
  ProjectTasks,
  TaskThoughts
} = initSchema(schema);

export {
  Biography,
  HealthReport,
  JournalEntry,
  Notification,
  Project,
  SubscriptionPlan,
  Task,
  Thought,
  User,
  BiographyThoughts,
  HealthReportThoughts,
  JournalEntryThoughts,
  ProjectThoughts,
  ProjectTasks,
  TaskThoughts,
  JournalCadence,
  NotificationType,
  ProjectStatus,
  SubscriptionStatus,
  SubscriptionTier,
  TaskStatus,
  ThoughtAttributes,
  WritingStyle,
  WritingBrevity
};
