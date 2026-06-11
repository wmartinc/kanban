import { create } from 'zustand'

const useTasks = create((set) => ({
  tasks: []
}))