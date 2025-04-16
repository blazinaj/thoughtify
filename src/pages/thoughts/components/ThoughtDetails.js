import Card from '../../../utils/components/Card';
import {sentenceCase} from 'change-case';
import {Masonry} from '@mui/lab';
import {ThoughtExtractAttributeChips} from './ThoughtExtracts/components/ThoughtExtractAttributeChips';
import {
  Box,
  CardActionArea,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import {ThoughtAttributes} from '../../../models';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {Icon} from "@iconify/react";
import prettyBytes from "pretty-bytes";
import {useModal} from "../../../utils/hooks/useModal";
import {Storage} from "@aws-amplify/storage";

/**
 * Similar thoughts
 * emotions
 * People
 * Projects
 * Categories
 *
 * @param thought
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtDetails = ({ item }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (item) {
      const handle = async () => {
        const res = [];
        const itemProjects = (await item.relatedProjects?.toArray()) ?? [];
        for (const projectConn of itemProjects) {
          // de-dupe

          if (!projectConn?.projectId || !projectConn?.thoughtId) {
            // eslint-disable-next-line no-continue
            continue;
          }
          const project = await projectConn.project;

          // de-dupe
          if (res.find((p) => p.id === project.id)) {
            // eslint-disable-next-line no-continue
            continue;
          }

          const taskConns = (await project?.tasks?.toArray()) ?? [];
          const tasks = [];
          for (const taskConn of taskConns) {
            const task = await taskConn.task;
            tasks.push({
              ...task,
              task
            });
          }
          res.push({
            ...project,
            tasks
          });
        }
        setProjects(res);
      };
      handle();
    }
  }, [item]);


  const modal = useModal({
    title: 'Attachments',
    children: <AttachmentsModal attachments={item?.attachments} />,
  })

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Masonry
          columns={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4
          }}
          spacing={2}
          // minHeight={200}
          sx={{ width: 'auto' }}
        >
          {
              item?.attachments && item?.attachments.length > 0 && (
                  <Card key={'thought-attachments'} title={'Attachments'}>
                    {modal.modalButton}
                    <List>
                      {
                        item.attachments.map((attachment, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                  <IconButton edge="end" aria-label="delete" onClick={() => {
                                    // setAttachments((prevState) => prevState.filter((_, i) => i !== index));
                                  }}
                                  >
                                    <Icon icon="material-symbols:cancel-outline-rounded" width={24} height={24} />
                                  </IconButton>
                                }
                            >
                              <ListItemAvatar>
                                {/*<Avatar*/}
                                {/*    src={URL.createObjectURL(attachment)}*/}
                                {/*/>*/}
                              </ListItemAvatar>
                              <ListItemText primary={attachment.name} secondary={prettyBytes(attachment.size)} />
                            </ListItem>
                        ))
                      }
                    </List>
                  </Card>
              )
          }
          {Object.values(ThoughtAttributes).map((attribute) => {
            const value = item?.[attribute];

            if (attribute === 'projects' && projects?.length > 0) {
              return (
                <Card key={attribute} title={sentenceCase(attribute)}>
                  <Stack spacing={2}>
                    {
                      // list of projects with name, status, and task progress
                      projects?.map((project) => {
                        const tasks = project.tasks;
                        const completedTasks = tasks.filter((projectTask) => projectTask.status === 'COMPLETED');
                        const inProgressTasks = tasks.filter((projectTask) => projectTask.status === 'IN_PROGRESS');
                        const value = (completedTasks.length / tasks.length) * 100;
                        return (
                          <Card title={project.name} subTitle={project.status}>
                            <CardActionArea component={Link} to={`/projects/${project.id}`} sx={{ p: 1, pr: 2, pl: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                  <LinearProgress variant="determinate" value={value} />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${Math.round(
                                    value
                                  )}%`}</Typography>
                                </Box>
                              </Box>
                            </CardActionArea>
                          </Card>
                        );
                      })
                    }
                  </Stack>
                </Card>
              );
            }

            const excludedAttributes = ['overallTone', 'projects'];
            if (excludedAttributes.includes(attribute)) {
              return null;
            }
            if (value && value.length > 0) {
              return (
                <Card key={attribute} title={sentenceCase(attribute)}>
                  <ThoughtExtractAttributeChips value={value} attribute={attribute} thought={item} />
                </Card>
              );
            }
            return null;
          })}
        </Masonry>
      </Grid>
    </Grid>
  );
};


const AttachmentsModal = ({attachments}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const handleFiles = async () => {
      const fileArray = [];
      for (const attachment of attachments) {
        const signedURL = await Storage.get(attachment.url); // get key from Storage.list
        fileArray.push(signedURL);
      }
      setFiles(fileArray);
    }
    if (attachments) {
      handleFiles();
    }
  }, [attachments])

  return (
    <Stack spacing={2} >
        <Typography variant="h6">Attachments</Typography>
      {
        files.map((file, index) => (
            <img key={index} src={file} alt={'test '} height={500} content={'image/png'}/>
        ))
      }
    </Stack>
  )

}