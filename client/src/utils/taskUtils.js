export const checkOverdue = (task) => {
    return task.deadline && !task.completed && new Date(task.deadline) < new Date();
};

export const sortTasks = (tasks) => {
    return ([...tasks].sort((x, y) => {
        if (x.completed !== y.completed) return x.completed === true ? 1 : -1;
        return new Date(x.deadline) - new Date(y.deadline);
    }));
};

export const ctgTasks = (tasks) => {    
    return tasks.reduce((acc, task) => {
        task.completed ? (
            task.priority === 'right-now' ? acc.rightNow.push(task) : task.priority === 'complete-later' ? acc.completeLater.push(task) : acc.onConvenience.push(task)
        ) : checkOverdue(task) ? acc.overDue.push(task) : (
            task.priority === 'right-now' ? acc.rightNow.push(task) : task.priority === 'complete-later' ? acc.completeLater.push(task) : acc.onConvenience.push(task)
        );

        return acc;
    }, {rightNow: [], completeLater: [], onConvenience: [], overDue: []});
};