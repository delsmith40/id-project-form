import { useState, useEffect } from "react";
import { FilterSection } from "@/components/analytics/FilterSection";
import { ProjectChart } from "@/components/analytics/ProjectChart";
import { ProjectModal } from "@/components/analytics/ProjectModal";

const AnalyticsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          const transformedProjects = parsedProjects.map(project => ({
            name: project.title,
            title: project.title,
            completion: project.status === 'completed' ? 100 : 
                       project.status === 'in_process' ? 50 :
                       project.status === 'on_hold' ? 30 :
                       project.status === 'new' ? 10 :
                       project.status === 'proposed' ? 5 : 0,
            phase: project.status,
            id: project.id,
            description: project.description || `Status: ${project.status}`,
            teamMember: project.teamMember || 'Unassigned',
            projectOwner: project.projectOwner || 'Unassigned',
          }));
          setProjectData(transformedProjects);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjectData([]);
      }
    };

    loadProjects();
    window.addEventListener('storage', loadProjects);
    
    return () => {
      window.removeEventListener('storage', loadProjects);
    };
  }, []);

  const phaseData = [
    { phase: "Proposed", count: projectData.filter(p => p.phase === "proposed").length },
    { phase: "New", count: projectData.filter(p => p.phase === "new").length },
    { phase: "In Process", count: projectData.filter(p => p.phase === "in_process").length },
    { phase: "On Hold", count: projectData.filter(p => p.phase === "on_hold").length },
    { phase: "Canceled", count: projectData.filter(p => p.phase === "canceled").length },
    { phase: "Completed", count: projectData.filter(p => p.phase === "completed").length },
  ];

  // Group projects by team member
  const teamMemberData = Object.entries(
    projectData.reduce((acc: any, project) => {
      const member = project.teamMember || 'Unassigned';
      acc[member] = (acc[member] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  // Group projects by project owner
  const projectOwnerData = Object.entries(
    projectData.reduce((acc: any, project) => {
      const owner = project.projectOwner || 'Unassigned';
      acc[owner] = (acc[owner] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const filteredProjects = projectData.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (phaseFilter === "all" || project.phase === phaseFilter)
  );

  const handleProjectClick = (data) => {
    const project = projectData.find(p => p.name === data.name);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handlePhaseClick = (data) => {
    const projectsInPhase = projectData.filter(
      p => p.phase.toLowerCase() === data.phase.toLowerCase()
    );
    if (projectsInPhase.length > 0) {
      setSelectedProject({
        name: `${data.phase} Phase`,
        description: `There are ${data.count} projects in the ${data.phase} phase`,
        projects: projectsInPhase
      });
      setIsModalOpen(true);
    }
  };

  const handleTeamMemberClick = (data) => {
    const projectsByMember = projectData.filter(
      p => (p.teamMember || 'Unassigned') === data.name
    );
    if (projectsByMember.length > 0) {
      setSelectedProject({
        name: `Projects by ${data.name}`,
        description: `${data.name} is assigned to ${data.count} projects`,
        projects: projectsByMember
      });
      setIsModalOpen(true);
    }
  };

  const handleProjectOwnerClick = (data) => {
    const projectsByOwner = projectData.filter(
      p => (p.projectOwner || 'Unassigned') === data.name
    );
    if (projectsByOwner.length > 0) {
      setSelectedProject({
        name: `Projects owned by ${data.name}`,
        description: `${data.name} owns ${data.count} projects`,
        projects: projectsByOwner
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <FilterSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        phaseFilter={phaseFilter}
        onPhaseFilterChange={setPhaseFilter}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <ProjectChart
          title="Project Completion Rates"
          data={filteredProjects}
          dataKey="completion"
          fill="#8884d8"
          name="Completion %"
          onClick={handleProjectClick}
        />

        <ProjectChart
          title="Projects by Phase"
          data={phaseData}
          dataKey="count"
          fill="#82ca9d"
          name="Number of Projects"
          onClick={handlePhaseClick}
        />

        <ProjectChart
          title="Projects by Team Member"
          data={teamMemberData}
          dataKey="count"
          fill="#ffc658"
          name="Number of Projects"
          onClick={handleTeamMemberClick}
        />

        <ProjectChart
          title="Projects by Project Owner"
          data={projectOwnerData}
          dataKey="count"
          fill="#ff7300"
          name="Number of Projects"
          onClick={handleProjectOwnerClick}
        />
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedProject={selectedProject}
      />
    </div>
  );
};

export default AnalyticsPage;