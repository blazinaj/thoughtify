import React, { useEffect, useState } from 'react';
import { Storage } from '@aws-amplify/storage';
import { IconButton, Stack, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';

export const ThoughtAttachments = ({ attachments }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const handleFiles = async () => {
      const fileArray = [];
      for (const attachment of attachments) {
        const s3Result = await Storage.get(attachment.url, { download: true }); // get key from Storage.list
        const blob = s3Result.Body;
        const blobUrl = URL.createObjectURL(blob);
        fileArray.push({
          ...attachment,
          blobUrl
        });
      }
      setFiles(fileArray);
    };
    if (attachments) {
      handleFiles();
    }
  }, [attachments]);

  const handleDownload = async (attachment) => {
    const s3Result = await Storage.get(attachment.url, { download: true }); // get key from Storage.list
    const blob = s3Result.Body;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Stack spacing={2}>
      {files.map((file, index) => {
        return (
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
              <Typography>{file.name}</Typography>
              <IconButton onClick={() => handleDownload(file)}>
                <Download />
              </IconButton>
            </Stack>
            <img key={index} src={file.blobUrl} alt={'test '} height={500} content={'image/png'} />
          </Stack>
        );
      })}
    </Stack>
  );
};
