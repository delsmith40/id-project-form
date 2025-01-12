import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Project {
  id: string;
  title: string;
  teamMember: string;
  date: string;
  progress?: string;
  completedDate?: string;
  status: string;
}

interface ProjectTableProps {
  projects: Project[];
  showProgress?: boolean;
  showCompletedDate?: boolean;
}

export function ProjectTable({ projects, showProgress = false, showCompletedDate = false }: ProjectTableProps) {
  const navigate = useNavigate();

  const handleViewDetails = (project: Project) => {
    // Navigate to the analyze phase of the project, which is the starting point
    navigate(`/analyze/${project.id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Title</TableHead>
          <TableHead>Team Member</TableHead>
          <TableHead>Start Date</TableHead>
          {showProgress && <TableHead>Progress</TableHead>}
          {showCompletedDate && <TableHead>Completion Date</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>{project.teamMember}</TableCell>
            <TableCell>{project.date}</TableCell>
            {showProgress && <TableCell>{project.progress}</TableCell>}
            {showCompletedDate && <TableCell>{project.completedDate}</TableCell>}
            <TableCell>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleViewDetails(project)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}