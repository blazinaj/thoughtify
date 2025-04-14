import Page from '../../utils/components/Page';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import {useParams} from 'react-router-dom';
import {sentenceCase} from "change-case";
import {ProjectDetails} from "./projects/ProjectDetails";
import {Container} from "@mui/material";

/**
 * Displays the details of a particular Place.
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectDetailsPage = () => {

    const { id } = useParams();

    return (
        <Page title="Thoughtify">
            <Container>
                <HeaderBreadcrumbs
                    heading='Project Details'
                    icon={'mingcute:thought-line'}
                    links={[
                        {
                            href: `/projects`,
                            name: 'Projects'
                        },
                        {
                            href: `/projects/${id}`,
                            name: sentenceCase(id)
                        }
                    ]}
                />
                <ProjectDetails/>
            </Container>
        </Page>
    );
};

export default ProjectDetailsPage;
