import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { phaseOrder } from "@/data/phaseData";
import { NavigationMenu } from "./layout/NavigationMenu";
import { AnimatedBackground } from "./layout/AnimatedBackground";
import { Header } from "./layout/Header";
import { ProgressBar } from "./ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <Card className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar
                  progress={calculatePhaseProgress(currentPhase)}
                  label="Phase Progress"
                />
                <ProgressBar
                  progress={calculateOverallProgress()}
                  label="Overall Progress"
                />
              </CardContent>
            </Card>
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
