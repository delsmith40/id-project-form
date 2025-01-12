import {
  phaseOrder,
  analyzePhaseData,
  designPhaseData,
  developPhaseData,
  implementPhaseData,
  evaluatePhaseData,
  documentPhaseData,
  type PhaseData,
} from "@/data/phaseData";

export function usePhaseData(phase: string) {
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

  const calculateSectionProgress = (questions: { id: string; text: string }[], answers: Record<string, string>) => {
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(
      (q) => answers[q.id] && answers[q.id].trim() !== ""
    ).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getUnansweredQuestions = (answers: Record<string, string>) => {
    const phaseData = getPhaseData();
    return phaseData
      .map((section) => ({
        title: section.title,
        questions: section.questions.filter(
          (q) => !answers[q.id] || answers[q.id].trim() === ""
        ),
      }))
      .filter((section) => section.questions.length > 0);
  };

  return {
    getPhaseData,
    calculateSectionProgress,
    getUnansweredQuestions,
  };
}