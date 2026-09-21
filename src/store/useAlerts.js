import { create } from 'zustand'


/**
 * @argument {object} state - returns setAlert function
 * @function setAlert - takes one argument to set an alert it may be either error or success
 * 
 */
const useAlerts = create((set) => ({
  // this state will help us to show the alerts or outcomes about loadings...
  alertType: "",

  setAlert: (type="") => set({alertType: type})

}))

export default useAlerts;