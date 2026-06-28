import { useNavigate } from "react-router";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { validateEmail } from "./verificationAuth";
import { checkPassword } from '../../../utilities/format'
import { UserPlus } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate()
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "", confirmPassword: "" })
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [fillFields, setFillFields] = useState(false)

  const back = () => {
    return navigate("/", { replace: true })
  }

  const updateCredentials = (ev) => {
    if (!isEmailValid) setIsEmailValid(true)
    if (!isPasswordValid) setIsPasswordValid(true)
    if (passwordsMatch === false) setPasswordsMatch(true)
    if (!ev?.target) return

    const fieldName = ev.target.name
    const fieldValue = ev.target.value

    setUserCredentials({
      ...userCredentials,
      [fieldName]: fieldValue
    })
  }

  const submitInformation = () => {
    if (userCredentials.email.trim() === "" || userCredentials.password.trim() === "" || userCredentials.confirmPassword.trim() === "") {
      setFillFields(true)
      return
    }

    const emailValid = validateEmail(userCredentials.email)
    setIsEmailValid(emailValid)
    if (!emailValid) return

    const passwordValid = checkPassword(userCredentials.password)
    setIsPasswordValid(passwordValid)
    if (!passwordValid) return

    const match = userCredentials.password === userCredentials.confirmPassword
    setPasswordsMatch(match)
    if (!match) return
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-base via-surface to-base">
      <div className="w-full max-w-md border border-zinc-800 rounded-2xl shadow-xl shadow-black/30 p-8 bg-elevated">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-teal-500/10 mb-4">
            <UserPlus className="size-6 text-teal-400" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-zinc-100">
            Create an account
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Enter your information to get started</p>
        </div>
        <div className="space-y-5">
          <div>
            <Input nameField="email" changeEvent={updateCredentials}>Enter Email</Input>
            {
              !isEmailValid && <span className="text-rose-400 text-xs mt-1 block">Try a valid email</span>
            }
          </div>
          <div>
            <Input nameField="password" type="password" changeEvent={updateCredentials}>Enter Password</Input>
            {
              !isPasswordValid && <span className="text-rose-400 text-xs mt-1 block">The password must have 8-64 characters, an uppercase, a lowercase, a number and a special character</span>
            }
          </div>
          <div>
            <Input nameField="confirmPassword" type="password" changeEvent={updateCredentials}>Confirm Password</Input>
            {
              !passwordsMatch && <span className="text-rose-400 text-xs mt-1 block">Passwords do not match</span>
            }
          </div>
        </div>
        {
          fillFields && <span className="text-rose-400 text-xs mt-2 block">Fill all the fields before continuing</span>
        }
        <div className="flex gap-3 mt-6">
          <Button variant="ghost" event={back} className="flex-1">Back</Button>
          <Button variant="secondary" event={submitInformation} className="flex-1">Create</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;