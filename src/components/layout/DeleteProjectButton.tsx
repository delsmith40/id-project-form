import { phaseOrder } from "@/data/phaseData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteProjectButton() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDeleteProject = () => {
    // Clear all phase-related data from localStorage
    phaseOrder.forEach((phase) => {
      localStorage.removeItem(`${phase}-answers`);
    });
    // Clear project info
    localStorage.removeItem("projectForm");
    
    toast({
      title: "Project Deleted",
      description: "All project data has been removed successfully.",
    });
    
    // Navigate to home page
    navigate("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project data and remove all saved progress.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProject}>
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}