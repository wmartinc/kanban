const VITE_USER_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT

const resetPasswordRequest = async ({ email }) => {
  const response = await fetch(`${VITE_USER_ENDPOINT}/reset-password`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return { ...data, confirmation: data?.confirmation ?? response.ok };
};

const checkOtpRequest = async (otp) => {
  
  try {
    const response = await fetch(`${VITE_USER_ENDPOINT}/check-otp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const data = await response.json();
    return { ...data, confirmation: data?.confirmation ?? response.ok };
  } catch (error) {
    console.log(error.message)
    return { confirmation: false }
  }
}

const changePasswordRequest = async (password, passwordConfirmation) => {
  try {
    const response = await fetch(`${VITE_USER_ENDPOINT}/change-password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, passwordConfirmation}),
    })

    const data = await response.json();
    return { ...data, confirmation: data?.confirmation ?? response.ok };
  } catch (error) {
    console.log("error: ", error)
    return { confirmation: false }
  }
}

export {
  resetPasswordRequest,
  checkOtpRequest,
  changePasswordRequest 
}