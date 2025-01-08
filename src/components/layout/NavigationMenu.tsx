import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { phaseOrder } from "@/data/phaseData";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "../ProgressBar";

interface Phase {
  id: string;
  title: string;
  color: string;
  summary: string;
}

interface NavigationMenuProps {
  phases: Phase[];
  currentPhase: string;
  calculatePhaseProgress: (phaseId: string) => number;
}

export function NavigationMenu({ phases, currentPhase, calculatePhaseProgress }: NavigationMenuProps) {
  const navigate = useNavigate();

  const calculateOverallProgress = () => {
    const progress = phaseOrder.reduce(
      (acc, phase) => acc + calculatePhaseProgress(phase),
      0
    );
    return Math.round(progress / phaseOrder.length);
  };

  return (
    <SidebarGroup>
      <Card className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold tracking-tight text-white">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/80">Phase Progress</p>
            <ProgressBar
              progress={calculatePhaseProgress(currentPhase)}
              label="Phase Progress"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/80">Overall Progress</p>
            <ProgressBar
              progress={calculateOverallProgress()}
              label="Overall Progress"
            />
          </div>
        </CardContent>
      </Card>

      <SidebarMenuItem>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 w-full rounded-lg p-4 mb-3 transition-all duration-200 hover:scale-[1.02] bg-[#D946EF] text-white hover:bg-opacity-90 shadow-lg ring-2 ring-white/20"
        >
          <Home className="h-5 w-5" />
          <span className="font-semibold">Home</span>
        </button>
      </SidebarMenuItem>

      <SidebarGroupLabel className="text-lg font-semibold text-white/90">Project Phases</SidebarGroupLabel>
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
  );
}