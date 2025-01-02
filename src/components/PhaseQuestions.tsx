import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PhaseQuestionsProps {
  phase: string;
}

interface QuestionSection {
  title: string;
  questions: { id: string; text: string }[];
  details?: string;
}

const analyzePhaseData: QuestionSection[] = [
  {
    title: "Identify Stakeholders",
    questions: [
      { id: "sponsors", text: "Who are the project sponsors?" },
      { id: "beneficiaries", text: "Who will benefit from the instructional program?" },
      { id: "approvers", text: "Who will approve the final product?" },
      { id: "businessNeed", text: "What is the primary business need or problem this training aims to address?" },
      { id: "alignment", text: "How does this project align with our organizational goals and strategy?" },
      { id: "outcomes", text: "What are the specific, measurable outcomes you expect from this training?" },
      { id: "deadlines", text: "Are there any critical deadlines or timelines we must adhere to?" },
    ],
    details: "Meet with stakeholders to understand their needs, expectations, and constraints.",
  },
  {
    title: "Define Goals",
    questions: [
      { id: "objectives", text: "What are the learning objectives?" },
      { id: "skills", text: "What specific skills or knowledge should learners gain?" },
      { id: "metrics", text: "Are there any specific performance metrics we aim to improve?" },
      { id: "shortLongObjectives", text: "What are the short-term and long-term objectives?" },
      { id: "successMeasures", text: "How will success be measured?" },
    ],
    details: "Develop a clear, concise statement of the learning objectives.",
  },
  {
    title: "Assess Needs",
    questions: [
      { id: "lackingSkills", text: "What skills or knowledge are currently lacking?" },
      { id: "availableResources", text: "What resources are available?" },
      { id: "gaps", text: "What are the gaps in knowledge or skills?" },
      { id: "previousTraining", text: "What previous training or instruction have the learners received?" },
      { id: "criticalTasks", text: "What critical tasks do learners need to perform?" },
      { id: "barriers", text: "What are the barriers to learning or performance?" },
      { id: "compliance", text: "Are there any legal or compliance requirements to consider?" },
    ],
    details: "Conduct surveys, interviews, and focus groups with the target audience.",
  },
  {
    title: "Risk Assessment",
    questions: [
      { id: "majorRisks", text: "What are the major risks?" },
      { id: "mitigation", text: "How can we mitigate them?" },
    ],
    details: "Develop a risk management plan.",
  },
];

export function PhaseQuestions({ phase }: PhaseQuestionsProps) {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSave = () => {
    localStorage.setItem(`${phase}-answers`, JSON.stringify(answers));
    toast({
      title: "Progress Saved",
      description: "Your answers have been saved successfully.",
    });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Accordion type="single" collapsible className="w-full">
        {analyzePhaseData.map((section, index) => (
          <AccordionItem key={section.title} value={`section-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-4">
              {section.details && (
                <p className="text-sm text-muted-foreground mb-4">{section.details}</p>
              )}
              {section.questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label htmlFor={question.id}>{question.text}</Label>
                  <Textarea
                    id={question.id}
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={handleSave} className="mt-4">
        Save Answers
      </Button>
    </div>
  );
}