import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionSection } from "./QuestionSection";
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSave = () => {
    localStorage.setItem(`${phase}-answers`, JSON.stringify(answers));
    toast({
      title: "Progress Saved",
      description: "Your answers have been saved successfully.",
    });

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

  const phaseData = getPhaseData();

  return (
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
  );
}