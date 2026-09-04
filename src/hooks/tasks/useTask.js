import { useState } from "react";
import { createTask } from "../../controllers/tasks.controller";

const useTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const sendCreateTask = async (task, columnId) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const data = await createTask(task, columnId);
      setResponse(data);
      return data;
    } catch (error) {
      setResponse({ error: error.message });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    response,
    sendCreateTask
  };
};

export default useTask;
