import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type PhaseData } from "@/data/phaseData";

interface UnansweredQuestionsProps {
  unansweredSections: Array<{
    title: string;
    questions: Array<{ id: string; text: string }>;
  }>;
}

export function UnansweredQuestions({ unansweredSections }: UnansweredQuestionsProps) {
  return (
    <Card className="w-full animate-fade-in sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-red-500">
          Unanswered Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {unansweredSections.length === 0 ? (
          <p className="text-green-500 font-medium">All questions have been answered! 🎉</p>
        ) : (
          unansweredSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">{section.title}</h3>
              <ul className="list-disc list-inside space-y-1">
                {section.questions.map((question) => (
                  <li key={question.id} className="text-sm text-red-500">
                    {question.text}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}