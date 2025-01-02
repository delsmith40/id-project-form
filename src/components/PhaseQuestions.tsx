import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PhaseQuestionsProps {
  phase: string;
}

interface QuestionSection {
  title: string;
  questions: { id: string; text: string }[];
  details?: string;
  timeline?: string;
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
    timeline: "1-2 weeks for meetings, data collection, and analysis.",
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

const phaseOrder = ["analyze", "design", "develop", "implement", "evaluate", "document"];

export function PhaseQuestions({ phase }: PhaseQuestionsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSave = () => {
    localStorage.setItem(`${phase}-answers`, JSON.stringify(answers));
    toast({
      title: "Progress Saved",
      description: "Your answers have been saved successfully.",
    });

    // Find the next phase and navigate to it
    const currentPhaseIndex = phaseOrder.indexOf(phase);
    if (currentPhaseIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentPhaseIndex + 1];
      navigate(`/${nextPhase}`);
    } else {
      toast({
        title: "Project Complete",
        description: "You have completed all phases of the project!",
      });
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-phase-analyze">
          Analyze Needs and Goals
        </CardTitle>
        <p className="text-sm text-muted-foreground">Timeline: 1-2 weeks</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {analyzePhaseData.map((section, index) => (
            <AccordionItem
              key={section.title}
              value={`section-${index}`}
              className="border rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 rounded-t-lg">
                <div className="flex flex-col items-start">
                  <span className="text-lg font-semibold">{section.title}</span>
                  {section.timeline && (
                    <span className="text-sm text-muted-foreground">{section.timeline}</span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 space-y-4">
                {section.details && (
                  <div className="bg-muted/50 p-3 rounded-md mb-4">
                    <p className="text-sm text-muted-foreground">{section.details}</p>
                  </div>
                )}
                {section.questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label htmlFor={question.id} className="text-base">
                      {question.text}
                    </Label>
                    <Textarea
                      id={question.id}
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="min-h-[100px] resize-y"
                      placeholder="Enter your answer here..."
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
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
  );
}
