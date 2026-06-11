import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Login
        </h1>
        
        <div className="space-y-6">
          <Input>Enter your username.</Input>
          <Input>Enter your password.</Input>
        </div>

        <div className="flex space-x-8 m-2">
          <Button variant="ghost">Sign up</Button>
          <Button variant="secondary">Log in</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;