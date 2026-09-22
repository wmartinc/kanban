import { useState } from "react"
import { useNavigate } from "react-router";
import { logOut } from "../../controllers/authorization.controller";
import useUser from "../../store/useUser";
import { useBoards } from "../../store/useBoards";
import { useTasks } from "../../store/tasks";

const useLogOut = () => {
  const setUser = useUser((state) => state.setUser)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Pide cerrar la sesión en el backend y, si lo confirma, devuelve a la pestaña de login
  const closeSession = async () => {
    setLoading(true)
    const respApi = await logOut()
    setLoading(false)

    if (!respApi?.confirmation) return

    setUser(null)
    useBoards.setState({ boards: null, favorites: null, fetched: "" })
    useTasks.setState({ tasks: [], selectedTask: null })
    navigate("/", { replace: true })
  }

  return {
    loading,
    closeSession
  }
}

export default useLogOut;