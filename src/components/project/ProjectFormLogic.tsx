import { useProjectForm } from "@/hooks/useProjectForm";
import { useProjectData } from "@/hooks/useProjectData";
import { useProjectActions } from "@/hooks/useProjectActions";

export function useProjectFormLogic() {
  const { formData, setFormData } = useProjectForm();
  const { loadProjectData: loadData } = useProjectData();
  const { handleSave: saveProject, handleSubmitProject: submitProject, handleBypassSubmit: bypassSubmit } = useProjectActions();

  const handleSave = () => {
    saveProject(formData);
  };

  const handleSubmitProject = () => {
    submitProject(formData);
  };

  const handleBypassSubmit = () => {
    bypassSubmit(formData);
  };

  const loadProjectData = (projectId: string) => {
    loadData(projectId, setFormData);
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