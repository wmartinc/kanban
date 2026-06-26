import { useState } from "react";

const Input = ({ children, nameField, changeEvent, type="text" }) => {
  const [isFieldFocus, setFieldFocus] = useState(false)

  const handleBlur = (ev) => {
    if (ev.target.value !== "".trim()) return setFieldFocus(true)
    setFieldFocus(false)
  }

  const handleFocus = () => {
    setFieldFocus(true)
  }

  const wrapperInputStyles = `
  transition-all duration-300 ease-out w-full flex flex-col relative border 
  flex justify-center ${isFieldFocus ? "border-purple-500/50" : "border-zinc-700"} rounded-lg
  `
  return (
    <div className={wrapperInputStyles}>
      <input name={nameField} type={type} className="text-zinc-100 outline-none p-2.5 text-sm bg-transparent" onFocus={handleFocus} onBlur={handleBlur} onChange={changeEvent} />
      <label className={`ml-2.5 transition-all pointer-events-none text-sm absolute px-1
        ${isFieldFocus ? 'top-0 translate-y-[-50%] text-purple-400/70 bg-surface' : 'top-1/2 translate-y-[-50%] text-zinc-400'}`}>{children}</label>
    </div>
  )
}

export default Input;