import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhaseCard } from "@/components/PhaseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BarChart3, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const phases = [
  { id: "analyze", title: "Analyze Needs and Goals", timeline: "1-2 weeks", color: "#9b87f5" },
  { id: "design", title: "Design the Course", timeline: "2-4 weeks", color: "#F97316" },
  { id: "develop", title: "Develop Content", timeline: "4-6 weeks", color: "#0EA5E9" },
  { id: "implement", title: "Implement the Course", timeline: "2-4 weeks", color: "#D946EF" },
  { id: "evaluate", title: "Evaluate and Revise", timeline: "2-4 weeks", color: "#8B5CF6" },
  { id: "document", title: "Document and Reflect", timeline: "1-2 weeks", color: "#7E69AB" },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activePhase, setActivePhase] = useState("analyze");
  const [formData, setFormData] = useState({
    projectName: "",
    date: undefined as Date | undefined,
    teamMember: "",
  });

  const [phaseProgress, setPhaseProgress] = useState({
    analyze: 30,
    design: 20,
    develop: 10,
    implement: 0,
    evaluate: 0,
    document: 0,
  });

  const handleSave = () => {
    localStorage.setItem("projectInfo", JSON.stringify({
      ...formData,
      date: formData.date ? formData.date.toISOString() : null,
    }));
    toast({
      title: "Project Information Saved",
      description: "Your project information has been saved successfully.",
    });
  };

  const overallProgress =
    Object.values(phaseProgress).reduce((acc, curr) => acc + curr, 0) / phases.length;

  const handlePhaseClick = (phaseId: string) => {
    setActivePhase(phaseId);
    navigate(`/${phaseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Covington Instructional Design Project Form
          </h1>
          <Button
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar with Phase Cards */}
          <div className="lg:col-span-1 space-y-4">
            {phases.map((phase) => (
              <PhaseCard
                key={phase.id}
                title={phase.title}
                timeline={phase.timeline}
                color={phase.color}
                progress={phaseProgress[phase.id as keyof typeof phaseProgress]}
                isActive={activePhase === phase.id}
                onClick={() => handlePhaseClick(phase.id)}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData({ ...formData, projectName: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, teamMember: e.target.value })
                      }
                      placeholder="Enter team member ID"
                    />
                  </div>
                </div>
                <Button onClick={handleSave} className="mt-6">
                  Save Project Information
                </Button>
              </CardContent>
            </Card>

            {/* Progress Bars */}
            <div className="space-y-4 mt-6">
              <ProgressBar progress={overallProgress} label="Overall Progress" />
              <ProgressBar
                progress={phaseProgress[activePhase as keyof typeof phaseProgress]}
                label={`${
                  phases.find((p) => p.id === activePhase)?.title
                } Progress`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;