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
    console.log(_tasks)
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
  })

}))