import { Grid, Button } from '@mui/material';
import { ThoughtInput } from './ThoughtInput';
import { ThoughtGallery } from './ThoughtGallery';
import { ThoughtExtracts } from './ThoughtExtracts/components/ThoughtExtracts';
import { useThoughtsState } from '../hooks/useThoughtsState';
import {useState} from "react";
import {getIcon} from "@iconify/react";
import JournalTimeline from "../../journal/components/JournalTimeline";
import {BiographyDisplay} from "../../biography/components/BiographyDisplay";

/**
 * Displays the Thoughts page for the user.
 * @param journalEntry
 * @returns {JSX.Element}
 * @constructor
 */
const Thoughts = ({ journalEntry, cadence = 'CURRENT' }) => {
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



  // show filters by default on xl, lg, md and hide on sm and xs
  const [showFilters, setShowFilters] = useState(false);

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
        <Grid item xs={12} lg={12}
              sx={{
                  marginTop: '-10px',
                  marginBottom: '-125px',
              }}>

            <Button
                variant="subtle"
                onClick={() => setShowFilters(!showFilters)}
                startIcon={getIcon(showFilters ? 'ic:baseline-filter-list' : 'ic:baseline-filter-list-off')}
                sx={{
                    float: 'right',
                    zIndex: 999,
                }}
                size={'small'}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
        </Grid>

      <Grid item xs={12} sm={12} md={showFilters ? 8 : 0} lg={showFilters ? 8 : 0} xl={showFilters ? 8 : 0}

            order={{
                xs: 4,
                sm: 4,
                md: 3,
                lg: 3,
                xl: 3
            }}
      >
          {
              cadence === 'CURRENT' && (
                  <ThoughtGallery
                      journalEntry={journalEntry}
                      data-intro={'View your Thoughts here. You can edit them, delete them, or even add a new one!'}
                      thoughts={thoughts}
                      extract={extract}
                  />
              )
          }

          {
              cadence !== 'CURRENT' && cadence !== 'BIOGRAPHY' && (
                    <JournalTimeline cadence={cadence} journalEntry={journalEntry} />
              )
          }

        {
            cadence === 'BIOGRAPHY' && (
                <BiographyDisplay />
            )
        }

      </Grid>

      <Grid item xs={12} sm={12} md={showFilters ? 4 : 0} lg={showFilters ? 4 : 0} xl={showFilters ? 4 : 0}
            sx={{
                marginTop: '50px',
                display: showFilters ? undefined : 'none',
            }}
            order={{
                xs: 3,
                sm: 3,
                md: 4,
                lg: 4,
                xl: 4
            }}
      >
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
