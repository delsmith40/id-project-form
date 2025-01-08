import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavigationMenu } from "./layout/NavigationMenu";
import { AnimatedBackground } from "./layout/AnimatedBackground";
import { Header } from "./layout/Header";
import { ProgressOverview } from "./progress/ProgressOverview";
import { phases } from "./phases/phaseConfig";
import { useProgress } from "@/hooks/useProgress";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPhase = location.pathname.split("/")[1] || "analyze";
  const { calculatePhaseProgress, calculateOverallProgress } = useProgress();

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
            <ProgressOverview
              currentPhase={currentPhase}
              calculatePhaseProgress={calculatePhaseProgress}
              calculateOverallProgress={calculateOverallProgress}
            />
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