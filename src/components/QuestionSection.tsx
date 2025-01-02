import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { QuestionInput } from "./QuestionInput";

interface QuestionSectionProps {
  index: number;
  title: string;
  timeline?: string;
  details?: string;
  questions: { id: string; text: string }[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
}

export function QuestionSection({
  index,
  title,
  timeline,
  details,
  questions,
  answers,
  onAnswerChange,
}: QuestionSectionProps) {
  return (
    <AccordionItem
      value={`section-${index}`}
      className="border rounded-lg mb-4 shadow-sm"
    >
      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 rounded-t-lg">
        <div className="flex flex-col items-start">
          <span className="text-lg font-semibold">{title}</span>
          {timeline && (
            <span className="text-sm text-muted-foreground">{timeline}</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 space-y-4">
        {details && (
          <div className="bg-muted/50 p-3 rounded-md mb-4">
            <p className="text-sm text-muted-foreground">{details}</p>
          </div>
        )}
        {questions.map((question) => (
          <QuestionInput
            key={question.id}
            id={question.id}
            text={question.text}
            value={answers[question.id] || ""}
            onChange={onAnswerChange}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}