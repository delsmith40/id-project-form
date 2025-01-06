import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { phaseOrder, type PhaseData } from "../data/phaseData";

export function usePhaseLogic(phase: string) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`${phase}-answers`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [phase]);

  const handleSave = () => {
    // Save answers
    localStorage.setItem(`${phase}-answers`, JSON.stringify(answers));

    // Save project information
    const projectForm = localStorage.getItem("projectForm");
    if (projectForm) {
      const formData = JSON.parse(projectForm);
      const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      
      // Check if project already exists
      const projectIndex = existingProjects.findIndex((p: any) => p.title === formData.projectName);
      
      const updatedProject = {
        id: projectIndex >= 0 ? existingProjects[projectIndex].id : Date.now().toString(),
        title: formData.projectName,
        teamMember: formData.teamMember,
        date: formData.date,
        status: formData.status,
        currentPhase: phase
      };

      if (projectIndex >= 0) {
        // Update existing project
        existingProjects[projectIndex] = updatedProject;
      } else {
        // Add new project
        existingProjects.push(updatedProject);
      }

      localStorage.setItem("projects", JSON.stringify(existingProjects));
    }

    toast({
      title: "Progress Saved",
      description: "Your answers and project information have been saved successfully.",
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

    localStorage.setItem(`${phase}-answers`, JSON.stringify({
      ...answers,
      [questionId]: value,
    }));
  };

  return {
    answers,
    handleSave,
    handleAnswerChange,
  };
}