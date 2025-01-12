import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/components/project/ProjectInformationForm";
import { phaseOrder } from "@/data/phaseData";

export function useProjectActions() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = (formData: ProjectFormData) => {
    localStorage.setItem("projectForm", JSON.stringify({
      ...formData,
      date: formData.date ? formData.date.toISOString() : null,
    }));
    toast({
      title: "Success",
      description: "Your progress has been saved successfully.",
      variant: "default",
    });
  };

  const handleSubmitProject = (formData: ProjectFormData) => {
    if (!formData.projectName || !formData.date || !formData.teamMember || !formData.projectOwner || !formData.status) {
      toast({
        title: "Missing Information",
        description: "Please fill in all project information fields",
        variant: "destructive",
      });
      return;
    }

    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProject = {
      id: Date.now().toString(),
      title: formData.projectName,
      teamMember: formData.teamMember,
      projectOwner: formData.projectOwner,
      date: formData.date.toISOString(),
      status: formData.status,
    };
    
    localStorage.setItem("projects", JSON.stringify([...existingProjects, newProject]));
    localStorage.setItem("projectSubmitted", "true");
    clearAllFormData();
    
    toast({
      title: "Success",
      description: "Your project has been successfully submitted and saved!",
      variant: "default",
    });
    navigate("/");
  };

  const handleBypassSubmit = (formData: ProjectFormData) => {
    if (!formData.projectName || !formData.date || !formData.teamMember || !formData.projectOwner || !formData.status) {
      toast({
        title: "Missing Information",
        description: "Please fill in all project information fields",
        variant: "destructive",
      });
      return;
    }

    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProject = {
      id: Date.now().toString(),
      title: formData.projectName,
      teamMember: formData.teamMember,
      projectOwner: formData.projectOwner,
      date: formData.date.toISOString(),
      status: formData.status,
    };
    
    localStorage.setItem("projects", JSON.stringify([...existingProjects, newProject]));
    localStorage.setItem("projectSubmitted", "true");
    clearAllFormData();

    toast({
      title: "Success",
      description: "Your project has been submitted and saved using bypass mode!",
      variant: "default",
    });
    navigate("/");
  };

  const clearAllFormData = () => {
    localStorage.removeItem("projectForm");
    phaseOrder.forEach(phase => {
      localStorage.removeItem(`${phase}-answers`);
    });
  };

  return {
    handleSave,
    handleSubmitProject,
    handleBypassSubmit,
  };
}