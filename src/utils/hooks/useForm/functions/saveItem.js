import { DataStore } from '@aws-amplify/datastore';

/**
 * Saves an item to DataStore
 * @param model
 * @param input
 * @returns {Promise<*>}
 */
export const saveItem = (model, input = {}) => {
  return DataStore.save(
    // eslint-disable-next-line new-cap
    new model({ ...input })
  );
};
