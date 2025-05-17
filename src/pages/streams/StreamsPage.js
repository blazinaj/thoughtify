import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {Streams} from "./components/Streams";

const StreamsPage = () => {
    return (
        <Page title="Thoughtify">
            <Container maxWidth={false} id={'streams-page'}>
                <HeaderBreadcrumbs
                    heading="Streams"
                    subHeading={'Share your Thoughts'}
                    icon={'fluent:stream-32-filled'}
                />
                <Streams/>
            </Container>
        </Page>
    );
}

export default StreamsPage