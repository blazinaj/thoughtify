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

const { Biography, HealthReport, JournalEntry, Notification, SubscriptionPlan, Thought, User, JournalEntryThoughts } = initSchema(schema);

export {
  Biography,
  HealthReport,
  JournalEntry,
  Notification,
  SubscriptionPlan,
  Thought,
  User,
  JournalEntryThoughts,
  JournalCadence,
  NotificationType,
  SubscriptionStatus,
  SubscriptionTier
};