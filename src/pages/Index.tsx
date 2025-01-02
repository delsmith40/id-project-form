import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectSection } from "@/components/index/ProjectSection";
import { NewProjectButton } from "@/components/index/NewProjectButton";

const Index = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = () => {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        try {
          const parsedProjects = JSON.parse(storedProjects);
          setProjects(Array.isArray(parsedProjects) ? parsedProjects : []);
        } catch (error) {
          console.error('Error parsing projects:', error);
          setProjects([]);
        }
      }
    };

    loadProjects();
    // Add event listener for storage changes
    window.addEventListener('storage', loadProjects);
    
    return () => {
      window.removeEventListener('storage', loadProjects);
    };
  }, []);

  // Filter projects based on their status
  const proposedProjects = projects.filter(project => project.status === 'proposed');
  const newProjects = projects.filter(project => project.status === 'new');
  const onHoldProjects = projects.filter(project => project.status === 'on_hold');
  const inProcessProjects = projects.filter(project => project.status === 'in_process');
  const canceledProjects = projects.filter(project => project.status === 'canceled');
  const completedProjects = projects.filter(project => project.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center mb-12">
          <NewProjectButton />
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Covington Instructional Design Projects
          </h1>
          <Button
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Button>
        </div>

        <div className="space-y-8">
          <ProjectSection 
            title="Proposed Projects" 
            projects={proposedProjects} 
          />
          <ProjectSection 
            title="New Projects" 
            projects={newProjects} 
          />
          <ProjectSection 
            title="In Process Projects" 
            projects={inProcessProjects} 
            showProgress 
          />
          <ProjectSection 
            title="On Hold Projects" 
            projects={onHoldProjects} 
          />
          <ProjectSection 
            title="Completed Projects" 
            projects={completedProjects} 
            showCompletedDate 
          />
          <ProjectSection 
            title="Canceled Projects" 
            projects={canceledProjects} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;