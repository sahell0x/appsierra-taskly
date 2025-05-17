
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "@/atoms/userAtom";

const Home = () => {
  const authenticated = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();
  useEffect(()=>{
    if(authenticated){
      navigate("/dashboard");
    }
  });
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Manage Your Tasks Efficiently
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A powerful task tracker to help you manage your projects and stay organized.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
        <div className="pt-12">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Project Management</h3>
              <p className="text-muted-foreground">Create and manage up to 4 projects with ease.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Task Tracking</h3>
              <p className="text-muted-foreground">Keep track of all your tasks with status updates.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Progress Monitoring</h3>
              <p className="text-muted-foreground">Monitor your progress and stay on top of deadlines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
