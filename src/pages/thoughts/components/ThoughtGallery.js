import {useDataAccordion} from '../../../utils/hooks/useDataAccordion';
import {Thought} from '../../../models';
import {ThoughtDetails} from './ThoughtDetails';
import {Link, Stack, Typography} from '@mui/material';

/**
 * A list of Thoughts in Accordion form
 * @param journalEntry
 * @param thoughts
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtGallery = ({journalEntry, thoughts}) => {

    /**
     * If a journal entry is passed in, filter the thoughts by the journal entry id.
     * @returns {(function(*): *)|undefined}
     */
  const getPredicate = () => {
    if (journalEntry?.id) {
      return (item) => item.journalEntries.journalEntry.id.eq(journalEntry.id)
    }
    return undefined
  }

    /**
     * The thought border is based on the overall tone of the thought.
     * Green for positive, orange for negative, grey for neutral.
     * @param item
     * @returns {string}
     */
  const getBorder = (item) => {
    if (item?.extract?.overallTone === "positive") {
      return "2px solid green"
    }
    if (item?.extract?.overallTone === "negative") {

      return "2px solid #ff9800" // mui warning

    }
      return "2px solid grey"

  }

  const accordion = useDataAccordion({
   items: thoughts,
    model: Thought,
    typename: 'Thought',
    titleField: (item) => {
      return (
        <Stack direction={'row'} spacing={2}
        >
          <Typography onClick={e => e.stopPropagation()}>
            <Link
                href={`/thoughts/${item?.id}`}
                underline="hover"
                color={"inherit"}
            >
              {item?.input}
            </Link>
          </Typography>
        </Stack>
      );
    },
    detailsComponent: <ThoughtDetails />,
    sortFunction: (a, b) => (b?.date || b?.createdAt)?.localeCompare(a?.date || a?.createdAt),
    predicate: getPredicate(),
    enableSubscription: true,
      accordionStyle: (item) => {
           return {
                borderLeft: getBorder(item),
            }
      }
  });

  return <div style={{borderRadius: "16px"}}>{accordion.display}</div>;
};
