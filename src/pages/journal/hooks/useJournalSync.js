import {useEffect, useState} from "react";
import {fetchJournal} from "../functions/fetchJournal";
import {useSnackbar} from "notistack";

/**
 * Fetches Journal entries based on cadence and updates the DataStore if necessary
 * @param cadence
 */
export const useJournalSync = ({cadence}) => {

  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handle = async () => {
      try {
        setIsLoading(true);
        await fetchJournal({
          cadence,
          enqueueSnackbar
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar("There was an error loading the Journal", {
          variant: 'error'
        })
      }
      finally {
        setIsLoading(false);
      }
    }

    handle();
  }, [cadence]);

  return {
    isLoading
  }
}