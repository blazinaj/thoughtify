import {useDetails} from "../../../utils/hooks/useDetails";
import {Printer} from "../../../models";
import {PrintTable} from "./PrintTable";
import {Grid} from "@mui/material";

export const PrinterDetails = ({item}) => {
  const details = useDetails({
    model: Printer,
      item,
      fields: {
        name: {
            label: "Name",
            type: "text",
            required: true,
        },
          status: {
                label: "Status",
                type: "text",

          }
      }
  })
  return (
    <Grid container spacing={2}>
        <Grid item lg={12}>

            {
                details.display
            }
        </Grid>

        <Grid item lg={12}>
            <PrintTable
                printer={item}
            />
        </Grid>


    </Grid>
  );
}