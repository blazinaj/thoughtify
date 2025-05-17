// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const JournalCadence = {
  "DAILY": "DAILY",
  "WEEKLY": "WEEKLY",
  "MONTHLY": "MONTHLY",
  "YEARLY": "YEARLY"
};

const NotificationType = {
  "MESSAGE": "MESSAGE"
};

const PersonRelationship = {
  "FRIEND": "FRIEND",
  "FAMILY": "FAMILY",
  "COLLEAGUE": "COLLEAGUE",
  "ACQUAINTANCE": "ACQUAINTANCE",
  "PARTNER": "PARTNER",
  "SIBLING": "SIBLING",
  "CHILD": "CHILD",
  "PARENT": "PARENT"
};

const ProjectStatus = {
  "NOT_STARTED": "NOT_STARTED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const SubscriptionStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const SubscriptionTier = {
  "FREE": "FREE",
  "PREMIUM": "PREMIUM"
};

const TaskStatus = {
  "NOT_STARTED": "NOT_STARTED",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const ThoughtAttributes = {
  "OVERALL_TONE": "overallTone",
  "PEOPLE": "people",
  "PROJECTS": "projects",
  "CATEGORIES": "categories",
  "EMOTIONS": "emotions",
  "REMINDERS": "reminders",
  "QUESTIONS": "questions",
  "PLACES": "places",
  "EVENTS": "events"
};

const WritingStyle = {
  "SIMPLE": "SIMPLE",
  "FUNNY": "FUNNY",
  "DETAILED": "DETAILED",
  "ENGINEERING": "ENGINEERING",
  "POETIC": "POETIC",
  "NARRATIVE": "NARRATIVE",
  "REFLECTIVE": "REFLECTIVE",
  "WHIMSICAL": "WHIMSICAL",
  "SPIRITUAL": "SPIRITUAL",
  "MOTIVATIONAL": "MOTIVATIONAL"
};

const WritingBrevity = {
  "SHORT": "SHORT",
  "MEDIUM": "MEDIUM",
  "LONG": "LONG"
};

const { Biography, Event, HealthReport, JournalEntry, Notification, Person, Place, Project, Reminder, SubscriptionPlan, Task, Thought, User, BiographyThoughts, EventThoughts, HealthReportThoughts, JournalEntryThoughts, PersonThoughts, PlaceThoughts, ProjectThoughts, ProjectTasks, TaskThoughts, Comment, Attachment } = initSchema(schema);

export {
  Biography,
  Event,
  HealthReport,
  JournalEntry,
  Notification,
  Person,
  Place,
  Project,
  Reminder,
  SubscriptionPlan,
  Task,
  Thought,
  User,
  BiographyThoughts,
  EventThoughts,
  HealthReportThoughts,
  JournalEntryThoughts,
  PersonThoughts,
  PlaceThoughts,
  ProjectThoughts,
  ProjectTasks,
  TaskThoughts,
  JournalCadence,
  NotificationType,
  PersonRelationship,
  ProjectStatus,
  SubscriptionStatus,
  SubscriptionTier,
  TaskStatus,
  ThoughtAttributes,
  WritingStyle,
  WritingBrevity,
  Comment,
  Attachment
};