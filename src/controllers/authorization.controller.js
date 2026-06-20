const VITE_USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

const createSesion = async (email, password) => {
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
    return false
  }
}

const isClientValidated = async() => {
  try {
    const respUser = await fetch(`${VITE_USERS_ENDPOINT}/login`, {credentials: "include"});
    const respSesion = await respUser.json()

    if(!respSesion) return false
    return respSesion
  } catch (error) {
    console.log('ocurrio un error: ', error.message)
  }
}

export {
  createSesion, 
  isClientValidated
}