
import { useRecoilState } from "recoil";
import { themeState } from "../atoms/themeAtom";
import { isAuthenticatedState, userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut } from "lucide-react";
import apiClient from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/utils/constant";

export const Header = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async() => {
    try{
      const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});
      if(response.status === 200){
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
      }
    }catch{
      
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <span className="font-bold text-xl">Taskly</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout} 
              className="rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
          
          {isAuthenticated && user && (
            <div className="ml-2 flex items-center gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
