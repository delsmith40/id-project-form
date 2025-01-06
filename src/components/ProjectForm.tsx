import { PhaseQuestions } from "./PhaseQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectInformationForm } from "./project/ProjectInformationForm";
import { ProjectSubmissionButtons } from "./project/ProjectSubmissionButtons";
import { useProjectFormLogic } from "./project/ProjectFormLogic";

interface ProjectFormProps {
  phase: string;
}

export function ProjectForm({ phase }: ProjectFormProps) {
  const {
    formData,
    setFormData,
    handleSave,
    handleSubmitProject,
    handleBypassSubmit,
  } = useProjectFormLogic();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectInformationForm
            formData={formData}
            onFormDataChange={setFormData}
          />
          <ProjectSubmissionButtons
            onSave={handleSave}
            onSubmit={handleSubmitProject}
            onBypassSubmit={handleBypassSubmit}
          />
        </CardContent>
      </Card>

      <PhaseQuestions phase={phase} />
    </div>
  );
}