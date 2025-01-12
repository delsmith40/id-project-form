import { useParams } from "react-router-dom";
import { ProjectForm } from "@/components/ProjectForm";

export default function ProjectPage() {
  const { id } = useParams();
  
  // Default to analyze phase when viewing a project
  return (
    <div className="container mx-auto py-6">
      <ProjectForm phase="analyze" />
    </div>
  );
}