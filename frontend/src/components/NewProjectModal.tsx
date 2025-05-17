
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectsState } from "@/atoms/projectsAtom";
import { userState } from "@/atoms/userAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import apiClient from "@/lib/api-client";
import { PROJECT_ROUTE } from "@/utils/constant";

export const NewProjectModal = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [projects, setProjects] = useRecoilState(projectsState);
  const user = useRecoilValue(userState);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a project");
      return;
    }
    
    if (projects.length >= 4) {
      toast.error("You have reached the maximum limit of 4 projects");
      return;
    }
    
    setIsLoading(true);
    
    try {

      const newProject = {
        name,
        createdAt: new Date().toISOString()
      };
     
      const resposne = await apiClient.post(PROJECT_ROUTE,newProject,{withCredentials:true});

      if(resposne.status === 201){
        setProjects([...projects, resposne.data]);
      setName("");
      setIsOpen(false);
      toast.success("Project created successfully!");
      }
      
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2"
          disabled={projects.length >= 4}
        >
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Enter the details for your new project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
