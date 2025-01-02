import { cn } from "@/lib/utils";

interface PhaseCardProps {
  title: string;
  timeline: string;
  color: string;
  progress: number;
  isActive: boolean;
  onClick: () => void;
}

export function PhaseCard({ title, timeline, color, progress, isActive, onClick }: PhaseCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg mb-4 text-left transition-all duration-200 hover:scale-105",
        isActive ? "ring-2 ring-offset-2" : ""
      )}
      style={{ backgroundColor: color }}
    >
      <div className="text-white">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm opacity-90">{timeline}</p>
        <div className="mt-2 bg-white/30 h-2 rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </button>
  );
}