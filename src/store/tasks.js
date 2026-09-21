// We will need to cha  nge the task name for columns, because columns contains tasks.

import { create } from 'zustand'

export const useTasks = create((set) => ({
  tasks: [],
  selectedTask: null,
  
  setTasks: (newTasks) => set({ tasks: newTasks}),
  
  setSelectedTask: (task) => set({ selectedTask: task }),
  
  addTask: (column, newTask) => set(state => {
    const _tasks = {...state.tasks};
    Object.values(_tasks).forEach(({columnId, tasks:__tasks}) => {
      if(columnId === column) {
        __tasks.push(newTask)
      }
    })
    return { tasks: _tasks}
  }),

  removeTask: (column, taskId) => set(state => {
    const _tasks = {...state.tasks}
    Object.values(_tasks).forEach(({columnId, tasks: __tasks}) => {
      if(columnId === column) {
        const index = __tasks.findIndex(task => task.id === taskId)
        if(index !== -1) __tasks.splice(index, 1)
      }
    })
    return { tasks: _tasks }
  }),

  removeColumn: (id) => set(state => {
    const _tasks = {...state.tasks}
    delete _tasks[id]
    Object.keys(_tasks).forEach(key => {
      if (_tasks[key].columnId === id) delete _tasks[key]
    })

    return { tasks: _tasks }
  }),

  
  // This must be migrated to the columns file.
  addColumn: (column) => {
    const columnBase = {[column.id]: {title: column.title, tasks: [], columnId: column.id}}
    return set((state) => ({tasks: {...state.tasks, ...columnBase}}))
  }
}))