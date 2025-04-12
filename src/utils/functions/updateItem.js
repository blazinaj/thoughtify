// import { DataStore } from '@aws-amplify-old/datastore';

/**
 * Saves an item into the DataStore
 * @param model
 * @param item
 * @returns {Promise<*>}
 */
export const updateItem = async (model, item, dataStore) => {

  // eslint-disable-next-line no-return-await
  return await dataStore.save(
    // eslint-disable-next-line new-cap
    model.copyOf(item, (updated) => {
      item;
    })
  );
};
