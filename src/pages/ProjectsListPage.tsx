import { ProjectSection } from "@/components/index/ProjectSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProjectsListPage = () => {
  // Get projects from localStorage
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");
  const instructionalRequests = JSON.parse(localStorage.getItem("instructionalRequests") || "[]");

  // Group projects by status
  const proposedProjects = projects.filter((p: any) => p.status === "proposed");
  const inProgressProjects = projects.filter((p: any) => p.status === "in_progress");
  const completedProjects = projects.filter((p: any) => p.status === "completed");

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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
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