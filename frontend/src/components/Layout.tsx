
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "@/atoms/userAtom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
