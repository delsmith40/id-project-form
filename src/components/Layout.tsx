import { useLocation } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { phaseOrder } from "@/data/phaseData";
import { NavigationMenu } from "./layout/NavigationMenu";
import { DeleteProjectButton } from "./layout/DeleteProjectButton";
import { AnimatedBackground } from "./layout/AnimatedBackground";
import { Header } from "./layout/Header";

const phases = [
  { 
    id: "analyze", 
    title: "Analyze Needs and Goals", 
    color: "#9b87f5",
    summary: "Identify stakeholders, define goals, assess needs, and evaluate risks."
  },
  { 
    id: "design", 
    title: "Design the Course", 
    color: "#F97316",
    summary: "Develop framework, select delivery methods, and create assessments."
  },
  { 
    id: "develop", 
    title: "Develop Content", 
    color: "#0EA5E9",
    summary: "Create materials, conduct pilot testing, and revise content."
  },
  { 
    id: "implement", 
    title: "Implement the Course", 
    color: "#D946EF",
    summary: "Deliver training, provide support, and execute communication plan."
  },
  { 
    id: "evaluate", 
    title: "Evaluate and Revise", 
    color: "#8B5CF6",
    summary: "Gather data, analyze outcomes, and make revisions."
  },
  { 
    id: "document", 
    title: "Document and Reflect", 
    color: "#7E69AB",
    summary: "Document process, reflect on learnings, and transfer knowledge."
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPhase = location.pathname.split("/")[1] || "analyze";

  const calculatePhaseProgress = (phaseId: string) => {
    const answers = localStorage.getItem(`${phaseId}-answers`);
    if (!answers) return 0;
    const parsedAnswers = JSON.parse(answers);
    const totalQuestions = Object.keys(parsedAnswers).length;
    const answeredQuestions = Object.values(parsedAnswers).filter(
      (answer) => answer && String(answer).trim() !== ""
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100) || 0;
  };

  const calculateOverallProgress = () => {
    const progress = phaseOrder.reduce(
      (acc, phase) => acc + calculatePhaseProgress(phase),
      0
    );
    return Math.round(progress / phaseOrder.length);
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <NavigationMenu
              phases={phases}
              currentPhase={currentPhase}
              calculatePhaseProgress={calculatePhaseProgress}
            />
            <div className="px-4 py-2 space-y-4">
              <ProgressBar
                progress={calculatePhaseProgress(currentPhase)}
                label="Phase Progress"
              />
              <ProgressBar
                progress={calculateOverallProgress()}
                label="Overall Progress"
              />
              <DeleteProjectButton />
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}