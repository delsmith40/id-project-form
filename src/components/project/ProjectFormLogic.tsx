import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { phaseOrder } from "@/data/phaseData";
import { ProjectFormData } from "./ProjectInformationForm";

export function useProjectFormLogic() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    date: undefined,
    teamMember: "",
    projectOwner: "",
    status: "proposed",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("projectForm");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        ...parsed,
        date: parsed.date ? new Date(parsed.date) : undefined,
      });
    }
  }, []);

  const loadProjectData = (projectId: string) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const project = projects.find((p: any) => p.id === projectId);
    
    if (project) {
      setFormData({
        projectName: project.title || "",
        date: project.date ? new Date(project.date) : undefined,
        teamMember: project.teamMember || "",
        projectOwner: project.projectOwner || "",
        status: project.status || "proposed",
      });

      // Load phase answers if they exist
      phaseOrder.forEach(phase => {
        const savedAnswers = localStorage.getItem(`${projectId}-${phase}-answers`);
        if (savedAnswers) {
          localStorage.setItem(`${phase}-answers`, savedAnswers);
        }
      });
    }
  };

  const handleSave = () => {
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

  const calculatePhaseProgress = (phaseId: string) => {
    const answers = localStorage.getItem(`${phaseId}-answers`);
    if (!answers) return 0;
    const parsedAnswers = JSON.parse(answers);
    const totalQuestions = Object.keys(parsedAnswers).length;
    const answeredQuestions = Object.values(parsedAnswers).filter(
      (answer) => answer && String(answer).trim() !== ""
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100) || 0;
  };

  const clearAllFormData = () => {
    localStorage.removeItem("projectForm");
    phaseOrder.forEach(phase => {
      localStorage.removeItem(`${phase}-answers`);
    });
    setFormData({
      projectName: "",
      date: undefined,
      teamMember: "",
      projectOwner: "",
      status: "proposed",
    });
  };

  const handleSubmitProject = () => {
    const incompletePhases = phaseOrder.filter(
      (phase) => calculatePhaseProgress(phase) < 100
    );

    if (incompletePhases.length > 0) {
      toast({
        title: "Incomplete Project",
        description: `Please complete all questions in the following phases: ${incompletePhases.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

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

  const handleBypassSubmit = () => {
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

  return {
    formData,
    setFormData,
    handleSave,
    handleSubmitProject,
    handleBypassSubmit,
    loadProjectData,
  };
}