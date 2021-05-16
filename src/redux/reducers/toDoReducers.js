function task(tasks = [], action) {

    if (action.type === 'ADD_TODO') {
        return [...tasks, action.task];
    } else if (action.type === 'REMOVE_TODO') {
        return tasks.filter(task => task !== action.task);
    }
    return tasks;
}