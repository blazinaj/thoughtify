import { useEffect, useState } from 'react';
import { fetchJournal } from '../../../api/journal/fetchJournal';
import { useSnackbar } from 'notistack';
import {DataStore} from "@aws-amplify/datastore";
import {Thought} from "../../../models";
import {useDatastore} from "../../../utils/hooks/useDatastore";

/**
 * Fetches Journal entries based on cadence and updates the DataStore if necessary
 * @param cadence - The cadence of the journal entries to display
 */
export const useJournalSync = ({ cadence }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // Fetch All Thoughts
  const thoughtsDatastore = useDatastore({
    model: Thought,
    enableSubscription: true
  })

  useEffect(() => {
    console.log('Fetching Journal Entries', cadence);
    const handle = async () => {
      try {
        setIsLoading(true);
        await fetchJournal({
          cadence,
          enqueueSnackbar,
          thoughts: thoughtsDatastore.items,
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('There was an error loading the Journal', {
          variant: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    handle();
  }, [cadence, thoughtsDatastore.items]);

  return {
    isLoading
  };
};
