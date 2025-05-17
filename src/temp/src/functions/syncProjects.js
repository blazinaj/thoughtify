

export const syncProjects = async ({thought, extract, projectId}) => {
    // try {
    //     // handle projects
    //     const projects = extract?.projects;
    //     if (projects) {
    //         const res = await handleThought({
    //             thought,
    //             projects,
    //             projectId
    //         });
    //         for (const output of res) {
    //             const { arguments: args, type, name } = output;
    //             if (type !== 'function_call') {
    //                 // eslint-disable-next-line no-continue
    //                 continue;
    //             }
    //             let functionArguments = args;
    //             if (typeof functionArguments === 'string') {
    //                 functionArguments = JSON.parse(functionArguments);
    //             }
    //             let projectId;
    //
    //             if (name === 'create_project') {
    //                 const project = await DataStore.save(
    //                     new Project({
    //                         name: functionArguments.name,
    //                         status: functionArguments.status
    //                     })
    //                 );
    //                 projectId = project.id;
    //             }
    //
    //             // create new project thought
    //             await DataStore.save(
    //                 new ProjectThoughts({
    //                     projectId: functionArguments?.projectId || projectId,
    //                     thoughtId: newThought.id
    //                 })
    //             );
    //
    //             if (name === 'create_task') {
    //                 const task = await DataStore.save(
    //                     new Task({
    //                         name: functionArguments.name,
    //                         status: functionArguments.status
    //                     })
    //                 );
    //                 // create new project task
    //                 await DataStore.save(
    //                     new ProjectTasks({
    //                         projectId: functionArguments.projectId || projectId,
    //                         taskId: task.id
    //                     })
    //                 );
    //             }
    //
    //             if (name === 'update_task') {
    //                 const task = await DataStore.query(Task, functionArguments.taskId);
    //                 // if (task.length > 0) {
    //                 await DataStore.save(
    //                     Task.copyOf(task, (updated) => {
    //                         updated.name = functionArguments.name;
    //                         updated.status = functionArguments.status;
    //                     })
    //                 );
    //
    //                 // }
    //             }
    //
    //             if (name === 'update_project') {
    //                 const project = await DataStore.query(Project, functionArguments.projectId);
    //                 if (project.length > 0) {
    //                     await DataStore.save(
    //                         Project.copyOf(project[0], (updated) => {
    //                             updated.name = functionArguments.name;
    //                             updated.status = functionArguments.status;
    //                         })
    //                     );
    //                 }
    //             }
    //         }
    //     }
    // } catch (e) {
    //     console.error('Error with handling project sync', e);
    // }
}