import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FilePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Index = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // In a real implementation, this would be an API call to your backend
    // For now, we'll fetch from localStorage as a temporary solution
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      setProjects(parsedProjects);
    }
  }, []);

  const handleNewProject = () => {
    navigate("/analyze");
    localStorage.clear(); // Clear any existing project data
  };

  // Filter projects based on their status
  const proposedProjects = projects.filter(project => project.status === 'proposed');
  const currentProjects = projects.filter(project => project.status === 'in_progress');
  const completedProjects = projects.filter(project => project.status === 'completed');

  const ProjectTable = ({ projects, showProgress = false, showCompletedDate = false }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Title</TableHead>
          <TableHead>Team Member</TableHead>
          <TableHead>Start Date</TableHead>
          {showProgress && <TableHead>Progress</TableHead>}
          {showCompletedDate && <TableHead>Completion Date</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>{project.teamMember}</TableCell>
            <TableCell>{project.date}</TableCell>
            {showProgress && <TableCell>{project.progress}</TableCell>}
            {showCompletedDate && <TableCell>{project.completedDate}</TableCell>}
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => navigate(`/project/${project.id}`)}>
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center mb-12">
          <Button
            onClick={handleNewProject}
            size="lg"
            className="mb-8 text-xl py-8 px-12 shadow-lg hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <FilePlus className="mr-2 h-6 w-6" />
            Start New Project
          </Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Proposed Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectTable projects={proposedProjects} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectTable projects={currentProjects} showProgress />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectTable projects={completedProjects} showCompletedDate />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;