import {Grid, Button, Box, useMediaQuery, MenuItem, Select, Stack} from '@mui/material';
import { ThoughtInput } from './ThoughtInput';
import { ThoughtGallery } from './ThoughtGallery';
import { ThoughtExtracts } from './ThoughtExtracts/components/ThoughtExtracts';
import { useThoughtsState } from '../hooks/useThoughtsState';
import { useState } from 'react';
import { getIcon } from '@iconify/react';
import JournalTimeline from '../../journal/components/JournalTimeline';
import { BiographyDisplay } from '../../biography/components/BiographyDisplay';
import ButtonGroup from "@mui/material/ButtonGroup";
import {useTheme} from "../../../theme/useTheme";
import {JournalCadence} from "../../../models";
import {Filter, FilterList, FilterListOff} from "@mui/icons-material";

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

  // show filters by default on xl, lg, md and hide on sm and xs
  const [showFilters, setShowFilters] = useState(false);
    const [cadence, setCadence] = useState('CURRENT');
    const { theme } = useTheme();

    const smallToMid = useMediaQuery(theme.breakpoints.between('xs', 'md'));

    const cadences = [
        'CURRENT',
        JournalCadence.DAILY,
        JournalCadence.WEEKLY,
        JournalCadence.MONTHLY,
        JournalCadence.YEARLY,
        'BIOGRAPHY'
    ];

    const friendlyNames = {
        [JournalCadence.DAILY]: 'Daily',
        [JournalCadence.WEEKLY]: 'Weekly',
        [JournalCadence.MONTHLY]: 'Monthly',
        [JournalCadence.YEARLY]: 'Yearly',
        'CURRENT': 'Current',
        'BIOGRAPHY': 'Biography'
    }

  return (
    <Grid container spacing={3} id={'thoughts-container'}>
      <Grid item xs={12} lg={12} id={'thought-input-container'}>
        <ThoughtInput
          journalEntry={journalEntry}
          data-intro-id={'thought-input'}
          data-intro={
            'Record a Thought here. This can be anything from a note to a bit of venting about your neighbor. Anything goes!'
          }
        />
      </Grid>
        <Grid item xs={12} md={12}>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <Select value={cadence} size={'small'} sx={{
                    width: '200px',
                }}>
                    {cadences.map((cadenceEnum) => {
                            return (
                                <MenuItem
                                    key={cadenceEnum}
                                    onClick={() => {
                                        setCadence(cadenceEnum);
                                    }}
                                    selected={cadence === cadenceEnum}
                                    value={cadenceEnum}
                                >
                                    {friendlyNames[cadenceEnum] || cadenceEnum}
                                </MenuItem>
                            );
                        }
                    )}
                </Select>

                {/* number of thoughts */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '200px',
                    height: '40px',
                }}
                     >
                    {
                        thoughts?.length === 0 && (
                            'No Thoughts'
                        )
                    }
                    {
                        thoughts?.length === 1 && (
                            '1 Thought'
                        )

                            
                    }
                    {
                        thoughts?.length > 1 && (
                            `${thoughts.length} Thoughts`
                        )


                    }
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => setShowFilters(!showFilters)}
                    startIcon={showFilters ? <FilterListOff/> : <FilterList/>}
                    sx={{
                        width: '200px',
                        textColor: 'white',
                    }}
                    size={'small'}
                    color={'grey'}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
            </Stack>


        </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={showFilters ? 8 : 0}
        lg={showFilters ? 8 : 0}
        xl={showFilters ? 8 : 0}
        order={{
          xs: 4,
          sm: 4,
          md: 3,
          lg: 3,
          xl: 3
        }}
      >
        {cadence === 'CURRENT' && (
          <ThoughtGallery
            journalEntry={journalEntry}
            data-intro={'View your Thoughts here. You can edit them, delete them, or even add a new one!'}
            thoughts={thoughts}
            extract={extract}
          />
        )}

        {cadence !== 'CURRENT' && cadence !== 'BIOGRAPHY' && (
          <JournalTimeline cadence={cadence} journalEntry={journalEntry} />
        )}

        {cadence === 'BIOGRAPHY' && <BiographyDisplay />}
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={showFilters ? 4 : 0}
        lg={showFilters ? 4 : 0}
        xl={showFilters ? 4 : 0}
        sx={{
          marginTop: '50px',
          display: showFilters ? undefined : 'none'
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
