import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { QuestionInput } from "./QuestionInput";
import { cn } from "@/lib/utils";

interface QuestionSectionProps {
  index: number;
  title: string;
  timeline?: string;
  details?: string;
  questions: { id: string; text: string }[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
  progress: number;
}

export function QuestionSection({
  index,
  title,
  timeline,
  details,
  questions,
  answers,
  onAnswerChange,
  progress,
}: QuestionSectionProps) {
  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-orange-500 animate-blink"; // Blinking Orange for 100%
    if (progress >= 75) return "bg-blue-300"; // Light Blue for 75-99%
    if (progress >= 50) return "bg-yellow-400"; // Yellow for 50-74%
    if (progress >= 25) return "bg-red-500"; // Red for 25-49%
    return "bg-gray-200"; // Default color for 0-24%
  };

  return (
    <AccordionItem
      value={`section-${index}`}
      className="border rounded-lg mb-4 shadow-sm"
    >
      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 rounded-t-lg">
        <div className="flex flex-col items-start w-full">
          <div className="flex justify-between w-full items-center">
            <span className="text-lg font-semibold">{title}</span>
            <span className={cn(
              "text-sm",
              progress === 100 ? "text-orange-500 animate-blink" :
              progress >= 75 ? "text-blue-300" :
              progress >= 50 ? "text-yellow-400" :
              progress >= 25 ? "text-red-500" :
              "text-muted-foreground"
            )}>
              {Math.round(progress)}%
            </span>
          </div>
          {timeline && (
            <span className="text-sm text-muted-foreground">{timeline}</span>
          )}
          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300",
                getProgressColor(progress)
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
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