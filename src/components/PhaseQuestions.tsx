import { Card } from "@/components/ui/card";
import { UnansweredQuestions } from "./phase/UnansweredQuestions";
import { usePhaseLogic } from "@/hooks/usePhaseLogic";
import { usePhaseData } from "@/hooks/usePhaseData";
import { PhaseHeader } from "./phase/PhaseHeader";
import { PhaseContent } from "./phase/PhaseContent";

interface PhaseQuestionsProps {
  phase: string;
  onSave?: () => void;
}

export function PhaseQuestions({ phase, onSave }: PhaseQuestionsProps) {
  const { answers, handleAnswerChange } = usePhaseLogic(phase);
  const { getPhaseData, calculateSectionProgress, getUnansweredQuestions } = usePhaseData(phase);

  const phaseData = getPhaseData();
  const unansweredSections = getUnansweredQuestions(answers);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="w-full animate-fade-in">
          <PhaseHeader phase={phase} />
          <PhaseContent
            phaseData={phaseData}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
            calculateSectionProgress={(questions) => calculateSectionProgress(questions, answers)}
          />
        </Card>
      </div>

      <div className="lg:col-span-1">
        <UnansweredQuestions unansweredSections={unansweredSections} />
      </div>
    </div>
  );
}