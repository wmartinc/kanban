import { useState } from "react";

const Input = ({ children, nameField }) => {
  const [isFieldFocus, setFieldFocus] = useState(false)

  const handleBlur = (ev) => {
    if (ev.target.value !== "".trim()) return setFieldFocus(true)
    setFieldFocus(false)
  }

  const handleFocus = () => {
    setFieldFocus(true)
  }

  const wrapperInputStyles = `
  transition-[border] duration-500 ease-out w-full flex flex-col relative border 
  flex justify-center ${isFieldFocus ? "border-white" : "border-white/25"} rounded-md
  `
  return (
    <div className={wrapperInputStyles}>
      <input name={nameField} className="text-gray-200 outline-0 p-2 md:text-[14px]" onFocus={handleFocus} onBlur={handleBlur} />
      <label className={`ml-2 transition-[top] pointer-events-none bg-neutral-950 text-sm md:text-[14px] absolute 
        ${isFieldFocus ? 'top-0 translate-y-[-50%] text-gray-400' : 'top-1/2 translate-y-[-50%] text-gray-100'}`}>{children}</label>
    </div>
  )
}

export default Input;