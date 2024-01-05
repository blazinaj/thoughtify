import {PrintForm} from "./PrintForm";
import {Button, Grid} from "@mui/material";
import {PrintPhotoViewer} from "./PrintPhotoViewer";
import Card from "../../../utils/components/Card";
import {useState} from "react";
import {PrintPhotoUploader} from "./PrintPhotoUploader";

export const PrintDetails = ({item}) => {

    const [showUpload, setShowUpload] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} >
          <Card
                title={"Details"}
          >
              <PrintForm
                  item={item}
              />
          </Card>
      </Grid>

        <Grid item lg={6}>
            <Card
                title={"Photos"}
                actions={[
                    showUpload ? <Button
                        onClick={() => setShowUpload(false)}
                    >
                        View
                    </Button> : <Button onClick={() => setShowUpload(true)}>
                        Edit
                    </Button>
                ]}
                sx={{
                    height: "100%"
                }}
            >
                {
                    showUpload ? <PrintPhotoUploader item={item}/> : <PrintPhotoViewer item={item}/>
                }
            </Card>
        </Grid>
    </Grid>
  );
}