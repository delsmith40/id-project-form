import { ProgressBar } from "../ProgressBar";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { phaseOrder } from "@/data/phaseData";

interface ProgressSectionProps {
  currentPhase: string;
  calculatePhaseProgress: (phaseId: string) => number;
  calculateOverallProgress: () => number;
}

export function ProgressSection({ 
  currentPhase, 
  calculatePhaseProgress, 
  calculateOverallProgress 
}: ProgressSectionProps) {
  return (
    <div className="px-4 py-2 space-y-4">
      <ProgressBar
        progress={calculatePhaseProgress(currentPhase)}
        label="Phase Progress"
      />
      <ProgressBar
        progress={calculateOverallProgress()}
        label="Overall Progress"
      />
      <DeleteProjectButton />
    </div>
  );
}