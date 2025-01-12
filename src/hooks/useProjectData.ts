import { phaseOrder } from "@/data/phaseData";
import { ProjectFormData } from "@/components/project/ProjectInformationForm";

export function useProjectData() {
  const loadProjectData = (projectId: string, setFormData: (data: ProjectFormData) => void) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const project = projects.find((p: any) => p.id === projectId);
    
    if (project) {
      setFormData({
        projectName: project.title || "",
        date: project.date ? new Date(project.date) : undefined,
        teamMember: project.teamMember || "",
        projectOwner: project.projectOwner || "",
        status: project.status || "proposed",
      });

      // Load phase answers if they exist
      phaseOrder.forEach(phase => {
        const savedAnswers = localStorage.getItem(`${projectId}-${phase}-answers`);
        if (savedAnswers) {
          localStorage.setItem(`${phase}-answers`, savedAnswers);
        }
      });
    }
  };

  return {
    loadProjectData,
  };
}