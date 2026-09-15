/* 
This Document will work to store information that is gonna be used on another document, depending on the action
taken, for example now it will be used on a modal to save the information when a column's name needs to be updated
We will change the name along the time.
*/

import { create } from 'zustand'


const useSelected = create((set) => ({
  columnSelected: {id: null, title: ""},

  setColumnSelected: (columnId, columnName) => {
    if(!columnId) return
    return set({columnSelected: {id: columnId, title: columnName}})
  }
  
}))

export default useSelected;