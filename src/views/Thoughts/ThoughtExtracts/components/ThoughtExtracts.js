import {useDatastore} from '../../../../utils/hooks/useDatastore';
import {Thought} from '../../../../models';
import {Masonry} from '@mui/lab';
import {useThoughtExtractData} from "../hooks/useThoughtExtractData";
import {ThoughtExtractCards} from "./ThoughtExtractCards";

/**
 * Displays a list of Thought Extract Attribute cards from all of the user's thoughts
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtExtracts = ({journalEntry}) => {

  const getPredicate = () => {
    if (journalEntry?.id) {
      return (item) => item?.journalEntries?.journalEntry.id.eq(journalEntry?.id)
    }
    return undefined
  }

  /**
   * Fetches a list of Thoughts from the database, and subscribes to updates automatically
   * @type {{items: *[]}}
   */
  const thoughtDatastore = useDatastore({
    model: Thought,
    enableSubscription: true,
    predicate: getPredicate(),
  });

  /**
   * Extracts is an object with attributes as keys and values as arrays of values
   */
  const {extract} = useThoughtExtractData({
    thoughts: thoughtDatastore.items
  })

  return (
    <Masonry
      spacing={2}
      columns={{
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 2
      }}
      sx={{ width: 'auto' }}
    >
      <ThoughtExtractCards
        extract={extract}
      />
    </Masonry>
  );
};
