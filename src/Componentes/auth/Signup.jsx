import { useNavigate } from "react-router";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate()

  const back = () => {
    return navigate('/', { replace: true })
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
          <Input nameField="email">Enter Email</Input>
          <Input nameField="password" type="password">Enter Password</Input>
          <Input nameField="confirmPassword" type="password">Confirm Password</Input>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="ghost" event={back} className="flex-1">Back</Button>
          <Button variant="secondary" className="flex-1">Create</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;