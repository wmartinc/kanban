import { create } from 'zustand'

export const useBoards = create((set) => ({
  fetched: "",
  status: {
    loading: true
  },
  boards: null,
  favorites: null,
  setBoards: (newBoards, boardsType = "") => {
    if (boardsType === "favorites") {
      return set({ favorites: newBoards, fetched: boardsType })
    }
    return set({ boards: newBoards, fetched: "" })
  },
  setLoading: (loadingStatus) => set({
    status: { loading: loadingStatus }
  })
}))