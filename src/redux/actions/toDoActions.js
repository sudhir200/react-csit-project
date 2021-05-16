function addTask(task) {

    return {

        type: 'ADD_TODO',
        task: task
    }
}
function removeTask(task) {

    return {
        type: 'REMOVE_TODO',
        task: task
    }
}