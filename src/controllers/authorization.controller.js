const VITE_USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

const requestLogin = async (email, password) => {
  try {
    const respUsers = await fetch(`${VITE_USERS_ENDPOINT}/login`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email, password})
    })

    const userResponse = await respUsers.json()
    return userResponse;
  } catch (error) {
    console.log(error.message)
  }
}

export default requestLogin;