
import { SignupForm } from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className="container max-w-screen-md mx-auto flex flex-col items-center justify-center min-h-[85vh] p-4">
      <h1 className="text-3xl font-bold mb-8">Create a Taskly Account</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
