import { ProjectSection } from "@/components/index/ProjectSection";

const ProjectsListPage = () => {
  // Get projects from localStorage
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");

  // Group projects by status
  const proposedProjects = projects.filter((p: any) => p.status === "proposed");
  const inProgressProjects = projects.filter((p: any) => p.status === "in_progress");
  const completedProjects = projects.filter((p: any) => p.status === "completed");

  return (
    <div className="container mx-auto py-8 space-y-8">
      {proposedProjects.length > 0 && (
        <ProjectSection 
          title="Proposed Projects" 
          projects={proposedProjects}
        />
      )}
      
      {inProgressProjects.length > 0 && (
        <ProjectSection 
          title="In Progress Projects" 
          projects={inProgressProjects}
          showProgress={true}
        />
      )}
      
      {completedProjects.length > 0 && (
        <ProjectSection 
          title="Completed Projects" 
          projects={completedProjects}
          showCompletedDate={true}
        />
      )}

      {projects.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">No projects found</h2>
          <p className="text-gray-500 mt-2">Start by creating a new project</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsListPage;