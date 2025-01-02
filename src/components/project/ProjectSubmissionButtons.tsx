import { Button } from "@/components/ui/button";

interface ProjectSubmissionButtonsProps {
  onSave: () => void;
  onSubmit: () => void;
  onBypassSubmit: () => void;
}

export function ProjectSubmissionButtons({
  onSave,
  onSubmit,
  onBypassSubmit,
}: ProjectSubmissionButtonsProps) {
  return (
    <div className="flex gap-4 mt-6">
      <Button onClick={onSave}>Save Progress</Button>
      <Button
        onClick={onSubmit}
        variant="default"
        className="bg-green-600 hover:bg-green-700"
      >
        Submit Project
      </Button>
      <Button
        onClick={onBypassSubmit}
        variant="outline"
        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
      >
        Bypass Submit
      </Button>
    </div>
  );
}