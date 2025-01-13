import { ProjectSection } from "@/components/index/ProjectSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { RequestDetailsDialog } from "@/components/forms/RequestDetailsDialog";
import { useState, useEffect } from "react";

const ProjectsListPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "edit">("view");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectsByPhase, setProjectsByPhase] = useState<Record<string, any[]>>({});
  const [instructionalRequests, setInstructionalRequests] = useState<any[]>([]);
  const { toast } = useToast();

  // Define the phases according to our database schema
  const phases = ['analyze', 'design', 'develop', 'implement', 'evaluate', 'document'];

  useEffect(() => {
    try {
      // Load projects from localStorage
      const rawProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const projectForms = JSON.parse(localStorage.getItem("projectForm") || "[]");
      
      // Combine projects with their form data
      const projectsWithForms = rawProjects.map((project: any) => {
        const formData = Array.isArray(projectForms) 
          ? projectForms.find((form: any) => form.projectName === project.title)
          : projectForms.projectName === project.title ? projectForms : null;
        
        return {
          ...project,
          formData
        };
      });
      
      // Group projects by phase
      const grouped = phases.reduce((acc: Record<string, any[]>, phase) => {
        acc[phase] = projectsWithForms.filter((project: any) => {
          const projectPhases = project.phases || [];
          const isInPhase = projectPhases.some((p: any) => p.phase_name === phase);
          const hasPhaseForm = project.formData && project.formData[phase];
          return isInPhase || hasPhaseForm;
        }).map((project: any) => ({
          id: project.id,
          title: project.title,
          teamMember: project.teamMember || 'Unassigned',
          date: new Date(project.date).toLocaleDateString(),
          progress: project.progress || "0%",
          status: project.status || "not_started",
          formData: project.formData
        }));
        return acc;
      }, {});

      setProjectsByPhase(grouped);
      
      // Load instructional design requests
      const savedRequests = JSON.parse(localStorage.getItem("instructionalRequests") || "[]");
      setInstructionalRequests(savedRequests);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleDelete = (index: number) => {
    const updatedRequests = [...instructionalRequests];
    updatedRequests.splice(index, 1);
    localStorage.setItem("instructionalRequests", JSON.stringify(updatedRequests));
    setInstructionalRequests(updatedRequests);
    toast({
      title: "Request Deleted",
      description: "The instructional design request has been deleted.",
    });
  };

  const handleEdit = (request: any) => {
    setSelectedRequest(request);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleView = (request: any) => {
    setSelectedRequest(request);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {instructionalRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Instructional Design Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name & Department</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Target Audience</TableHead>
                  <TableHead>CAPA Related</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructionalRequests.map((request: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{request.nameAndDepartment}</TableCell>
                    <TableCell>{request.topic}</TableCell>
                    <TableCell>{request.targetAudience}</TableCell>
                    <TableCell>{request.isCapaRelated}</TableCell>
                    <TableCell>
                      {request.completionDate ? new Date(request.completionDate).toLocaleDateString() : 'Not specified'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(request)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(request)}>
                            Edit Request
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(index)}
                          >
                            Delete Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedRequest && (
        <RequestDetailsDialog
          request={selectedRequest}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          mode={dialogMode}
        />
      )}
      
      {/* Display projects grouped by phase */}
      {phases.map((phase) => (
        <ProjectSection 
          key={phase}
          title={`${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase Projects`}
          projects={projectsByPhase[phase] || []}
          showProgress={true}
        />
      ))}

      {Object.values(projectsByPhase).every(projects => projects.length === 0) && 
       instructionalRequests.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">No projects or requests found</h2>
          <p className="text-gray-500 mt-2">Start by creating a new project or submitting a request</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsListPage;