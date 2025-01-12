import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ProjectForm } from "../ProjectForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProject: any;
}

export function ProjectModal({
  isOpen,
  onOpenChange,
  selectedProject,
}: ProjectModalProps) {
  if (!selectedProject) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{selectedProject?.name || selectedProject?.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(90vh-80px)] px-6">
          {!selectedProject.projects ? (
            <ProjectForm phase={selectedProject.phase || "proposed"} />
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Projects in {selectedProject?.name}
              </p>
              {selectedProject?.projects?.map((project: any) => (
                <Card key={project.id} className="p-4">
                  <h3 className="font-medium">{project.name || project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <Button asChild className="mt-2 w-full">
                    <Link to={`/analyze/${project.id}`}>View Project</Link>
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}