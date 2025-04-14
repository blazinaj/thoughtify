import Page from '../../utils/components/Page';
import {Box, Button, Container, useMediaQuery} from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import Thoughts from './components/Thoughts';
import ButtonGroup from "@mui/material/ButtonGroup";
import {JournalCadence} from "../../models";
import {useState} from "react";
import {useTheme} from "../../theme/useTheme";
import Scrollbar from "../../demo/components/Scrollbar";

/**
 * Displays the main Thoughts page for the user.
 * @returns {JSX.Element}
 * @constructor
 */
const ThoughtsPage = () => {
  const { themeStretch } = useSettings();

    const [cadence, setCadence] = useState('CURRENT');
    const { theme } = useTheme();

    const smallToMid = useMediaQuery(theme.breakpoints.between('xs', 'md'));

    const cadences = [
        'CURRENT',
        JournalCadence.DAILY,
        JournalCadence.WEEKLY,
        JournalCadence.MONTHLY,
        JournalCadence.YEARLY,
        'BIOGRAPHY',
    ]

    return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Journal"
          subHeading={'Collect your Thoughts and extract Insights'}
          icon={'carbon:book'}
            action={!smallToMid &&
                <Box display="flex" justifyContent="left">
                    <ButtonGroup orientation={ 'horizontal'} size={'small'}>
                        {cadences.map((cadenceEnum) => {
                            return (
                                <Button
                                    key={cadenceEnum}
                                    onClick={() => {
                                        setCadence(cadenceEnum);
                                    }}
                                    variant={cadence === cadenceEnum ? 'contained' : 'outlined'}
                                    size={'small'}
                                >
                                    {
                                        cadenceEnum === 'CURRENT' ? 'NOW' : cadenceEnum
                                    }
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </Box>
            }
        />
          {
            smallToMid && (
                  <Box display="flex" justifyContent="left" sx={{mb: '2em', mt: '-1em'}}>
                      <Scrollbar>

                          <ButtonGroup orientation={ 'horizontal'} size={'small'}>
                              {cadences.map((cadenceEnum) => {
                                  return (
                                      <Button
                                          key={cadenceEnum}
                                          onClick={() => {
                                              setCadence(cadenceEnum);
                                          }}
                                          variant={cadence === cadenceEnum ? 'contained' : 'outlined'}
                                          size={'small'}
                                      >
                                          {
                                              cadenceEnum === 'CURRENT' ? 'NOW' : cadenceEnum
                                          }
                                      </Button>
                                  );
                              })}
                          </ButtonGroup>
                      </Scrollbar>
                  </Box>
              )
          }
        <Thoughts cadence={cadence} />
      </Container>
    </Page>
  );
};

export default ThoughtsPage;
