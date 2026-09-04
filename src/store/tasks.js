import { create } from 'zustand'

export const useTasks = create((set) => ({
  tasks: [],
  setTasks: (newTasks) => set({ tasks: newTasks})
}))