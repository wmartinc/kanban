import { useState } from "react"

const TextArea = () => {

  const [isFieldFocus, setFieldFocus] = useState(false)

  const handleBlur = (ev) => {
    if (ev.target.value !== "".trim()) return setFieldFocus(true)
    setFieldFocus(false)
  }

  const handleFocus = () => {
    setFieldFocus(true)
  }
  return (
    <div className="relative">
      <label htmlFor="" className={`ml-2 absolute transition text-sm ${isFieldFocus ? 'top-0 translate-y-[-50%] bg-neutral-950 text-gray-400' : ' text-gray-100'} `}>Description</label>
      <textarea name="description" className={`w-full h-20 text-sm border border-white/25 focus:border-white  rounded-md p-2
       text-gray-300 outline-0 resize-none`} onFocus={handleFocus} onBlur={handleBlur}></textarea>
    </div>
  )
}

export default TextArea;