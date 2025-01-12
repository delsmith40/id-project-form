import { useState, useEffect } from "react";
import { ProjectFormData } from "@/components/project/ProjectInformationForm";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function useProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    date: undefined,
    teamMember: "",
    projectOwner: "",
    status: "proposed",
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = () => {
    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const projectIndex = existingProjects.findIndex((p: any) => p.title === formData.projectName);
    
    const updatedProject = {
      id: projectIndex >= 0 ? existingProjects[projectIndex].id : Date.now().toString(),
      title: formData.projectName,
      teamMember: formData.teamMember,
      projectOwner: formData.projectOwner,
      date: formData.date,
      status: formData.status,
    };

    if (projectIndex >= 0) {
      existingProjects[projectIndex] = updatedProject;
    } else {
      existingProjects.push(updatedProject);
    }

    localStorage.setItem("projects", JSON.stringify(existingProjects));
    localStorage.setItem("projectForm", JSON.stringify(formData));

    toast({
      title: "Success",
      description: "Project saved successfully",
    });
  };

  const handleSubmitProject = () => {
    handleSave();
    navigate("/");
  };

  const handleBypassSubmit = () => {
    handleSave();
    navigate("/");
  };

  const loadProjectData = (projectId: string) => {
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
    }
  };

  return {
    formData,
    setFormData,
    handleSave,
    handleSubmitProject,
    handleBypassSubmit,
    loadProjectData,
  };
}