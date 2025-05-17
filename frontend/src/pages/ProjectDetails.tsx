import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { projectsState, selectedProjectIdState } from "@/atoms/projectsAtom";
import { tasksState, filteredTasksState, Task } from "@/atoms/tasksAtom";
import { TaskCard } from "@/components/TaskCard";
import { NewTaskModal } from "@/components/NewTaskModal";
import { EditTaskModal } from "@/components/EditTaskModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/lib/api-client";
import { PROJECT_ROUTE } from "@/utils/constant";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [projects, setProjects] = useRecoilState(projectsState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const filteredTasks = useRecoilValue(filteredTasksState);
  const setSelectedProjectId = useSetRecoilState(selectedProjectIdState);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }

    return () => {
      setSelectedProjectId(null);
    };
  }, [projectId, setSelectedProjectId]);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => navigate("/projects")}>
            Go back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const handleDeleteProject = async () => {
    try {
      const response = await apiClient.delete(
        `${PROJECT_ROUTE}?projectId=${projectId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedProjects = projects.filter((p) => p.id !== projectId);
        const updatedTasks = tasks.filter((t) => t.projectId !== projectId);

        setProjects(updatedProjects);
        setTasks(updatedTasks);

        toast.success("Project deleted successfully");
        navigate("/projects");
      }
    } catch (error) {
      toast.error("Failed to delete project");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditDialogOpen(true);
  };

  const filteredTasksByStatus =
    statusFilter === "all"
      ? filteredTasks
      : filteredTasks.filter((task) => task.status === statusFilter);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 -ml-3"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <NewTaskModal />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <div className="w-full sm:w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredTasksByStatus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasksByStatus.map((task) => (
            <div key={task.id} className="relative group">
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleEditTask(task)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted p-8 rounded-lg text-center">
          <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first task to get started with this project.
          </p>
          <NewTaskModal />
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? All tasks associated
              with this project will also be deleted. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditTaskModal
        task={taskToEdit}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
};

export default ProjectDetails;
