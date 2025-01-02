import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhaseCard } from "@/components/PhaseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ProjectForm } from "@/components/ProjectForm";

const phases = [
  { id: "analyze", title: "Analyze Needs and Goals", timeline: "1-2 weeks", color: "#9b87f5" },
  { id: "design", title: "Design the Course", timeline: "2-4 weeks", color: "#F97316" },
  { id: "develop", title: "Develop Content", timeline: "4-6 weeks", color: "#0EA5E9" },
  { id: "implement", title: "Implement the Course", timeline: "2-4 weeks", color: "#D946EF" },
  { id: "evaluate", title: "Evaluate and Revise", timeline: "2-4 weeks", color: "#8B5CF6" },
  { id: "document", title: "Document and Reflect", timeline: "1-2 weeks", color: "#7E69AB" },
];

const Index = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState("analyze");
  const [phaseProgress, setPhaseProgress] = useState({
    analyze: 30,
    design: 20,
    develop: 10,
    implement: 0,
    evaluate: 0,
    document: 0,
  });

  const overallProgress =
    Object.values(phaseProgress).reduce((acc, curr) => acc + curr, 0) / phases.length;

  const handlePhaseClick = (phaseId: string) => {
    setActivePhase(phaseId);
    navigate(`/${phaseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Covington Instructional Design Project Form
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {phases.map((phase) => (
              <PhaseCard
                key={phase.id}
                title={phase.title}
                timeline={phase.timeline}
                color={phase.color}
                progress={phaseProgress[phase.id as keyof typeof phaseProgress]}
                isActive={activePhase === phase.id}
                onClick={() => handlePhaseClick(phase.id)}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
            <ProjectForm phase={activePhase} />
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-8 space-y-4">
          <ProgressBar progress={overallProgress} label="Overall Progress" />
          <ProgressBar
            progress={phaseProgress[activePhase as keyof typeof phaseProgress]}
            label={`${phases.find((p) => p.id === activePhase)?.title} Progress`}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;