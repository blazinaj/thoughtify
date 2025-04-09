import Page from '../../utils/components/Page';
import { Container } from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import { ThoughtDetails } from './components/ThoughtDetails';
import { useParams } from 'react-router-dom';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { Thought } from '../../models';
import Card from '../../utils/components/Card';

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
          heading={new Date(datastore?.item?.date).toLocaleString()}
          links={[
            {
              href: '/thoughts',
              name: 'Thoughts'
            },
            {
              href: `/thoughts/${id}`,
              name: 'Thought Details'
            }
          ]}
        />
        <Card
          title={'Thought'}
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
