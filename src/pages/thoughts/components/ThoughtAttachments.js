import React, { useEffect, useState } from 'react';
import { Storage } from '@aws-amplify/storage';
import { IconButton, Stack, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';
import LoadingScreen from "../../../demo/components/LoadingScreen";

export const ThoughtAttachments = ({ attachments }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFiles = async () => {
        setLoading(true);
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
      setLoading(false);
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

  if (loading) {
    return (
        <LoadingScreen sx={{ marginTop: '15vh' }} />
    )
  }

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
            {
              (() => {
                const fileType = file.type.split('/')[0];
                switch (fileType) {
                  case 'image':
                    return <img
                        key={index}
                        src={file.blobUrl}
                        alt={file.name}
                        content={'image/png'}
                        style={{
                          objectFit: 'contain',
                          maxWidth: '100%',
                          maxHeight: '80vh',
                          width: 'auto',
                          height: 'auto'
                        }}
                    />
                  case 'video':
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    return <video controls >
                      <source src={file.blobUrl} type="video/mp4"/>
                    </video>;
                  case 'audio':
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    return <audio src={file.blobUrl} controls />;
                  default:
                    return <a href={file.blobUrl} download>Click to Download: {file.name}</a>;
                }
              })()
            }
          </Stack>
        );
      })}
    </Stack>
  );
};
