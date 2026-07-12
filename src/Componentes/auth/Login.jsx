import { Navigate, useNavigate } from "react-router";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { validateEmail } from "./verificationAuth";
import { checkPassword } from "../../../utilities/format";
import { useState } from "react";
import { useEffect } from "react";
import useAuthorization from "../../hooks/auth/useAuthorization";
import useUser from "../../store/useUser";
import useCheckSession from '../../hooks/auth/useCheckSesion'
import Spinner from '../ui/shared/Spinner'
import { LayoutDashboard } from "lucide-react";
import { memo } from "react";

const Login = () => {
  const { loading: loadingSession, response: responseSession } = useCheckSession()
  const setGlobalUser = useUser(state => state.setUser)
  const navigate = useNavigate()
  const [showAdvise, setShowAdvise] = useState(false)
  const { loading, response, requestSession } = useAuthorization();
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [fillFields, setFillFields] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const signup = () => {
    return navigate('/signup', { replace: true })
  }

  useEffect(() => {
    if (!loading && response?.confirmation) {
      setGlobalUser(response.newUser)
      console.log('entra aca', response)
      navigate('/home', { replace: true })
    } else if (!loading && !response?.confirmation && response) {
      setShowAdvise(true)
    }
  }, [loading, response])

  const updateCredentials = (ev) => {
    if (!isEmailValid) setIsEmailValid(true)
    if (!isPasswordValid) setIsPasswordValid(true)
    if (!ev?.target) return

    const fieldName = ev.target.name
    const fieldValue = ev.target.value

    setUserCredentials({
      ...userCredentials,
      [fieldName]: fieldValue
    })
  }


  const submitInformation = () => {
    if (userCredentials.email.trim() === "" || userCredentials.password.trim() === "") {
      setFillFields(true)
    }
    const isEmailValid = validateEmail(userCredentials.email)
    setIsEmailValid(isEmailValid)
    if (!isEmailValid) return;

    const validPassword = checkPassword(userCredentials.password)
    setIsPasswordValid(validPassword)
    if (!validPassword) return

    requestSession(userCredentials.email, userCredentials.password)
  }


  const Advise = memo(() => {
    return <div className="flex flex-col text-fuchsia-300 relative -translate-y-5 animation">
      <span>Something went wrong!</span>
      <span>Try again</span>
    </div>
  })


  return (
    (loadingSession && !responseSession) ? <Spinner /> :
      (responseSession) ? <Navigate to={"/home"} /> :
        <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-base via-surface to-base">
          <div className="w-full max-w-md border border-zinc-800 rounded-2xl shadow-xl shadow-black/30 p-8 bg-elevated">
            <div className="mb-8 text-center">
              {
                (showAdvise) && <Advise />
              }
              <div className="inline-flex items-center justify-center size-12 rounded-xl bg-purple-500/10 mb-4">
                <LayoutDashboard className="size-6 text-purple-400" />
              </div>
              <h1 className="text-2xl font-display font-semibold text-zinc-100">
                Welcome back
              </h1>
              <p className="text-zinc-500 text-sm mt-1">Enter your credentials to see your tasks</p>
            </div>

            <div className="space-y-5">
              <div>
                <Input nameField={"email"} changeEvent={updateCredentials}>Enter Email Address</Input>
                {
                  !isEmailValid && <span className="text-rose-400 text-xs mt-1 block">Try a valid email</span>
                }
              </div>

              <div>
                <Input nameField={"password"} changeEvent={updateCredentials} type="password">Enter your password</Input>
                {
                  !isPasswordValid && <span className="text-rose-400 text-xs mt-1 block">The password must have 8-64 characters, an uppercase, a lowercase, a number and a special character</span>
                }
              </div>
            </div>
            {
              fillFields && <span className="text-rose-400 text-xs mt-2 block">Fill all the fields before continuing</span>
            }
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" event={signup} className="flex-1">Sign up</Button>
              <Button variant="primary" event={submitInformation} className="flex-1">Log in</Button>
            </div>
            <div className="mt-4 text-center">
              <button className="text-zinc-500 hover:text-zinc-400 text-sm transition-colors">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
  )
};

export default Login;