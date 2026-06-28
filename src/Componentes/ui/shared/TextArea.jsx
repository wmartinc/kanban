import { useState } from "react"

const TextArea = ({ fieldName, changeEvent, size = "", optional=true }) => {

  const [isFieldFocus, setFieldFocus] = useState(false)

  const handleBlur = (ev) => {
    if (ev.target.value !== "".trim()) return setFieldFocus(true)
    setFieldFocus(false)
  }

  const handleFocus = () => {
    setFieldFocus(true)
  }
  return (
    <div className={`relative ${size}`}>
      <label htmlFor="" className={`ml-2.5 absolute transition-transform text-sm px-1 ${isFieldFocus ? 'translate-y-[-50%] text-purple-400/70 bg-surface' : ' text-zinc-500'} `}>Description {optional ? " (Optional)": ""}</label>
      <textarea name={fieldName} onChange={changeEvent} className={`w-full h-20 text-sm border transition-colors duration-300 ${isFieldFocus ? 'border-purple-500/50' : 'border-zinc-700'} focus:border-purple-500/50 rounded-lg p-2.5
       text-zinc-100 outline-none resize-none bg-transparent`} onFocus={handleFocus} onBlur={handleBlur}></textarea>
    </div>
  )
}

export default TextArea;