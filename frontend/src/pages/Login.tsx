
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="container max-w-screen-md mx-auto flex flex-col items-center justify-center min-h-[85vh] p-4">
      <h1 className="text-3xl font-bold mb-8">Login to Taskly</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
