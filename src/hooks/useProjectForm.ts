import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/components/project/ProjectInformationForm";

export function useProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    date: new Date(),
    teamMember: "",
    projectOwner: "",
    status: "proposed",
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      if (!formData.projectName || !formData.teamMember || !formData.projectOwner) {
        throw new Error("Missing required fields");
      }

      const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const projectIndex = existingProjects.findIndex((p: any) => p.title === formData.projectName);
      
      const updatedProject = {
        id: projectIndex >= 0 ? existingProjects[projectIndex].id : Date.now().toString(),
        title: formData.projectName,
        teamMember: formData.teamMember,
        projectOwner: formData.projectOwner,
        date: formData.date ? formData.date.toISOString() : new Date().toISOString(),
        status: formData.status,
        progress: "0%"
      };

      if (projectIndex >= 0) {
        existingProjects[projectIndex] = updatedProject;
      } else {
        existingProjects.push(updatedProject);
      }

      localStorage.setItem("projects", JSON.stringify(existingProjects));
      localStorage.setItem("projectForm", JSON.stringify({
        ...formData,
        date: formData.date ? formData.date.toISOString() : new Date().toISOString(),
      }));
      
      return true;
    } catch (error) {
      console.error("Error saving project:", error);
      throw error;
    }
  };

  const handleSubmitProject = async () => {
    try {
      if (!formData.projectName || !formData.teamMember || !formData.projectOwner) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      await handleSave();
      navigate("/");
    } catch (error) {
      console.error("Error submitting project:", error);
      toast({
        title: "Error",
        description: "Failed to submit project",
        variant: "destructive",
      });
    }
  };

  const handleBypassSubmit = async () => {
    try {
      await handleSave();
      navigate("/");
    } catch (error) {
      console.error("Error bypassing project submission:", error);
      toast({
        title: "Error",
        description: "Failed to bypass submit project",
        variant: "destructive",
      });
    }
  };

  const loadProjectData = (projectId: string) => {
    try {
      const projects = JSON.parse(localStorage.getItem("projects") || "[]");
      const project = projects.find((p: any) => p.id === projectId);
      
      if (project) {
        setFormData({
          projectName: project.title || "",
          date: project.date ? new Date(project.date) : new Date(),
          teamMember: project.teamMember || "",
          projectOwner: project.projectOwner || "",
          status: project.status || "proposed",
        });
      }
    } catch (error) {
      console.error("Error loading project data:", error);
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
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