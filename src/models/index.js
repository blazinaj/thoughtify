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

const SubscriptionStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const SubscriptionTier = {
  "FREE": "FREE",
  "PREMIUM": "PREMIUM"
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

const { Biography, HealthReport, JournalEntry, Notification, SubscriptionPlan, Thought, User, BiographyThoughts, HealthReportThoughts, JournalEntryThoughts } = initSchema(schema);

export {
  Biography,
  HealthReport,
  JournalEntry,
  Notification,
  SubscriptionPlan,
  Thought,
  User,
  BiographyThoughts,
  HealthReportThoughts,
  JournalEntryThoughts,
  JournalCadence,
  NotificationType,
  SubscriptionStatus,
  SubscriptionTier,
  ThoughtAttributes,
  WritingStyle,
  WritingBrevity
};