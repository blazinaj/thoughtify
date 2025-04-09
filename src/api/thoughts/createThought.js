import { DataStore } from '@aws-amplify/datastore';
import { Thought } from '../../models';
import { generateThoughtExtract } from './generateThoughtExtract';

export const createThought = async (input) => {
  const newThought = await DataStore.save(
    new Thought({
      ...input
    })
  );

  const extract = await generateThoughtExtract(newThought);

  await DataStore.save(
    Thought.copyOf(newThought, (updated) => {
      updated.extract = extract;
    })
  );

  return newThought;
};
