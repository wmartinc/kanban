import { useEffect } from "react"
import { useRef } from "react"

const OtpEntry = ({ saveOtp }) => {1
  const otpReference = useRef(null)
  const inputClass = "text-center text-white w-1/4 h-10 border border-gray-300/25 rounded-md focus:outline-none focus:ring-1 focus:ring-white-500"

  useEffect(() => {
    otpReference.current.focus()
  }, [otpReference])

  const blurAction = () => {
    otpReference.current.focus()
  }

  const enterCode = (event) => {
    const {target} = event

    if (target.value?.length <= 1 && !isNaN(target.value)) { 
      saveOtp(target)
      const nextInput = target.nextElementSibling;
      nextInput?.focus();
      return
    }
    
    target.value = ""
  }


  return (
    <div className="flex flex-col text-white/70 gap-4 text-center">
      <label>We have sent an OTP to your email</label>
      <div className="w-full flex-center gap-4">
        <input onFocus={(e) =>e.target.select()}  onChange={enterCode} ref={otpReference} name="otp1" className={inputClass} maxLength="1"></input>
        <input onFocus={(e) =>e.target.select()}  onChange={enterCode} name="otp2" className={inputClass} maxLength="1"></input>
        <input onFocus={(e) =>e.target.select()}  onChange={enterCode} name="otp3" className={inputClass} maxLength="1"></input>
        <input onFocus={(e) =>e.target.select()}  onChange={enterCode} name="otp4" className={inputClass} maxLength="1"></input>
        <input onFocus={(e) =>e.target.select()}  onChange={enterCode} name="otp5" className={inputClass} maxLength="1"></input>
        <input onFocus={(e) =>e.target.select()}  onChange={enterCode} onBlur={blurAction} name="otp6" className={inputClass} maxLength="1"></input>
      </div>
    </div>
  )
}

export default OtpEntry;