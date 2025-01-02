import { useState } from "react";
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

interface ProjectFormProps {
  phase: string;
}

export function ProjectForm({ phase }: ProjectFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectName: "",
    date: undefined as Date | undefined,
    teamMember: "",
  });

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
          <Button onClick={handleSave} className="mt-6">
            Save Progress
          </Button>
        </CardContent>
      </Card>

      <PhaseQuestions phase={phase} />
    </div>
  );
}