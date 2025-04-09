import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { getItems } from '../functions/getItems';
import { useDataStoreSubscription } from './useDataStoreSubscription';
import { useBoolean } from '../../useBoolean';
import { isNullOrUndefined } from '../../../functions/isNullOrUndefined';

/**
 * Uses Amplify CLI Datastore for a single database model type
 *
 * @param {class} model
 * @param {boolean} [enableSubscription=false]
 * @param {function} [onAfterQuery] - callback function that is performed after a query completes
 * @param {object[]} [items=[]] - initial items if pre-filling the grid
 * @returns {{items: *[]}}
 */
export const useDatastore = ({
  model,
  enableSubscription = false,
  onAfterQuery,
  items: itemsInit,
  itemId,
  predicate,
  filter,
  typename
}) => {
  const [isLoading, setIsLoading] = useBoolean(true);

  /**
   * The current items state for this model pulled from DataStore
   */
  const [items, setItems] = useState(itemsInit || []);

  /**
   * The item state if an id is passed in for a single DB object
   */
  const [item, setItem] = useState(null);

  /**
   * Function is called after the query with query data
   * @param item
   */
  const afterQuery = (data) => {
    setIsLoading(false);
    onAfterQuery && onAfterQuery(data);
  };

  /**
   * Queries the items from DataStore and stores into state
   */
  const handleQuery = () => {
    if (!model) {
      return;
    }

    /**
     * Sets loading state to true at the beginning of the query
     */
    setIsLoading(true);

    /**
     * If an `items` prop is passed in, this is now a Controlled component and will not perform automatic querying
     */
    if (Array.isArray(itemsInit)) {
      if (filter) {
        setItems(itemsInit.filter(filter));
      } else {
        setItems(itemsInit);
      }

      // exit the function
      return;
    }

    /**
     * If an ID is passed in, query for a single object
     */
    if (!isNullOrUndefined(itemId)) {
      DataStore.query(model, itemId).then(async (item) => {
        setItem(item);
        // eslint-disable-next-line no-unused-expressions
        afterQuery(item);
      });
    } else if (predicate) {
      /**
       * If a predicate is passed in, apply filters
       */
      DataStore.query(model, predicate).then(async (items) => {
        if (filter) {
          setItems(items.filter(filter));
        } else {
          setItems(items);
        }

        // eslint-disable-next-line no-unused-expressions
        afterQuery(items);
      });
    } else {
      /**
       * Default to querying a list
       */
      getItems(model, DataStore).then(async (items) => {
        if (filter) {
          console.log(`Filtering ${typename || model?.name}s with: ${filter}`);
          setItems(items.filter(filter));
        } else {
          setItems(items);
        }
        // eslint-disable-next-line no-unused-expressions
        afterQuery(items);
      });
    }
  };

  /**
   * Handles subscription for datastore
   */
  useDataStoreSubscription(model, handleQuery, enableSubscription, itemId);

  /**
   * Handle initial data loading
   */
  useEffect(() => {
    if (Array.isArray(itemsInit)) {
      setItems(itemsInit);
    } else {
      // Handle the query
      handleQuery();
    }
  }, [JSON.stringify({ itemId, predicate, itemsInit })]);

  return {
    items,
    item,
    reset: handleQuery, // temp disabled due to a bug
    isLoading,
    setIsLoading,
    ...DataStore
  };
};
