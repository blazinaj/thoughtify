// import { DataStore } from '@aws-amplify-old/datastore';

/**
 * Saves an item into the DataStore
 * @param model
 * @param item
 * @returns {Promise<*>}
 */
export const saveItem = async (model, item, dataStore) => {
  // eslint-disable-next-line no-return-await
  return await dataStore.save(
    // eslint-disable-next-line new-cap
    new model(item),
    item
  );
};
