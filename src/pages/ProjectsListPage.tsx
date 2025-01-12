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
import { useState } from "react";

const ProjectsListPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "edit">("view");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get and format projects from localStorage
  const rawProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  const projects = rawProjects.map((project: any) => ({
    id: project.id,
    title: project.title,
    teamMember: project.teamMember,
    date: new Date(project.date).toLocaleDateString(),
    progress: project.progress || "0%",
    completedDate: project.completedDate ? new Date(project.completedDate).toLocaleDateString() : undefined,
    status: project.status || "proposed"
  }));

  const instructionalRequests = JSON.parse(localStorage.getItem("instructionalRequests") || "[]");
  const { toast } = useToast();

  // Group projects by status
  const groupedProjects = projects.reduce((acc: any, project: any) => {
    const status = project.status || 'other';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(project);
    return acc;
  }, {});

  const handleDelete = (index: number) => {
    const updatedRequests = [...instructionalRequests];
    updatedRequests.splice(index, 1);
    localStorage.setItem("instructionalRequests", JSON.stringify(updatedRequests));
    toast({
      title: "Request Deleted",
      description: "The instructional design request has been deleted.",
    });
    window.location.reload();
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
      
      {/* Display projects grouped by status */}
      {Object.entries(groupedProjects).map(([status, projectsList]: [string, any]) => (
        <ProjectSection 
          key={status}
          title={`${status.charAt(0).toUpperCase() + status.slice(1)} Projects`}
          projects={projectsList}
          showProgress={status === "in_progress"}
          showCompletedDate={status === "completed"}
        />
      ))}

      {projects.length === 0 && instructionalRequests.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">No projects or requests found</h2>
          <p className="text-gray-500 mt-2">Start by creating a new project or submitting a request</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsListPage;