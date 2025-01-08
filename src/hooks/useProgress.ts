import { phaseOrder } from "@/data/phaseData";

export function useProgress() {
  const calculatePhaseProgress = (phaseId: string) => {
    const answers = localStorage.getItem(`${phaseId}-answers`);
    if (!answers) return 0;
    
    const parsedAnswers = JSON.parse(answers);
    const answeredQuestions = Object.values(parsedAnswers).filter(
      (answer) => answer && String(answer).trim() !== ""
    ).length;

    let totalQuestions = 0;
    switch (phaseId) {
      case "analyze":
        totalQuestions = 16;
        break;
      case "design":
        totalQuestions = 17;
        break;
      case "develop":
        totalQuestions = 14;
        break;
      case "implement":
        totalQuestions = 17;
        break;
      case "evaluate":
        totalQuestions = 14;
        break;
      case "document":
        totalQuestions = 8;
        break;
      default:
        totalQuestions = 0;
    }

    return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  };

  const calculateOverallProgress = () => {
    const progress = phaseOrder.reduce(
      (acc, phase) => acc + calculatePhaseProgress(phase),
      0
    );
    return Math.round(progress / phaseOrder.length);
  };

  return {
    calculatePhaseProgress,
    calculateOverallProgress,
  };
}