// displays a list of projects with the project name, date of last thought, task progress, and a link to the project details page

import {useParams} from "react-router-dom";
import {useDatastore} from "../../../utils/hooks/useDatastore";
import Card from "../../../utils/components/Card";
import {Project, Task, Thought} from "../../../models";
import {Grid, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {ThoughtExtractInsight} from "../components/ThoughtExtracts/components/ThoughtExtractInsight";
import {ThoughtInput} from "../components/ThoughtInput";
import {ProjectStatusChip} from "../../projects/components/ProjectStatusChip";

export const ProjectDetails = ({ project }) => {

    const { id } = useParams();

    const datastore = useDatastore({
        model: Project,
        itemId: id,
        enableSubscription: true,
    });

    const thoughtsDatastore = useDatastore({
        model: Thought,
        enableSubscription: true,
        predicate: t => t.relatedProjects.project.id.eq(id)
    })

    const tasksDatastore = useDatastore({
        model: Task,
        enableSubscription: true,
        predicate: t => t.projects.project.id.eq(id)
    })

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const handle = async () => {
            const tasks = await datastore?.item?.tasks.toArray() ?? [];
            const res = []
            for (const task of tasks) {
                const taskDetails = await task.task;
                res.push({
                    ...task,
                    task: taskDetails,
                })
            }
            setTasks(res);
        }
        handle();
    }, [datastore?.item, thoughtsDatastore.items, tasksDatastore.items]);


    return (
        <>
          <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                  <ThoughtInput projectId={id}/>
              </Grid>
            <Grid item xs={12} md={12}>
              <Card
                title={'Project'}
                actions={[
                <ProjectStatusChip status={datastore?.item?.status}/>
                ]}
              >
                {datastore?.item?.name}
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card
                title={'Tasks'}
              >
                  <Stack spacing={2}>

                      {
                          tasks?.map((projectTask) => {
                              return (
                                  <div>
                                      <Stack direction={'row'} spacing={2} >
                                          <div>
                                              <ProjectStatusChip status={projectTask.task.status}/>
                                          </div>
                                          <div>
                                              {projectTask.task.name}
                                          </div>
                                      </Stack>
                                  </div>
                              )
                          })
                      }
                  </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              {
                datastore?.item?.name && (
                  <ThoughtExtractInsight type={'projects'} value={datastore?.item?.name} projectId={datastore?.item?.id}/>
                )
              }
            </Grid>
          </Grid>
        </>
    );
}