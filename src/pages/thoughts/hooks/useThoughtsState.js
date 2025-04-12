import { useDatastore } from '../../../utils/hooks/useDatastore';
import { Thought, ThoughtAttributes } from '../../../models';
import { useEffect, useMemo, useState } from 'react';
import { useThoughtExtractData } from '../components/ThoughtExtracts/hooks/useThoughtExtractData';
import { DataStore } from '@aws-amplify/datastore';

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

  // temporarily convert the 'extract' AWSJSON field to the attribute field
  useEffect(() => {
    if (thoughtsDatastore?.items) {
      for (const thought of thoughtsDatastore.items) {
        DataStore.save(
          Thought.copyOf(thought, (updated) => {
            for (const attribute of Object.values(ThoughtAttributes)) {
              if (thought.extract?.[attribute] && thought[attribute] !== thought.extract?.[attribute]) {
                updated[attribute] = thought.extract?.[attribute];
              }
            }
            return updated;
          })
        ).then((thouht) => {
          console.log('transformed thought', thouht);
        });
      }
    }
  }, [thoughtsDatastore?.items]);

  const [allThoughts, setAllThoughts] = useState({
    positiveThoughts: [],
    negativeThoughts: [],
    neutralThoughts: []
  });

  /**
   * Extracts is an object with attributes as keys and values as arrays of values
   */
  const { extract } = useThoughtExtractData({
    thoughts: thoughtsDatastore.items
  });

  // ['emotions', 'people', 'projects', 'categories', 'reminders', 'questions']

  const initializeVisibleAttributes = (extract) => {
    if (!extract) {
      return {};
    }
    const newAttributes = {};
    for (const [key, values] of Object.entries(extract)) {
      for (const value of values) {
        // uses key-value to avoid potential conflicts. Such as an emotion named 'happy' and a person named 'happy'
        const attributeId = `${key}-${value}`;
        newAttributes[attributeId] = true;
      }
    }
    return newAttributes;
  };

  const [visibleAttributes, setVisibleAttributes] = useState(() => initializeVisibleAttributes(extract) || {});

  // Initializes the visible attributes based on the extract
  // useEffect(() => {
  //   if (extract) {
  //     setVisibleAttributes(attributes => {
  //       const newAttributes = {...attributes};
  //       // key is the attribute name, values is an array of values
  //       // for example: { emotions: ['happy', 'sad'] }
  //       // these are saved in the dict like this: { 'emotions-happy': true, 'emotions-sad': true }
  //       for (const [key, values] of Object.entries(extract)) {
  //         for (const value of values) {
  //           // uses key-value to avoid potential conflicts. Such as an emotion named 'happy' and a person named 'happy'
  //           const attributeId = `${key}-${value}`;
  //           newAttributes[attributeId] = newAttributes[attributeId] ?? true;
  //         }
  //       }
  //       return newAttributes;
  //     })
  //   }
  // }, [extract])

  const [showPositiveThoughts, setShowPositiveThoughts] = useState(true);
  const [showNegativeThoughts, setShowNegativeThoughts] = useState(false);
  const [showNeutralThoughts, setShowNeutralThoughts] = useState(true);

  // Set the thoughts state based on the visible attributes when the thoughtsDatastore changes
  useEffect(() => {
    if (thoughtsDatastore?.items) {
      // filter thoughts based on the visible attributes
      // and the overall tone of the thought

      const visibleThoughts = thoughtsDatastore?.items?.filter((thought) => {
        // check if the thought is visible based on the attributes
        // extract ex: { emotions: ['happy', 'sad'], people: ['bob'], overallTone: 'positive' }
        let isVisible = true;

        for (const attribute of Object.values(ThoughtAttributes)) {
          // key is the category and values are the present attribute values
          // ex: { emotions: ['happy', 'sad'] }
          // attribute values like ['happy', 'sad']
          const values = thought[attribute];
          const attributeValues = Array.isArray(values) ? values : [values];

          // check if the attribute is in the visible attributes
          for (const value of attributeValues) {
            // key ex: 'emotions-happy'
            const keyId = `${attribute}-${value}`;
            // if the key is false in visible attributes, set isVisible to false
            if (visibleAttributes[keyId] === false) {
              isVisible = false;
            }
          }
        }

        return isVisible;
      });

      setAllThoughts({
        positiveThoughts: visibleThoughts?.filter((thought) => {
          return thought?.overallTone === 'positive';
        }),
        negativeThoughts: visibleThoughts?.filter((thought) => {
          return thought?.overallTone === 'negative';
        }),
        neutralThoughts: visibleThoughts?.filter((thought) => {
          return thought?.overallTone !== 'positive' && thought?.overallTone !== 'negative';
        })
      });
    }
  }, [thoughtsDatastore?.items, visibleAttributes]);

  const thoughts = useMemo(() => {
    return [
      ...(showPositiveThoughts ? allThoughts.positiveThoughts : []),
      ...(showNegativeThoughts ? allThoughts.negativeThoughts : []),
      ...(showNeutralThoughts ? allThoughts.neutralThoughts : [])
    ];
  }, [showPositiveThoughts, showNegativeThoughts, showNeutralThoughts, allThoughts]);

  return {
    allThoughts,
    thoughts,
    extract,
    showPositiveThoughts,
    setShowPositiveThoughts,
    showNegativeThoughts,
    setShowNegativeThoughts,
    showNeutralThoughts,
    setShowNeutralThoughts,
    visibleAttributes,
    setVisibleAttributes
  };
};
