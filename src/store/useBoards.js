import { create } from 'zustand'

export const useBoards = create((set) => ({
  boards: [],
  boardSelected: null,
  setBoards: (newBoards) => set({ boards: newBoards }),
  setBoardSelected: (boardId) => set({ boardSelected: boardId }),
}))