import { useState } from "react";
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

  // Sample data - in a real app, this would come from your database
  const proposedProjects = [
    { id: 1, title: "New Training Module", teamMember: "John Doe", date: "2024-04-01" },
    { id: 2, title: "Employee Onboarding", teamMember: "Jane Smith", date: "2024-04-15" },
  ];

  const currentProjects = [
    { id: 3, title: "Sales Training", teamMember: "Mike Johnson", date: "2024-03-01", progress: "45%" },
    { id: 4, title: "Leadership Development", teamMember: "Sarah Wilson", date: "2024-02-15", progress: "70%" },
  ];

  const completedProjects = [
    { id: 5, title: "Customer Service Training", teamMember: "Tom Brown", date: "2024-01-15", completedDate: "2024-03-15" },
    { id: 6, title: "Safety Protocols", teamMember: "Lisa Davis", date: "2024-01-01", completedDate: "2024-02-28" },
  ];

  const handleNewProject = () => {
    navigate("/analyze");
    localStorage.clear(); // Clear any existing project data
  };

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