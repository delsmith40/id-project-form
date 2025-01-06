import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
          // Transform the data to match the chart format
          const transformedProjects = parsedProjects.map(project => ({
            name: project.title,
            completion: project.status === 'completed' ? 100 : 
                       project.status === 'in_process' ? 50 :
                       project.status === 'on_hold' ? 30 :
                       project.status === 'new' ? 10 :
                       project.status === 'proposed' ? 5 : 0,
            phase: project.status,
            id: project.id,
            description: `Team Member: ${project.teamMember}, Status: ${project.status}`,
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

  // ... keep existing code (JSX for the UI components remains the same)

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="space-y-2 flex-1">
          <Label htmlFor="search">Search Projects</Label>
          <Input
            id="search"
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2 w-full md:w-48">
          <Label>Filter by Phase</Label>
          <Select
            value={phaseFilter}
            onValueChange={(value) => setPhaseFilter(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="proposed">Proposed</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_process">In Process</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Completion Rates</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={filteredProjects}
                onClick={(data) => data && handleProjectClick(data.activePayload[0].payload)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completion" fill="#8884d8" name="Completion %" cursor="pointer" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects by Phase</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={phaseData}
                onClick={(data) => data && handlePhaseClick(data.activePayload[0].payload)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Number of Projects" cursor="pointer" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProject && !selectedProject.projects ? (
              <>
                <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                <p className="text-sm">Current Phase: {selectedProject.phase}</p>
                <p className="text-sm">Completion: {selectedProject.completion}%</p>
                <Button asChild className="w-full">
                  <Link to={`/project/${selectedProject.id}`}>View Project Details</Link>
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{selectedProject?.description}</p>
                {selectedProject?.projects?.map((project) => (
                  <Card key={project.id} className="p-4">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <Button asChild className="mt-2 w-full">
                      <Link to={`/project/${project.id}`}>View Project</Link>
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalyticsPage;
