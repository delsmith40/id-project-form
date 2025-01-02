import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { phaseOrder } from "@/data/phaseData";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

  return (
    <SidebarGroup>
      <SidebarMenuItem>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 w-full rounded-lg p-4 mb-3 transition-all duration-200 hover:scale-[1.02] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <Home className="h-5 w-5" />
          <span className="font-semibold">Home</span>
        </button>
      </SidebarMenuItem>
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
  );
}