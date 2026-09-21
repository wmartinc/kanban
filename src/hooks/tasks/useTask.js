import { useState } from "react";
import { createTask, removeTask } from "../../controllers/tasks.controller";

const useTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const sendCreateTask = async (task, columnId) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const data = await createTask(task, columnId);
      setResponse(data.confirmation);
      return data.data
    } catch (error) {
      setResponse(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendRemoveTask = async (taskId, columnId) => {
    setIsLoading(true);
    setResponse(null)

    try {
      const data = await removeTask(taskId, columnId);
      setResponse(data);
      return data;
    } catch (error) {
      setResponse(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    response,
    sendCreateTask,
    sendRemoveTask,
  };
};

export default useTask;
