import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectTable } from "./ProjectTable";

interface Project {
  id: string;
  title: string;
  teamMember: string;
  date: string;
  progress?: string;
  completedDate?: string;
  status: string;
}

interface ProjectSectionProps {
  title: string;
  projects: Project[];
  showProgress?: boolean;
  showCompletedDate?: boolean;
}

export function ProjectSection({ title, projects, showProgress, showCompletedDate }: ProjectSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectTable 
          projects={projects} 
          showProgress={showProgress} 
          showCompletedDate={showCompletedDate} 
        />
      </CardContent>
    </Card>
  );
}