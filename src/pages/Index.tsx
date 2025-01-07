import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, FileSpreadsheet, FilePlus, ListFilter } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
        Covington Instructional Design Projects
      </h1>

      <div className="w-full max-w-md space-y-8">
        <Button
          onClick={() => navigate("/analyze")}
          className="w-full py-8 text-xl bg-blue-600 hover:bg-blue-700"
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
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
          >
            <FilePlus className="mr-2 h-6 w-6" />
            Start a New Project
          </Button>

          <Button
            onClick={() => navigate("/analytics")}
            size="lg"
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
          >
            <BarChart3 className="mr-2 h-6 w-6" />
            Analytics
          </Button>

          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
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