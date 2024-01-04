import useSettings from "../../utils/hooks/useSettings";
import Page from "../../utils/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import Thoughts from "../thoughts/components/Thoughts";
import {PrinterTable} from "./components/PrinterTable";

const PrintersPage = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Printers"
          subHeading={"Manage your 3D Printers"}
          icon={'mingcute:thought-line'}
        />
        <PrinterTable/>
      </Container>
    </Page>
  );
};

export default PrintersPage;