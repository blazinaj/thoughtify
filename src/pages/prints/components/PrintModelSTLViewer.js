import {StlViewer} from "react-stl-viewer";
import {CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getS3File} from "../../../utils/functions/getS3File";
import {PrintModelSTLUploader} from "./PrintModelSTLUploader";


export const PrintModelSTLViewer = ({printModel}) => {
    const [stl, setStl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (printModel?.modelLink) {
            setLoading(true)
            getS3File(printModel.modelLink)
            .then((file) => {
                console.log(file)
                setStl(file)
                setLoading(false)
            })
            .catch((e) => {
                setError(e)
                setLoading(false)
            })
        }
    }, [printModel])

    if (loading) {
        return <CircularProgress/>
    }

    if (error) {
        return <Typography color={"error"}>{error.message}</Typography>
    }

    if (!stl) {
        return <PrintModelSTLUploader printModel={printModel}/>
    }

    return (
        <div>
            <StlViewer
                width={400}
                height={400}
                modelColor="#B92C2C"
                backgroundColor="#EAEAEA"
                model={stl}
                rotate={true}
                orbitControls={true}
             url={stl}
            />
        </div>
    );
}

