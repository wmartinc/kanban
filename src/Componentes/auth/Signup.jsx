import { useNavigate } from "react-router";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";

const Signup = () => {
  const navigate = useNavigate()

  const back = () => {
    return navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-500 rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center  text-white">
            Create an account.
          </h1>
          <p className="text-white/50 text-center">Enter your information to be part of it.</p>
        </div>
        <div className="space-y-6">
          <Input>Enter Email</Input>
          <Input type="password">Enter Password</Input>
          <Input type="password">Confirm Password</Input>
        </div>

        <div className="flex space-x-8 mt-6">
          <Button variant="ghost" event={back}>Back</Button>
          <Button variant="secondary">Create</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;