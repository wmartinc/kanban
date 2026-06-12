import { useNavigate } from "react-router";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { validateEmail } from "./verificationAuth";
import { useState } from "react";
import { useEffect } from "react";
import useAuthorization from "../../hooks/auth/useAuthorization";

const Login = () => {
  const navigate = useNavigate()
  const {loading, response, sendRequest} = useAuthorization();
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [fillFields, setFillFields] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const signup = () => {
    return navigate('/signup', { replace: true })
  }

  useEffect(() => {
    if(loading && !response) {
      console.log('cargando...')
      return
    } else if (!loading && response ) {
      console.log('hola mundo')
    }
  }, [loading, response])

  const updateCredentials = (ev) => {
    if(!isEmailValid) setIsEmailValid(true)
    if (!ev?.target) return

    const fieldName = ev.target.name
    const fieldValue = ev.target.value

    setUserCredentials({
      ...userCredentials,
      [fieldName]: fieldValue
    })
  }

  if(!loading && response) {
    navigate('/home', {replace:true})                 
  }

  const submitInformation = () => {
    if(userCredentials.email.trim() === "" || userCredentials.password.trim() === "") {
      setFillFields(true)
    }
    // verificamos si el email es correcto...
    const isEmailValid = validateEmail(userCredentials.email)
    setIsEmailValid(isEmailValid)
    if(!isEmailValid) return;

    // we will request information only if the email is correct.
    sendRequest(userCredentials.email, userCredentials.password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-500 rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-white">
            Welcome back!
          </h1>
          <p className="text-white/50 text-center">Enter your credentials to see your tasks</p>
        </div>

        <div className="space-y-6">
          <div>
            <Input nameField={"email"} changeEvent={updateCredentials}>Enter Email Address</Input>
            {
              !isEmailValid && <span className="text-[#ff0346] ">Try a valid email.</span>
            }
          </div>

          <div>
            <Input nameField={"password"} changeEvent={updateCredentials} type="password">Enter your password.</Input>
          </div>
        </div>
        {
          fillFields && <span className="text-[#ff0346]">Fill all the fields before continue</span>
        }
        <div className="flex space-x-8 m-2">
          <Button variant="ghost" event={signup}>Sign up</Button>
          <Button variant="secondary" event={submitInformation}>Log in</Button>
        </div>
        <div className="text-white/50 hover:text-white/80 text-center">
          <a href="">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;