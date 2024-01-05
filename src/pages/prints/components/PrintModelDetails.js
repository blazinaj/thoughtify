import {useDetails} from "../../../utils/hooks/useDetails";
import {PrintModel} from "../../../models";
import {PrintTable} from "./PrintTable";
import {Button, Grid} from "@mui/material";
import {PrintModelSTLViewer} from "./PrintModelSTLViewer";
import Card from "../../../utils/components/Card";
import {PrintModelForm} from "./PrintModelForm";
import {DataStore} from "@aws-amplify/datastore";

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

    const deleteS3File = async (key) => {
        // delete the file from S3 and then remove the key from the PrintModel object
        await Storage.remove(key, { level: 'private' });

        DataStore.query(PrintModel, item.id).then((printModel) => {
            DataStore.save(PrintModel, PrintModel.copyOf(printModel, (updated) => {
                updated.modelLink = null;
            }))
        })

    }

  return (
    <Grid container spacing={2}>
        <Grid item lg={5}>
            <Card
                title={"Details"}
            >
                <PrintModelForm item={item}/>
            </Card>
        </Grid>

        <Grid item lg={7} container spacing={1}>
            <Grid item lg={12}>
                <Card
                    title={"3D Model"}
                    headerButton={
                        <Button
                            onClick={async () => {
                                await deleteS3File(item.modelLink);
                            }}
                        >
                            Remove
                        </Button>
                    }
                >
                    <PrintModelSTLViewer printModel={item}/>
                </Card>
            </Grid>


            <Grid item lg={12}>
                <PrintTable printModel={item}/>
            </Grid>
        </Grid>




    </Grid>
  );
}