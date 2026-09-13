const VITE_API = import.meta.env.VITE_TASKS_ENDPOINT

const createTask = async (task, columnId) => {
  try {
    console.log('entra aca', task, columnId)
    const responseApi = await fetch(`${VITE_API}`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify({task, columnId})
    })

    const dataApi = await responseApi.json();
    if(!dataApi.confirmation) return false
    
    return dataApi.confirmation
  } catch (error) {
    console.log('Error during the process:  ', error.message)
  }
}


const removeTask = async (task, columnId) => {
  
  try {
    const responseApi = await fetch(`${VITE_API}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify({task, columnId})
    })
  
    const dataApi = await responseApi.json()
    if(!dataApi.confirmation) return false
    return dataApi.confirmation
  } catch (error) {
    console.log('Error during the process:  ', error.message)
  }

}

export { createTask, removeTask }