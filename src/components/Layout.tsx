import { useLocation } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { phaseOrder } from "@/data/phaseData";

interface LayoutProps {
  children: React.ReactNode;
}

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

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPhase = location.pathname.split("/")[1] || "analyze";

  // Calculate progress based on localStorage data
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
            <SidebarGroup>
              <SidebarGroupLabel>Project Phases</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {phases.map((phase) => (
                    <SidebarMenuItem key={phase.id}>
                      <a
                        href={`/${phase.id}`}
                        className={`block w-full rounded-lg p-4 mb-3 transition-all duration-200 hover:scale-[1.02] ${
                          currentPhase === phase.id
                            ? "ring-2 ring-offset-2 ring-offset-background"
                            : ""
                        }`}
                        style={{ 
                          backgroundColor: phase.color,
                          color: 'white'
                        }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{phase.title}</h3>
                            <span className="text-sm opacity-90">
                              {calculatePhaseProgress(phase.id)}%
                            </span>
                          </div>
                          <p className="text-sm opacity-80 line-clamp-2">
                            {phase.summary}
                          </p>
                          <div className="bg-white/30 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-300"
                              style={{
                                width: `${calculatePhaseProgress(phase.id)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </a>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="px-4 py-2 space-y-4">
              <ProgressBar
                progress={calculatePhaseProgress(currentPhase)}
                label="Phase Progress"
              />
              <ProgressBar
                progress={calculateOverallProgress()}
                label="Overall Progress"
              />
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}