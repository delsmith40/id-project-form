import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PhaseQuestions } from "./PhaseQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { phaseOrder } from "@/data/phaseData";
import { ProjectInformationForm, ProjectFormData } from "./project/ProjectInformationForm";
import { ProjectSubmissionButtons } from "./project/ProjectSubmissionButtons";

interface ProjectFormProps {
  phase: string;
}

export function ProjectForm({ phase }: ProjectFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    date: undefined,
    teamMember: "",
    status: "proposed", // Set default status
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

  const handleSave = () => {
    localStorage.setItem("projectForm", JSON.stringify({
      ...formData,
      date: formData.date ? formData.date.toISOString() : null,
    }));
    toast({
      title: "Progress Saved",
      description: "Your form progress has been saved successfully.",
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

    if (!formData.projectName || !formData.date || !formData.teamMember || !formData.status) {
      toast({
        title: "Missing Information",
        description: "Please fill in all project information fields",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("projectSubmitted", "true");
    clearAllFormData();
    toast({
      title: "Project Submitted",
      description: "Your project has been successfully submitted!",
    });
    navigate("/");
  };

  const handleBypassSubmit = () => {
    if (!formData.projectName || !formData.date || !formData.teamMember || !formData.status) {
      toast({
        title: "Missing Information",
        description: "Please fill in all project information fields",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("projectSubmitted", "true");
    clearAllFormData();
    toast({
      title: "Project Submitted (Bypass Mode)",
      description: "Your project has been submitted without completion checks!",
      variant: "default",
    });
    navigate("/");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectInformationForm
            formData={formData}
            onFormDataChange={setFormData}
          />
          <ProjectSubmissionButtons
            onSave={handleSave}
            onSubmit={handleSubmitProject}
            onBypassSubmit={handleBypassSubmit}
          />
        </CardContent>
      </Card>

      <PhaseQuestions phase={phase} />
    </div>
  );
}