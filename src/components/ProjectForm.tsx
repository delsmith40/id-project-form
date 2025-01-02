import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PhaseQuestions } from "./PhaseQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { phaseOrder } from "@/data/phaseData";

interface ProjectFormProps {
  phase: string;
}

export function ProjectForm({ phase }: ProjectFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    date: undefined as Date | undefined,
    teamMember: "",
  });

  // Load saved data when component mounts
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
    // Clear project form data
    localStorage.removeItem("projectForm");
    
    // Clear all phase answers
    phaseOrder.forEach(phase => {
      localStorage.removeItem(`${phase}-answers`);
    });
    
    // Reset form state
    setFormData({
      projectName: "",
      date: undefined,
      teamMember: "",
    });
  };

  const handleSubmitProject = () => {
    // Check if all phases are completed
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

    // Check if project information is filled
    if (!formData.projectName || !formData.date || !formData.teamMember) {
      toast({
        title: "Missing Information",
        description: "Please fill in all project information fields",
        variant: "destructive",
      });
      return;
    }

    // Submit project
    localStorage.setItem("projectSubmitted", "true");
    clearAllFormData();
    toast({
      title: "Project Submitted",
      description: "Your project has been successfully submitted!",
    });
    navigate("/");
  };

  const handleBypassSubmit = () => {
    // Only check if basic project information is filled
    if (!formData.projectName || !formData.date || !formData.teamMember) {
      toast({
        title: "Missing Information",
        description: "Please fill in all project information fields",
        variant: "destructive",
      });
      return;
    }

    // Submit project without completion checks
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({ ...formData, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamMember">ID Team Member</Label>
              <Input
                id="teamMember"
                value={formData.teamMember}
                onChange={(e) => setFormData({ ...formData, teamMember: e.target.value })}
                placeholder="Enter team member ID"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button onClick={handleSave}>
              Save Progress
            </Button>
            <Button 
              onClick={handleSubmitProject}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Project
            </Button>
            <Button 
              onClick={handleBypassSubmit}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
            >
              Bypass Submit
            </Button>
          </div>
        </CardContent>
      </Card>

      <PhaseQuestions phase={phase} />
    </div>
  );
}