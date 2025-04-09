import { useDatastore } from '../../../utils/hooks/useDatastore';
import { Thought } from '../../../models';
import { useEffect, useMemo, useState } from 'react';
import { Chip } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

  const [positiveThoughts, setPositiveThoughts] = useState([]);
  const [negativeThoughts, setNegativeThoughts] = useState([]);
  const [neutralThoughts, setNeutralThoughts] = useState([]);

  const [showPositiveThoughts, setShowPositiveThoughts] = useState(true);
  const [showNegativeThoughts, setShowNegativeThoughts] = useState(false);
  const [showNeutralThoughts, setShowNeutralThoughts] = useState(true);

  useEffect(() => {
    if (thoughtsDatastore?.items) {
      setPositiveThoughts(
        thoughtsDatastore?.items?.filter((thought) => {
          return thought?.extract ? thought?.extract?.overallTone === 'positive' : false;
        })
      );
      setNegativeThoughts(
        thoughtsDatastore?.items?.filter((thought) => {
          return thought?.extract ? thought?.extract?.overallTone === 'negative' : false;
        })
      );
      setNeutralThoughts(
        thoughtsDatastore?.items?.filter((thought) => {
          return thought?.extract
            ? thought?.extract?.overallTone !== 'positive' && thought?.extract?.overallTone !== 'negative'
            : true;
        })
      );
    }
  }, [thoughtsDatastore?.items]);

  const thoughts = useMemo(() => {
    return [
      ...(showPositiveThoughts ? positiveThoughts : []),
      ...(showNegativeThoughts ? negativeThoughts : []),
      ...(showNeutralThoughts ? neutralThoughts : [])
    ];
  }, [
    showPositiveThoughts,
    showNegativeThoughts,
    showNeutralThoughts,
    positiveThoughts,
    negativeThoughts,
    neutralThoughts
  ]);

  return {
    thoughts,
    showPositiveThoughts,
    setShowPositiveThoughts,
    showNegativeThoughts,
    setShowNegativeThoughts,
    showNeutralThoughts,
    setShowNeutralThoughts,
    positiveThoughts,
    negativeThoughts,
    neutralThoughts
  };
};
