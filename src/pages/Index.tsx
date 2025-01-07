import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, FileSpreadsheet, FilePlus, ListFilter } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-2xl mx-auto px-4">
      <div className="w-full max-w-md space-y-8">
        <Button
          onClick={() => navigate("/analyze")}
          className="w-full py-8 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Project Request
          <span className="text-sm ml-2">(Customer Form)</span>
          <FileSpreadsheet className="ml-2 h-6 w-6" />
        </Button>

        <div className="grid grid-cols-3 gap-4 w-full">
          <Button
            onClick={() => {
              navigate("/analyze");
              localStorage.clear(); // Clear any existing project data
            }}
            size="lg"
            className="w-full py-6 text-lg bg-phase-analyze hover:bg-phase-analyze/90"
          >
            <FilePlus className="mr-2 h-6 w-6" />
            Start a New Project
          </Button>

          <Button
            onClick={() => navigate("/analytics")}
            size="lg"
            className="w-full py-6 text-lg bg-phase-develop hover:bg-phase-develop/90"
          >
            <BarChart3 className="mr-2 h-6 w-6" />
            Analytics
          </Button>

          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="w-full py-6 text-lg bg-phase-document hover:bg-phase-document/90"
          >
            <ListFilter className="mr-2 h-6 w-6" />
            Project Lists
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;