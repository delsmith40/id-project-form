import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, FileSpreadsheet, FilePlus, ListFilter } from "lucide-react";
import { InstructionalDesignDialog } from "@/components/forms/InstructionalDesignDialog";
import { ChatAssistant } from "@/components/chat/ChatAssistant";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-4xl mx-auto px-6">
      <div className="w-full space-y-8">
        <InstructionalDesignDialog />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Button
            onClick={() => {
              navigate("/analyze");
              localStorage.clear();
            }}
            size="lg"
            className="w-full py-6 text-base md:text-lg bg-phase-analyze hover:bg-phase-analyze/90 transform transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in"
          >
            <FilePlus className="mr-2 h-6 w-6" />
            Start a New Project
          </Button>

          <Button
            onClick={() => navigate("/analytics")}
            size="lg"
            className="w-full py-6 text-base md:text-lg bg-phase-develop hover:bg-phase-develop/90 transform transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in delay-100"
          >
            <BarChart3 className="mr-2 h-6 w-6" />
            Analytics
          </Button>

          <Button
            onClick={() => navigate("/projects-list")}
            size="lg"
            className="w-full py-6 text-base md:text-lg bg-phase-document hover:bg-phase-document/90 transform transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in delay-200"
          >
            <ListFilter className="mr-2 h-6 w-6" />
            Project Lists
          </Button>
        </div>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default Index;