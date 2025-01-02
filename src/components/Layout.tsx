import { useLocation, useNavigate } from "react-router-dom";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPhase = location.pathname.split("/")[1] || "analyze";

  const handleDeleteProject = () => {
    // Clear all phase-related data from localStorage
    phaseOrder.forEach((phase) => {
      localStorage.removeItem(`${phase}-answers`);
    });
    // Clear project info
    localStorage.removeItem("projectForm");
    
    toast({
      title: "Project Deleted",
      description: "All project data has been removed successfully.",
    });
    
    // Navigate to home page
    navigate("/");
  };

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      project data and remove all saved progress.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProject}>
                      Delete Project
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-center py-6 bg-background/80 backdrop-blur-sm border-b">
            Covington Instructional Design Project Form
          </h1>
          <main className="flex-1 p-8 animate-[pulse_4s_ease-in-out_infinite] dark:bg-slate-950 bg-opacity-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] bg-[size:3rem_3rem] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-slate-900/0 dark:from-slate-950/80 dark:to-slate-950/20 -z-10" />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}