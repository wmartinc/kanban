import { create } from 'zustand';
// Set is used to store the state of the modals  in the application.
// besides that it can be used to change the state of the modals when needed.

export const useModals = create((set) => ({
  //  stablishing the status
  modals: {
    modalContainer: false,
    updated: "",
    addBoard: false,
    showBoards: false,
    addTask: false,
    favorites: false,
    changeTask: false,
    addColumn: false,
    changePassword: false
  },
  // modalContainer explicitly because it is one of the existing properties already.
  updateModalStatus: (status, modalName = "") => set((state) => {
    // Here we will set the last updated modal to the one that is being updated.
    // if it is true that means the modal is being opened.
    if (status && state.modals.updated === "") {
      return {
        modals: {
          ...state.modals, modalContainer: true, updated: modalName, [modalName]: true
        }
      }
    }

    const lastModalUpdated = state.modals.updated;
    return { modals: { ...state.modals, modalContainer: false, [lastModalUpdated]: false, updated: "" } }
  })

}))
