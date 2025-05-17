import Page from '../../utils/components/Page';
import {Card, CardActionArea, Container, Stack} from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import {useDatastore} from '../../utils/hooks/useDatastore';
import {Person} from '../../models';
import {Link} from 'react-router-dom';
import {ThoughtInput} from '../thoughts/components/ThoughtInput';

/**
 * Displays a list of People that are mentioned in the user's thoughts.
 * @returns {JSX.Element}
 * @constructor
 */
const PeoplePage = () => {
  const { themeStretch } = useSettings();

  const datastore = useDatastore({
    model: Person,
    enableSubscription: true
  });

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="People"
          icon={'ic:round-workspaces'}
          subHeading={'View Thoughts related to people in your life.'}
        />
        <Stack spacing={2}>
          <ThoughtInput />
          {
              datastore?.items?.map((person) => {
              return (
                <Card>
                  <CardActionArea component={Link} to={`/people/${person.id}`} sx={{ p: 1, pr: 2, pl: 2 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                      {person.name}
                        {person.relationship}
                    </Stack>
                  </CardActionArea>
                </Card>
              );
            })
          }
        </Stack>
      </Container>
    </Page>
  );
};

export default PeoplePage;
