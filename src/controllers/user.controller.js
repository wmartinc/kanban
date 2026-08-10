const resetPasswordRequest = async ({ email }) => {
  const response = await fetch("http://localhost:3000/api/user/reset-password", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response.json();
};

const checkOtpRequest = async (otp) => {
  
  try {
    const response = await fetch("http://localhost:3000/api/user/check-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    return response.json();
  } catch (error) {
    console.log(error.message)
  }
}

const changePasswordRequest = async (password, passwordConfirmation) => {
  try {
    const response = await fetch("http://localhost:3000/api/user/change-password", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, passwordConfirmation}),
    })

    return response.json();
  } catch (error) {
    console.log("error: ", error)
  }
}

export {
  resetPasswordRequest,
  checkOtpRequest,
  changePasswordRequest 
}