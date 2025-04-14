import Page from '../../utils/components/Page';
import {Box, Card, CardActionArea, Container, Grid, LinearProgress, Stack, Typography} from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import {useDatastore} from "../../utils/hooks/useDatastore";
import {Project} from "../../models";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ProjectStatusChip} from "../projects/components/ProjectStatusChip";
import {ThoughtInput} from "./components/ThoughtInput";
import {getIcon} from "../../utils/functions/getIcon";

/**
 * Displays the details of a particular Place.
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectsPage = () => {
    const { themeStretch } = useSettings();

    const datastore = useDatastore({
        model: Project,
        enableSubscription: true,
    });

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const handle = async () => {
            const res = []
            for (const project of datastore.items) {
                const taskConns = await project.tasks.toArray();
                const tasks = []
                for (const taskConn of taskConns) {
                    const task = await taskConn.task;
                    tasks.push({
                        ...task,
                        task,
                    })
                }

                res.push({
                    ...project,
                    tasks,
                })
            }
            setProjects(res);
        }
        handle();
    }, [datastore?.items])

    return (
        <Page title="Thoughtify">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading='Projects'
                icon={'ic:round-workspaces'}
                    subHeading={'View your Projects and manage your Tasks'}
                />
                <Stack spacing={2}>
                        <ThoughtInput/>
                {
                    // list of projects with name, status, and task progress
                    projects?.map((project) => {
                        const tasks = project.tasks;
                        const completedTasks = tasks.filter((projectTask) => projectTask.task.status === 'COMPLETED');
                        const inProgressTasks = tasks.filter((projectTask) => projectTask.task.status === 'IN_PROGRESS');
                        const value = (completedTasks.length / tasks.length) * 100;
                        return (
                            <Card>
                                <CardActionArea
                                    component={Link}
                                    to={`/projects/${project.id}`}
                                    sx={{p: 1, pr: 2, pl: 2}}
                                >
                                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                                        {project.name}
                                        <ProjectStatusChip status={project.status}/>
                                    </Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: '1em' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress variant="determinate" value={value} />
                                        </Box>
                                        <Box sx={{ minWidth: 35 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.secondary' }}
                                            >{`${Math.round(value)}%`}</Typography>
                                        </Box>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }
                </Stack>
            </Container>
        </Page>
    );
};

export default ProjectsPage;
