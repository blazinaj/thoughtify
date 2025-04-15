import Page from '../../utils/components/Page';
import { Container } from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import { useParams } from 'react-router-dom';
import { ThoughtExtractInsight } from '../thoughts/components/ThoughtExtracts/components/ThoughtExtractInsight';
import { sentenceCase } from 'change-case';

/**
 * Displays the details of a particular Place.
 * @returns {JSX.Element}
 * @constructor
 */
const CategoryDetailsPage = () => {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Category Details"
          icon={'mingcute:thought-line'}
          links={[
            {
              href: '/journal',
              name: 'Journal'
            },
            {
              name: 'Categories'
            },
            {
              href: `/thoughts/categories/${id}`,
              name: sentenceCase(id)
            }
          ]}
        />
        <ThoughtExtractInsight type={'categories'} value={id} />
      </Container>
    </Page>
  );
};

export default CategoryDetailsPage;
