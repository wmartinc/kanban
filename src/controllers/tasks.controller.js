const VITE_API = import.meta.env.VITE_TASKS_ENDPOINT


const getTasks = async (columnName) => {
  try {
    const responseApi = await fetch(`${VITE_API}/${columnName}`, {
      method: "GET",
      credentials: "include"  
    })

    const dataApi = await responseApi.json();
    if(!dataApi.confirmation) return false
    
    return dataApi.tasks
  } catch (error) {
    console.log('Error during the process:  ', error.message)
  }
}

export {getTasks}