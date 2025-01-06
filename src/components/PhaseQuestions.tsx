import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionSection } from "./QuestionSection";
import { UnansweredQuestions } from "./phase/UnansweredQuestions";
import { usePhaseLogic } from "@/hooks/usePhaseLogic";
import {
  phaseOrder,
  analyzePhaseData,
  designPhaseData,
  developPhaseData,
  implementPhaseData,
  evaluatePhaseData,
  documentPhaseData,
  type PhaseData,
} from "../data/phaseData";

interface PhaseQuestionsProps {
  phase: string;
}

export function PhaseQuestions({ phase }: PhaseQuestionsProps) {
  const { answers, handleSave, handleAnswerChange } = usePhaseLogic(phase);

  const getPhaseData = (): PhaseData => {
    switch (phase) {
      case "analyze":
        return analyzePhaseData;
      case "design":
        return designPhaseData;
      case "develop":
        return developPhaseData;
      case "implement":
        return implementPhaseData;
      case "evaluate":
        return evaluatePhaseData;
      case "document":
        return documentPhaseData;
      default:
        return [];
    }
  };

  const calculateSectionProgress = (questions: { id: string; text: string }[]) => {
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(q => 
      answers[q.id] && answers[q.id].trim() !== ""
    ).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getUnansweredQuestions = () => {
    const phaseData = getPhaseData();
    return phaseData.map(section => ({
      title: section.title,
      questions: section.questions.filter(q => !answers[q.id] || answers[q.id].trim() === "")
    })).filter(section => section.questions.length > 0);
  };

  const phaseData = getPhaseData();
  const unansweredSections = getUnansweredQuestions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="w-full animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-phase-analyze">
              {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Timeline: {
                phase === "analyze" ? "1-2 weeks" :
                phase === "design" ? "2-4 weeks" :
                phase === "develop" ? "4-6 weeks" :
                phase === "implement" ? "2-4 weeks" :
                phase === "evaluate" ? "2-4 weeks" :
                "1-2 weeks"
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {phaseData.map((section, index) => (
                <QuestionSection
                  key={section.title}
                  index={index}
                  title={section.title}
                  timeline={section.timeline}
                  details={section.details}
                  questions={section.questions}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  progress={calculateSectionProgress(section.questions)}
                />
              ))}
            </Accordion>
            <Button
              onClick={handleSave}
              className="w-full bg-phase-analyze hover:bg-phase-analyze/90"
            >
              Save Answers & Continue to Next Phase
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <UnansweredQuestions unansweredSections={unansweredSections} />
      </div>
    </div>
  );
}