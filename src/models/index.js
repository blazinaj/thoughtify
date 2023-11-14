// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Thought } = initSchema(schema);

export {
  Thought
};