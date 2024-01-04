import useSettings from "../../utils/hooks/useSettings";
import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {PrintModelTable} from "./components/PrintModelTable";

const PrintersPage = () => {
    const { themeStretch } = useSettings();

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="3D Models"
                    subHeading={"Manage your 3D Models"}
                    icon={'mingcute:thought-line'}
                />
                <PrintModelTable/>
            </Container>
        </Page>
    );
};

export default PrintersPage;