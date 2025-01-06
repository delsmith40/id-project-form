import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  phaseFilter: string;
  onPhaseFilterChange: (value: string) => void;
}

export function FilterSection({
  searchTerm,
  onSearchChange,
  phaseFilter,
  onPhaseFilterChange,
}: FilterSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="space-y-2 flex-1">
        <Label htmlFor="search">Search Projects</Label>
        <Input
          id="search"
          placeholder="Search by project name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="space-y-2 w-full md:w-48">
        <Label>Filter by Phase</Label>
        <Select
          value={phaseFilter}
          onValueChange={onPhaseFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Phases</SelectItem>
            <SelectItem value="proposed">Proposed</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_process">In Process</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}