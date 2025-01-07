import { PhaseQuestions } from "./PhaseQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectInformationForm } from "./project/ProjectInformationForm";
import { ProjectSubmissionButtons } from "./project/ProjectSubmissionButtons";
import { useProjectFormLogic } from "./project/ProjectFormLogic";
import { Form } from "@/components/ui/form";

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
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
          </CardContent>
        </Card>

        <PhaseQuestions phase={phase} />

        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <ProjectSubmissionButtons
              onSave={handleSave}
              onSubmit={handleSubmitProject}
              onBypassSubmit={handleBypassSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}