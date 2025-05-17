import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState } from "recoil";
import { tasksState, Task } from "@/atoms/tasksAtom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Edit } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { TASKS_ROUTE, TASKS_STATUS_UPDATE_ROUTE } from "@/utils/constant";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tasks, setTasks] = useRecoilState(tasksState);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-status-pending text-white";
      case "In Progress":
        return "bg-status-inprogress text-white";
      case "Completed":
        return "bg-status-completed text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await apiClient.delete(
        `${TASKS_ROUTE}?taskId=${task.id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        setTasks(updatedTasks);
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleStatusChange = async (
    newStatus: "Pending" | "In Progress" | "Completed"
  ) => {
    try {
      const updatedStatus = {
        taskId:task.id,
        status: newStatus,
        completedAt: newStatus === "Completed" ? new Date().toISOString() : "",
      };

      const response = await apiClient.patch(
        TASKS_STATUS_UPDATE_ROUTE,
        updatedStatus,
        { withCredentials: true }
      );

      if(response.status === 200){

      const updatedTasks = tasks.map((t) => {
        if (t.id === task.id) {
          const completedAt =
            newStatus === "Completed" && t.status !== "Completed"
              ? new Date().toISOString()
              : newStatus !== "Completed" && t.status === "Completed"
              ? null
              : t.completedAt;

          return { ...t, status: newStatus, completedAt };
        }
        return t;
      });

      setTasks(updatedTasks);
      toast.success(`Task marked as ${newStatus}`);
      }

    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <CardDescription className="mt-1">
            Created{" "}
            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </CardDescription>
        </div>
        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground">{task.description}</p>

        {task.completedAt && (
          <p className="text-xs text-muted-foreground mt-2">
            Completed{" "}
            {formatDistanceToNow(new Date(task.completedAt), {
              addSuffix: true,
            })}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 pt-2">
        <div className="flex w-full space-x-2">
          <Button
            size="sm"
            variant={task.status === "Pending" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handleStatusChange("Pending")}
          >
            Pending
          </Button>
          <Button
            size="sm"
            variant={task.status === "In Progress" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handleStatusChange("In Progress")}
          >
            In Progress
          </Button>
          <Button
            size="sm"
            variant={task.status === "Completed" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handleStatusChange("Completed")}
          >
            Completed
          </Button>
        </div>
        <div className="flex w-full space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </CardFooter>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be
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
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
