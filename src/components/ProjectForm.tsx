import { PhaseQuestions } from "./PhaseQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectInformationForm } from "./project/ProjectInformationForm";
import { ProjectSubmissionButtons } from "./project/ProjectSubmissionButtons";
import { useProjectForm } from "@/hooks/useProjectForm";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectFormProps {
  phase: string;
}

export function ProjectForm({ phase }: ProjectFormProps) {
  const { id } = useParams();
  const { toast } = useToast();
  const {
    formData,
    setFormData,
    handleSave,
    handleSubmitProject,
    handleBypassSubmit,
    loadProjectData,
  } = useProjectForm();

  const form = useForm();

  useEffect(() => {
    if (id) {
      loadProjectData(id);
    }
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSave();
      toast({
        title: "Success",
        description: "Project saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 max-w-5xl mx-auto">
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

        <PhaseQuestions phase={phase} onSave={handleSave} />

        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <ProjectSubmissionButtons
              onSave={handleSave}
              onSubmit={handleSubmitProject}
              onBypassSubmit={handleBypassSubmit}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}