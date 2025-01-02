import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PhaseQuestions } from "./PhaseQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectFormProps {
  phase: string;
}

export function ProjectForm({ phase }: ProjectFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectName: "",
    date: "",
    teamMember: "",
  });

  const handleSave = () => {
    localStorage.setItem("projectForm", JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "Your form progress has been saved successfully.",
    });
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
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
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
          <Button onClick={handleSave} className="mt-6">
            Save Progress
          </Button>
        </CardContent>
      </Card>

      <PhaseQuestions phase={phase} />
    </div>
  );
}