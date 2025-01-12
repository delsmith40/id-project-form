import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function usePhaseLogic(phase: string) {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`${phase}-answers`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [phase]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    localStorage.setItem(`${phase}-answers`, JSON.stringify({
      ...answers,
      [questionId]: value,
    }));
  };

  return {
    answers,
    handleAnswerChange,
  };
}