
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Project } from "@/atoms/projectsAtom";

interface ProjectCardProps {
  project: Project;
  taskCount: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, taskCount }) => {
  const navigate = useNavigate();
  
  const handleViewProject = () => {
    navigate(`/projects/${project.id}`);
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <Badge variant="outline">{taskCount} tasks</Badge>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <CardDescription>
          Created {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Button onClick={handleViewProject} className="w-full">View Project</Button>
      </CardFooter>
    </Card>
  );
};
