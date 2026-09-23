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
    return { ...userResponse, confirmation: userResponse?.confirmation ?? respUsers.ok };
  } catch (error) {
    console.log(error.message)
    return false
  }
}

const createUser = async (userName, email, password, passwordConfirmation, otp) => {
  try {
    const respUsers = await fetch(`${VITE_USERS_ENDPOINT}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({userName, email, password, passwordConfirmation, otp})
    })

    const userResponse = await respUsers.json()
    return { ...userResponse, confirmation: userResponse?.confirmation ?? respUsers.ok };
  } catch (error) {
    console.log('Error creating user:', error.message)
    return false
  }
}

const signupCheck = async (email) => {
  try {
    const respUsers = await fetch(`${VITE_USERS_ENDPOINT}/signup-check`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email })
    })

    const userResponse = await respUsers.json()
    return { ...userResponse, confirmation: userResponse?.confirmation ?? respUsers.ok };
  } catch (error) {
    console.log('Error validating email:', error.message)
    return false
  }
}

const isClientValidated = async() => {
  try {
    const respUser = await fetch(`${VITE_USERS_ENDPOINT}/login`, {credentials: "include"});
    const respSesion = await respUser.json()

    if(!respSesion) return false
    return { ...respSesion, confirmation: respSesion?.confirmation ?? respUser.ok }
  } catch (error) {
    console.log('ocurrio un error: ', error.message)
    return { confirmation: false }
  }
}

const logOut = async () => {
  try {
    const respUsers = await fetch(`${VITE_USERS_ENDPOINT}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type":"application/json"}
    })

    const userResponse = await respUsers.json()
    return { ...userResponse, confirmation: userResponse?.confirmation ?? respUsers.ok };
  } catch (error) {
    console.log('Error closing session:', error.message)
    return { confirmation: false }
  }
}

export {
  createSesion,
  createUser,
  signupCheck,
  isClientValidated,
  logOut
}