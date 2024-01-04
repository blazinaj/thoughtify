import {useDetails} from "../../../utils/hooks/useDetails";
import {Printer, PrintModel} from "../../../models";
import {PrintTable} from "./PrintTable";
import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";

export const PrintModelDetails = ({item}) => {

    const fieldConfig = {
        name: {
            label: "Name",
            type: "text",
            required: true,
        },
        estimatedPrintTime: {
            label: "Estimated Print Time (Hours)",
            inputType: "number",
        },
        estimatedVolume: {
            label: "Estimated Volume (mm^3)",
            inputType: "number",
        },
        estimatedWeight: {
            label: "Estimated Weight (g)",
            inputType: "number",
        },
        printSizeX: {
            label: "Print Size X (mm)",
            inputType: "number",
        },
        printSizeY: {
            label: "Print Size Y (mm)",
            inputType: "number",
        },
        printSizeZ: {
            label: "Print Size Z (mm)",
            inputType: "number",
        },
        filamentType: {
            label: "Filament Type",
            defaultValue: "PLA"
        }

    }

  const details = useDetails({
    model: PrintModel,
      item,
    typename: "PrintModel",
      fields: fieldConfig,
  })
  return (
    <Grid container spacing={2}>
        <Grid item lg={5}>
            {
                details.display
            }
        </Grid>

        <Grid item lg={7}>
            <PrintTable printModel={details?.item}/>

        </Grid>


    </Grid>
  );
}