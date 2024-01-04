import useSettings from "../../utils/hooks/useSettings";
import {useParams} from "react-router-dom";
import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {useDatastore} from "../../utils/hooks/useDatastore";
import {PrintModel} from "../../models";
import {PrintDetails} from "./components/PrintDetails";

const PrintDetailsPage = () => {
    const { themeStretch } = useSettings();

    const {id, printerId} = useParams();

    const datastore = useDatastore({
        model: PrintModel,
        typename: "3D Model",
        itemId: id,
        enableSubscription: true,
    })
    
    const getLinks = () => {
        const links = [];

        if (printerId) {
            links.push({
                href: `/printers/${printerId}`,
                name: 'Printer'
            })
        }

        if (!printerId) {
            links.push({
                href: `/prints`,
                name: 'Prints'
            })
        }

        links.push(
            ...[
                {
                    href: `/prints/${id}`,
                    name: 'Print Details'
                }
            ]
        )

        return links;
    }

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    // heading={new Date(datastore?.item?.date).toLocaleString()}
                    // icon={'mingcute:thought-line'}
                    links={getLinks()}
                />
                <PrintDetails item={datastore?.item}/>
            </Container>
        </Page>
    );
};

export default PrintDetailsPage;