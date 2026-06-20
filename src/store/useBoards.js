import { create } from 'zustand'

export const useBoards = create((set) => ({
  boards: [],
  setBoards: (newBoards) => set({ boards: newBoards }),
}))