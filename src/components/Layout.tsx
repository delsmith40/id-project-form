import { useLocation } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { phaseOrder } from "@/data/phaseData";

interface LayoutProps {
  children: React.ReactNode;
}

const phases = [
  { id: "analyze", title: "Analyze Needs and Goals", color: "#9b87f5" },
  { id: "design", title: "Design the Course", color: "#F97316" },
  { id: "develop", title: "Develop Content", color: "#0EA5E9" },
  { id: "implement", title: "Implement the Course", color: "#D946EF" },
  { id: "evaluate", title: "Evaluate and Revise", color: "#8B5CF6" },
  { id: "document", title: "Document and Reflect", color: "#7E69AB" },
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
                      <SidebarMenuButton
                        asChild
                        isActive={currentPhase === phase.id}
                        tooltip={`${calculatePhaseProgress(phase.id)}% complete`}
                      >
                        <a
                          href={`/${phase.id}`}
                          className="flex items-center gap-2"
                          style={{
                            color:
                              currentPhase === phase.id
                                ? phase.color
                                : "inherit",
                          }}
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: phase.color }}
                          />
                          <span>{phase.title}</span>
                        </a>
                      </SidebarMenuButton>
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