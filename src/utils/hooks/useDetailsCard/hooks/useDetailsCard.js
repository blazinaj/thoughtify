import React, { useEffect } from 'react';
import { useDatastore } from '../../useDatastore';
import { useDetailsList } from './useDetailsList';

/**
 * Hook that queries an item from the database and displays it's fields in a list
 * @param model
 * @param itemId
 * @param fields
 * @param typename
 * @returns {{display: JSX.Element}}
 */
export const useDetailsCard = ({ model, itemId, fields, typename, fieldConfig = {}, enableSubscription }) => {
  const { item, ...dataStore } = useDatastore({
    model,
    itemId,
    typename,
    enableSubscription,
  });

  useEffect(() => {
    console.log(`Loading ${typename} Details: ` , { itemId, item });
  }, [itemId, item]);

  const list = useDetailsList({
    item,
    fields,
    fieldConfig
  });

  return {
    item,
    ...dataStore,
    ...list,
    // display: handleLoader({component: list.display, isLoading})
  };
};
