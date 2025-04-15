import Page from '../../utils/components/Page';
import { Container } from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import { useParams } from 'react-router-dom';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { JournalEntry, Thought } from '../../models';
import Card from '../../utils/components/Card';
import { JournalTimelineItemDetails } from './components/JournalTimelineItemDetails';
import * as React from 'react';

/**
 * Displays the details of a particular Thought.
 * @returns {JSX.Element}
 * @constructor
 */
const JournalDetailsPage = () => {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const datastore = useDatastore({
    model: JournalEntry,
    itemId: id
  });

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Journal Entry"
          icon={'mingcute:thought-line'}
          links={[
            {
              href: '/journal',
              name: 'Thoughts'
            },
            {
              href: `/journal/${id}`,
              name: new Date(datastore?.item?.date).toLocaleString()
            }
          ]}
        />
        <Card
          title={'Journal Entry'}
          sx={{
            mb: 2
          }}
        >
          {datastore?.item?.entry}
        </Card>
        <JournalTimelineItemDetails item={datastore.item} />,
      </Container>
    </Page>
  );
};

export default JournalDetailsPage;
