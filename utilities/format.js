const checkTitleBoard = (title) => {
  const titleRegex = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N} _\-?!.,:'¿¡]{1,30}$/u;
  if(title.match(titleRegex)) return true
  return false
}

const checkDescriptionBoard = (description) => {
  if(description.length == 0) return true
  const descriptionRegex = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N} _\-?!.,:'¿¡]{1,100}$/u;
  if(description.match(descriptionRegex)) return true
  return false
}

const checkPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|,.?~-])[A-Za-z\d!@#$%^&*()_+=[\]{}|,.?~-]{8,64}$/;
  if(password.match(passwordRegex)) return true
  return false
}

export {
  checkDescriptionBoard, checkTitleBoard, checkPassword
}