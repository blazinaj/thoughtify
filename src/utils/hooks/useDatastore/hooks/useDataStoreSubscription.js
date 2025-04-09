import { DataStore } from '@aws-amplify/datastore';
import { useEffect } from 'react';

export const useDataStoreSubscription = (Model, handleQuery, enableSubscription, id) => {
  useEffect(() => {
    if (enableSubscription && handleQuery) {
      const subscription = DataStore.observe(Model).subscribe(handleQuery, id);

      return () => {
        subscription.unsubscribe();
      };
    }
    // eslint-disable-next-line
    else if (!enableSubscription) {
      // Handle the query
      handleQuery();
    }
  }, [id]);
};
