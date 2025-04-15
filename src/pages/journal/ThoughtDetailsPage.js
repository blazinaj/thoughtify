import Page from '../../utils/components/Page';
import { Container, Grid, Stack } from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import { ThoughtDetails } from '../thoughts/components/ThoughtDetails';
import { useParams } from 'react-router-dom';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { ProjectThoughts, Thought } from '../../models';
import Card from '../../utils/components/Card';
import { ThoughtExtractAttributeChip } from '../thoughts/components/ThoughtExtracts/components/ThoughtExtractAttributeChip';
import { DeleteItemButton } from '../../utils/components/DeleteItemButton';

/**
 * Displays the details of a particular Thought.
 * @returns {JSX.Element}
 * @constructor
 */
const ThoughtDetailsPage = () => {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const datastore = useDatastore({
    model: Thought,
    itemId: id
  });

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thought Details"
          icon={'mingcute:thought-line'}
          action={
            <Grid>
              <Stack
                direction={'column'}
                spacing={2}
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{
                  height: '100%',
                  marginRight: '-2em'
                }}
              >
                <DeleteItemButton model={Thought} item={datastore.item} />
              </Stack>
            </Grid>
          }
          links={[
            {
              href: '/thoughts',
              name: 'Thoughts'
            },
            {
              href: `/thoughts/${id}`,
              name: new Date(datastore?.item?.date).toLocaleString()
            }
          ]}
        />
        <Card
          title={'Thought'}
          actions={[<ThoughtExtractAttributeChip type={'overallTone'} value={datastore?.item?.overallTone} />]}
          sx={{
            mb: 2
          }}
        >
          {datastore?.item?.input}
        </Card>
        <ThoughtDetails item={datastore?.item} />
      </Container>
    </Page>
  );
};

export default ThoughtDetailsPage;
