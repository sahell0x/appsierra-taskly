
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isAuthenticatedState, userState } from "../atoms/userAtom";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "@/lib/api-client";
import { USER_ROUTE } from "@/utils/constant";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    (async()=>{
      try{
        const response = await apiClient.get(USER_ROUTE,{withCredentials:true});
      if(response.status === 200){
        setUser({...response.data});
        setIsAuthenticated(true);
      }
      }catch{
        setIsAuthenticated(false);
      }
    })();
    
  }, [setUser, setIsAuthenticated]);

  useEffect(() => {
    const publicPaths = ['/', '/login', '/signup'];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!isAuthenticated && !isPublicPath) {
      navigate('/login');
    }

    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return <>{children}</>;
};
