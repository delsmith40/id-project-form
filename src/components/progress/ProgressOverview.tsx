import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "../ProgressBar";

interface ProgressOverviewProps {
  currentPhase: string;
  calculatePhaseProgress: (phaseId: string) => number;
  calculateOverallProgress: () => number;
}

export function ProgressOverview({
  currentPhase,
  calculatePhaseProgress,
  calculateOverallProgress,
}: ProgressOverviewProps) {
  return (
    <Card className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Progress Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressBar
          progress={calculatePhaseProgress(currentPhase)}
          label="Phase Progress"
        />
        <ProgressBar
          progress={calculateOverallProgress()}
          label="Overall Progress"
        />
      </CardContent>
    </Card>
  );
}