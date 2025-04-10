import {useDatastore} from '../../../utils/hooks/useDatastore';
import {Thought} from '../../../models';
import {useEffect, useMemo, useState} from 'react';

/**
 * Custom hook to manage the state of the thoughts page.
 * @param journalEntry
 */
export const useThoughtsState = ({ journalEntry }) => {
  /**
   * If a journal entry is passed in, filter the thoughts by the journal entry id.
   * @returns {(function(*): *)|undefined}
   */
  const getPredicate = () => {
    if (journalEntry?.id) {
      return (item) => item.journalEntries.journalEntry.id.eq(journalEntry.id);
    }
    return undefined;
  };

  /**
   * Datastore for Thoughts.
   * @type {{items: *[]}}
   */
  const thoughtsDatastore = useDatastore({
    model: Thought,
    enableSubscription: true,
    predicate: getPredicate()
  });

  const [allThoughts, setAllThoughts] = useState({
    positiveThoughts: [],
    negativeThoughts: [],
    neutralThoughts: []
  })

  const [showPositiveThoughts, setShowPositiveThoughts] = useState(true);
  const [showNegativeThoughts, setShowNegativeThoughts] = useState(false);
  const [showNeutralThoughts, setShowNeutralThoughts] = useState(true);

  useEffect(() => {
    if (thoughtsDatastore?.items) {
      setAllThoughts({
        positiveThoughts: thoughtsDatastore?.items?.filter((thought) => {
          return thought?.extract ? thought?.extract?.overallTone === 'positive' : false;
        }),
        negativeThoughts: thoughtsDatastore?.items?.filter((thought) => {
          return thought?.extract ? thought?.extract?.overallTone === 'negative' : false;
        }),
        neutralThoughts: thoughtsDatastore?.items?.filter((thought) => {
            return thought?.extract
                ? thought?.extract?.overallTone !== 'positive' && thought?.extract?.overallTone !== 'negative'
                : true;
        })
      })
    }
  }, [thoughtsDatastore?.items]);

  const thoughts = useMemo(() => {
    return [
      ...(showPositiveThoughts ? allThoughts.positiveThoughts : []),
      ...(showNegativeThoughts ? allThoughts.negativeThoughts : []),
      ...(showNeutralThoughts ? allThoughts.neutralThoughts : [])
    ];
  }, [
    showPositiveThoughts,
    showNegativeThoughts,
    showNeutralThoughts,
    allThoughts
  ]);

  return {
    allThoughts,
    thoughts,
    showPositiveThoughts,
    setShowPositiveThoughts,
    showNegativeThoughts,
    setShowNegativeThoughts,
    showNeutralThoughts,
    setShowNeutralThoughts,
  };
};
