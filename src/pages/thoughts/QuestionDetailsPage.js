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
const QuestionDetailsPage = () => {
    const { themeStretch } = useSettings();

    const { id } = useParams();

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading='Question Details'
                    icon={'mingcute:thought-line'}
                    links={[
                        {
                            href: '/thoughts',
                            name: 'Thoughts'
                        },
                        {
                            name: 'Questions'
                        },
                        {
                            href: `/thoughts/questions/${id}`,
                            name: sentenceCase(id)
                        }
                    ]}
                />
                <ThoughtExtractInsight type={'questions'} value={id} />
            </Container>
        </Page>
    );
};

export default QuestionDetailsPage;
