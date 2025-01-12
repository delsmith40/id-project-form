import { CardHeader, CardTitle } from "@/components/ui/card";

interface PhaseHeaderProps {
  phase: string;
}

export function PhaseHeader({ phase }: PhaseHeaderProps) {
  const getPhaseTimeline = (phase: string) => {
    switch (phase) {
      case "analyze":
        return "1-2 weeks";
      case "design":
        return "2-4 weeks";
      case "develop":
        return "4-6 weeks";
      case "implement":
        return "2-4 weeks";
      case "evaluate":
        return "2-4 weeks";
      default:
        return "1-2 weeks";
    }
  };

  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-phase-analyze">
        {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Timeline: {getPhaseTimeline(phase)}
      </p>
    </CardHeader>
  );
}