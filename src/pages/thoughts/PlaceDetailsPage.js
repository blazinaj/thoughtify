import Page from '../../utils/components/Page';
import {Container} from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import {useParams} from 'react-router-dom';
import {ThoughtExtractInsight} from "./components/ThoughtExtracts/components/ThoughtExtractInsight";
import {sentenceCase} from "change-case";

/**
 * Displays the details of a particular Place.
 * @returns {JSX.Element}
 * @constructor
 */
const PlaceDetailsPage = () => {
    const { themeStretch } = useSettings();

    const { id } = useParams();

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading='Place Details'
                    icon={'mingcute:thought-line'}
                    links={[
                        {
                            href: '/thoughts',
                            name: 'Thoughts'
                        },
                        {
                            name: 'Places'
                        },
                        {
                            href: `/thoughts/places/${id}`,
                            name: sentenceCase(id)
                        }
                    ]}
                />
                <ThoughtExtractInsight type={'places'} value={id} />
            </Container>
        </Page>
    );
};

export default PlaceDetailsPage;
