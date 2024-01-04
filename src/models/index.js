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

const PrinterStatus = {
  "IDLE": "IDLE",
  "OFFLINE": "OFFLINE",
  "PRINTING": "PRINTING",
  "PAUSED": "PAUSED",
  "ERROR": "ERROR",
  "UPDATING": "UPDATING"
};

const PrintStatus = {
  "PREPARING": "PREPARING",
  "PRINTING": "PRINTING",
  "PAUSED": "PAUSED",
  "CANCELLED": "CANCELLED",
  "ERROR": "ERROR",
  "FINISHED": "FINISHED"
};

const SubscriptionStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const SubscriptionTier = {
  "FREE": "FREE",
  "PREMIUM": "PREMIUM"
};

const { Biography, HealthReport, JournalEntry, Notification, Printer, PrintModel, Print, Filament, SubscriptionPlan, Thought, User, BiographyThoughts, HealthReportThoughts, JournalEntryThoughts } = initSchema(schema);

export {
  Biography,
  HealthReport,
  JournalEntry,
  Notification,
  Printer,
  PrintModel,
  Print,
  Filament,
  SubscriptionPlan,
  Thought,
  User,
  BiographyThoughts,
  HealthReportThoughts,
  JournalEntryThoughts,
  JournalCadence,
  NotificationType,
  PrinterStatus,
  PrintStatus,
  SubscriptionStatus,
  SubscriptionTier
};