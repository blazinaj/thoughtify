import useSettings from "../../utils/hooks/useSettings";
import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {PrintTable} from "./components/PrintTable";

const PrintersPage = () => {
    const { themeStretch } = useSettings();

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="3D Prints"
                    subHeading={"View and Manage 3D Prints"}
                    icon={'mingcute:thought-line'}
                />
                <PrintTable/>
            </Container>
        </Page>
    );
};

export default PrintersPage;