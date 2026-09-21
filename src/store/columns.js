import { create } from "zustand";

export const useColumnsStore = create((set) => ({
  columnSelected: "",
  // This function is gonna help us to store the information about the column we have selected to make changes
  // Like add a column functionality may change (only use for now.)
  saveColumnSelected: (column) => set({columnSelected: column})
}))