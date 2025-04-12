import { Grid } from '@mui/material';
import { ThoughtInput } from './ThoughtInput';
import { ThoughtGallery } from './ThoughtGallery';
import { ThoughtExtracts } from './ThoughtExtracts/components/ThoughtExtracts';
import { useThoughtsState } from '../hooks/useThoughtsState';

/**
 * Displays the Thoughts page for the user.
 * @param journalEntry
 * @returns {JSX.Element}
 * @constructor
 */
const Thoughts = ({ journalEntry }) => {
  const {
    showPositiveThoughts,
    showNegativeThoughts,
    showNeutralThoughts,
    setShowPositiveThoughts,
    setShowNegativeThoughts,
    setShowNeutralThoughts,
    allThoughts,
    thoughts,
    extract,
    visibleAttributes,
    setVisibleAttributes
  } = useThoughtsState({ journalEntry });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <ThoughtInput
          journalEntry={journalEntry}
          data-intro={
            'Record a Thought here. This can be anything from a note to a bit of venting about your neighbor. Anything goes!'
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <ThoughtGallery
          journalEntry={journalEntry}
          data-intro={'View your Thoughts here. You can edit them, delete them, or even add a new one!'}
          thoughts={thoughts}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <ThoughtExtracts
          journalEntry={journalEntry}
          data-intro={
            'Artificial Intelligence will extract the most important information from your Thoughts and display them here.'
          }
          visibleAttributes={!journalEntry ? visibleAttributes : undefined}
          setVisibleAttributes={!journalEntry ? setVisibleAttributes : undefined}
          extract={extract}
          allThoughts={allThoughts}
          showPositiveThoughts={showPositiveThoughts}
          setShowPositiveThoughts={setShowPositiveThoughts}
          showNegativeThoughts={showNegativeThoughts}
          setShowNegativeThoughts={setShowNegativeThoughts}
          showNeutralThoughts={showNeutralThoughts}
          setShowNeutralThoughts={setShowNeutralThoughts}
        />
      </Grid>
    </Grid>
  );
};

export default Thoughts;
