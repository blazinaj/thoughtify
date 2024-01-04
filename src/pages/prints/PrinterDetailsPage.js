import useSettings from "../../utils/hooks/useSettings";
import {useParams} from "react-router-dom";
import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {PrinterDetails} from "./components/PrinterDetails";
import {useDatastore} from "../../utils/hooks/useDatastore";
import {Printer} from "../../models";

const PrinterDetailsPage = () => {
    const { themeStretch } = useSettings();

    const {id} = useParams();

    const datastore = useDatastore({
        model: Printer,
        typename: "Printer",
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
                            href: '/printers',
                            name: 'Printers'
                        },
                        {
                            href: `/printers/${id}`,
                            name: 'Printer Details'
                        }
                    ]}
                />
                <PrinterDetails item={datastore?.item}/>
            </Container>
        </Page>
    );
};

export default PrinterDetailsPage;