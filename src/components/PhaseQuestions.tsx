import { useState, useEffect } from "react";
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

  // Load saved answers when component mounts
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`${phase}-answers`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [phase]);

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

    // Save to localStorage on each change
    localStorage.setItem(`${phase}-answers`, JSON.stringify({
      ...answers,
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
      </div>
    </div>
  );
}