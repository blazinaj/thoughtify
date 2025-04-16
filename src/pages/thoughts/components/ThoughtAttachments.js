import React, {useEffect, useState} from "react";
import {Storage} from "@aws-amplify/storage";
import {IconButton, Stack, Typography} from "@mui/material";
import {Download} from "@mui/icons-material";

export const ThoughtAttachments = ({attachments}) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const handleFiles = async () => {
            const fileArray = [];
            for (const attachment of attachments) {
                const s3Result = await Storage.get(attachment.url, {download: true}); // get key from Storage.list
                console.log(s3Result)
                const blob = s3Result.Body
                const blobUrl = URL.createObjectURL(blob);
                fileArray.push(blobUrl);
            }
            setFiles(fileArray);
        }
        if (attachments) {
            handleFiles();
        }
    }, [attachments])

    return (
        <Stack spacing={2} >
            {
                files.map((file, index) => {
                    console.log({file})

                    return (
                        <Stack direction={'column'} spacing={2}>
                            <Stack direciton={'row'} spacing={2} justifyContent={'space-between'}>
                                <Typography>
                                    File Name
                                </Typography>
                                <IconButton>
                                    <Download/>
                                </IconButton>
                            </Stack>
                            <img key={index} src={file} alt={'test '} height={500} content={'image/png'}/>
                        </Stack>
                )})
            }
        </Stack>
    )

}