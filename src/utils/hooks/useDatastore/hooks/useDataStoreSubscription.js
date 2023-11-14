import { DataStore } from '@aws-amplify/datastore';
import { useEffect } from 'react';

export const useDataStoreSubscription = (Model, handleQuery, enableSubscription, id) => {
  useEffect(() => {
    if (enableSubscription && handleQuery) {
      console.log('Initializing Data Store Subscription');
      const subscription = DataStore.observe(Model).subscribe(handleQuery, id);

      return () => {
        console.log('Destroying Data Store Subscription');
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
