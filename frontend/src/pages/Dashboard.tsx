
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectsState } from "@/atoms/projectsAtom";
import { tasksState } from "@/atoms/tasksAtom";
import { userState } from "@/atoms/userAtom";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectModal } from "@/components/NewProjectModal";
import apiClient from "@/lib/api-client";
import { PROJECT_ROUTE } from "@/utils/constant";

const Dashboard = () => {
  const user = useRecoilValue(userState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [tasks,setTasks] = useRecoilState(tasksState);
  
  useEffect(() => {
    
    (async()=>{
      const response = await apiClient.get(PROJECT_ROUTE,{withCredentials:true});
      if(response.status === 200){
        setProjects([...response?.data?.projects]);
        setTasks([...response?.data?.tasks]);
      }
    })();
  }, [user]);
  
  const getTaskCount = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <NewProjectModal />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project}
                taskCount={getTaskCount(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-muted p-8 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first project to get started.
            </p>
            <NewProjectModal />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Project Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <h3 className="text-muted-foreground text-sm font-medium">Total Projects</h3>
            <p className="text-3xl font-bold">{projects.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {4 - projects.length} slots remaining
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <h3 className="text-muted-foreground text-sm font-medium">Total Tasks</h3>
            <p className="text-3xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border">
            <h3 className="text-muted-foreground text-sm font-medium">Completed Tasks</h3>
            <p className="text-3xl font-bold">
              {tasks.filter(task => task.status === "Completed").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
