import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { phaseOrder } from "@/data/phaseData";

interface ProjectSubmissionButtonsProps {
  onSave: () => void;
  onSubmit: () => void;
  onBypassSubmit: () => void;
}

export function ProjectSubmissionButtons({
  onSave,
  onSubmit,
  onBypassSubmit,
}: ProjectSubmissionButtonsProps) {
  const { toast } = useToast();

  const calculateProjectProgress = () => {
    let totalProgress = 0;
    phaseOrder.forEach(phase => {
      const answers = localStorage.getItem(`${phase}-answers`);
      if (answers) {
        const parsedAnswers = JSON.parse(answers);
        const answeredQuestions = Object.values(parsedAnswers).filter(
          answer => answer && String(answer).trim() !== ""
        ).length;
        const progress = answeredQuestions > 0 ? (answeredQuestions / Object.keys(parsedAnswers).length) * 100 : 0;
        totalProgress += progress;
      }
    });
    return Math.round(totalProgress / phaseOrder.length);
  };

  const handleSave = () => {
    const projectForm = localStorage.getItem("projectForm");
    if (projectForm) {
      const formData = JSON.parse(projectForm);
      const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const progress = calculateProjectProgress();
      
      const projectIndex = existingProjects.findIndex((p: any) => p.title === formData.projectName);
      const updatedProject = {
        id: projectIndex >= 0 ? existingProjects[projectIndex].id : Date.now().toString(),
        title: formData.projectName,
        teamMember: formData.teamMember,
        projectOwner: formData.projectOwner,
        date: formData.date,
        status: formData.status,
        progress: `${progress}%`
      };

      if (projectIndex >= 0) {
        existingProjects[projectIndex] = updatedProject;
      } else {
        existingProjects.push(updatedProject);
      }

      localStorage.setItem("projects", JSON.stringify(existingProjects));
    }
    
    onSave();
    toast({
      title: "Progress Saved",
      description: "Your project progress has been saved successfully.",
    });
  };

  const handleSubmit = () => {
    handleSave();
    onSubmit();
  };

  const handleBypass = () => {
    handleSave();
    onBypassSubmit();
  };

  return (
    <div className="flex gap-4 mt-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Save Progress</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save your progress?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            Submit Project
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this project? This action will mark the project as complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
          >
            Bypass Submit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bypass Submit</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to bypass the normal submission process? This will submit the project without validation checks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBypass}>Bypass</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}