import { useState, useEffect } from "react";
import { FilterSection } from "@/components/analytics/FilterSection";
import { ProjectChart } from "@/components/analytics/ProjectChart";
import { ProjectModal } from "@/components/analytics/ProjectModal";
import { useToast } from "@/components/ui/use-toast";

const AnalyticsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [formData, setFormData] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = () => {
      try {
        // Load projects
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          const transformedProjects = parsedProjects.map((project: any) => ({
            name: project.title || 'Untitled Project',
            title: project.title || 'Untitled Project',
            completion: calculateCompletion(project.status),
            phase: project.status || 'proposed',
            id: project.id,
            description: project.description || `Status: ${project.status || 'proposed'}`,
            teamMember: project.teamMember || 'Unassigned',
            projectOwner: project.projectOwner || 'Unassigned',
            date: project.date ? new Date(project.date) : new Date(),
          }));
          setProjectData(transformedProjects);
        }

        // Load forms
        const instructionalRequests = localStorage.getItem('instructionalRequests');
        const projectForms = localStorage.getItem('projectForm');
        
        const forms = [
          ...(instructionalRequests ? JSON.parse(instructionalRequests) : []),
          ...(projectForms ? (Array.isArray(JSON.parse(projectForms)) ? JSON.parse(projectForms) : [JSON.parse(projectForms)]) : [])
        ];

        setFormData(forms);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    
    return () => {
      window.removeEventListener('storage', loadData);
    };
  }, [toast]);

  const calculateCompletion = (status: string) => {
    switch (status) {
      case 'completed': return 100;
      case 'in_process': return 50;
      case 'on_hold': return 30;
      case 'new': return 10;
      case 'proposed': return 5;
      case 'canceled': return 0;
      default: return 0;
    }
  };

  // Transform form data for visualization
  const formsByType = formData.reduce((acc: any, form: any) => {
    const type = form.nameAndDepartment ? 'Instructional Design' : 'Project Form';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const formChartData = Object.entries(formsByType).map(([name, count]) => ({
    name,
    count
  }));

  const phaseData = [
    { phase: "Proposed", count: projectData.filter(p => p.phase === "proposed").length },
    { phase: "New", count: projectData.filter(p => p.phase === "new").length },
    { phase: "In Process", count: projectData.filter(p => p.phase === "in_process").length },
    { phase: "On Hold", count: projectData.filter(p => p.phase === "on_hold").length },
    { phase: "Canceled", count: projectData.filter(p => p.phase === "canceled").length },
    { phase: "Completed", count: projectData.filter(p => p.phase === "completed").length },
  ];

  const teamMemberData = Object.entries(
    projectData.reduce((acc: any, project) => {
      const member = project.teamMember || 'Unassigned';
      acc[member] = (acc[member] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

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

  const handleProjectClick = (data: any) => {
    if (data && data.name) {
      const project = projectData.find(p => p.name === data.name);
      if (project) {
        setSelectedProject(project);
        setIsModalOpen(true);
      }
    }
  };

  const handlePhaseClick = (data: any) => {
    if (data && data.phase) {
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
    }
  };

  const handleTeamMemberClick = (data: any) => {
    if (data && data.name) {
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
    }
  };

  const handleProjectOwnerClick = (data: any) => {
    if (data && data.name) {
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
    }
  };

  const handleFormClick = (data: any) => {
    if (data && data.name) {
      const relevantForms = formData.filter((form: any) => 
        (data.name === 'Instructional Design' && form.nameAndDepartment) ||
        (data.name === 'Project Form' && !form.nameAndDepartment)
      );
      
      if (relevantForms.length > 0) {
        setSelectedProject({
          name: `${data.name} Forms`,
          description: `There are ${data.count} ${data.name.toLowerCase()} forms submitted`,
          forms: relevantForms
        });
        setIsModalOpen(true);
      }
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

        <ProjectChart
          title="Submitted Forms by Type"
          data={formChartData}
          dataKey="count"
          fill="#0088FE"
          name="Number of Forms"
          onClick={handleFormClick}
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