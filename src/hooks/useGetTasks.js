import { useState } from "react"
import { getTasks } from "../controllers/tasks.controller";

const useGetTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchTasks = async(columnName) => {
    setLoading(true);
    setResponse(null);
    try {
      const respApi = await getTasks(columnName);
      setLoading(false)
      console.log("Informacion desde el endpoint de getTasks", respApi)
      setResponse(respApi);
    } catch (error) {
      setError(error.message);
      console.log('Error getting tasks:', error.message); 
    }
  } 

  return {
    loading,
    response,
    fetchTasks 
  }
}

export default useGetTasks;