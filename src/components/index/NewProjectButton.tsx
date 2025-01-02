import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NewProjectButton() {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/analyze");
    localStorage.clear(); // Clear any existing project data
  };

  return (
    <Button
      onClick={handleNewProject}
      size="lg"
      className="mb-8 text-xl py-8 px-12 shadow-lg hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    >
      <FilePlus className="mr-2 h-6 w-6" />
      Start New Project
    </Button>
  );
}