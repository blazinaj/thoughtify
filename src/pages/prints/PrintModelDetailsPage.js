import useSettings from "../../utils/hooks/useSettings";
import {useParams} from "react-router-dom";
import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {PrinterDetails} from "./components/PrinterDetails";
import {useDatastore} from "../../utils/hooks/useDatastore";
import {Printer, PrintModel} from "../../models";
import {PrintModelDetails} from "./components/PrintModelDetails";

const PrinterDetailsPage = () => {
    const { themeStretch } = useSettings();

    const {id} = useParams();

    const datastore = useDatastore({
        model: PrintModel,
        typename: "3D Model",
        itemId: id,
        enableSubscription: true,
    })

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    // heading={new Date(datastore?.item?.date).toLocaleString()}
                    // icon={'mingcute:thought-line'}
                    links={[
                        {
                            href: '/print-models',
                            name: '3D Models'
                        },
                        {
                            href: `/print-models/${id}`,
                            name: 'Model Details'
                        }
                    ]}
                />
                <PrintModelDetails item={datastore?.item}/>
            </Container>
        </Page>
    );
};

export default PrinterDetailsPage;