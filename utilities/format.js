const checkTitleBoard = (title) => {
  const titleRegex = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N} _\-?!.,:'¿¡]{1,30}$/u;
  if(title.match(titleRegex)) return true
  return false
}

const checkDescriptionBoard = (descripcion) => {
  if(descripcion.length == 0) return true
  const descriptionRegex = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N} _\-?!.,:'¿¡]{1,100}$/u;
  if(descripcion.match(descriptionRegex)) return true
  return false
}

const checkGeneralText = (text) => {
}

export {
  checkDescriptionBoard, checkGeneralText, checkTitleBoard
}