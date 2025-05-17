
import { useRecoilValue, useSetRecoilState } from "recoil";
import { projectsState, selectedProjectIdState } from "@/atoms/projectsAtom";
import { tasksState } from "@/atoms/tasksAtom";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectModal } from "@/components/NewProjectModal";

const Projects = () => {
  const projects = useRecoilValue(projectsState);
  const tasks = useRecoilValue(tasksState);
  
  const getTaskCount = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and tasks
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <NewProjectModal />
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  );
};

export default Projects;
