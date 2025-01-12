import { CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { QuestionSection } from "../QuestionSection";
import { type PhaseData } from "@/data/phaseData";

interface PhaseContentProps {
  phaseData: PhaseData;
  answers: Record<string, string>;
  handleAnswerChange: (questionId: string, value: string) => void;
  calculateSectionProgress: (questions: { id: string; text: string }[]) => number;
}

export function PhaseContent({
  phaseData,
  answers,
  handleAnswerChange,
  calculateSectionProgress,
}: PhaseContentProps) {
  return (
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
    </CardContent>
  );
}