import { useState, useEffect } from "react";
import { ProjectFormData } from "@/components/project/ProjectInformationForm";

export function useProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    date: undefined,
    teamMember: "",
    projectOwner: "",
    status: "proposed",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("projectForm");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        ...parsed,
        date: parsed.date ? new Date(parsed.date) : undefined,
      });
    }
  }, []);

  return {
    formData,
    setFormData,
  };
}