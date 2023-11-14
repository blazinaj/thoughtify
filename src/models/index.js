// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "MESSAGE": "MESSAGE"
};

const { Thought, Notification, User } = initSchema(schema);

export {
  Thought,
  Notification,
  User,
  NotificationType
};