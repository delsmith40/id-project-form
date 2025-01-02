import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export interface ProjectFormData {
  projectName: string;
  date: Date | undefined;
  teamMember: string;
  status: string;
}

interface ProjectInformationFormProps {
  formData: ProjectFormData;
  onFormDataChange: (data: ProjectFormData) => void;
}

export function ProjectInformationForm({ formData, onFormDataChange }: ProjectInformationFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={formData.projectName}
          onChange={(e) => onFormDataChange({ ...formData, projectName: e.target.value })}
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
              onSelect={(date) => onFormDataChange({ ...formData, date })}
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
          onChange={(e) => onFormDataChange({ ...formData, teamMember: e.target.value })}
          placeholder="Enter team member ID"
        />
      </div>
      <div className="space-y-2">
        <Label>Project Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => onFormDataChange({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="proposed">Proposed</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
            <SelectItem value="in_process">In Process</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}