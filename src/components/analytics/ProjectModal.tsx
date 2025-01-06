import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedProject?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!selectedProject.projects ? (
            <>
              <p className="text-sm text-muted-foreground">
                {selectedProject.description}
              </p>
              <p className="text-sm">Current Phase: {selectedProject.phase}</p>
              <p className="text-sm">Completion: {selectedProject.completion}%</p>
              <Button asChild className="w-full">
                <Link to={`/analyze/${selectedProject.id}`}>
                  View Project Details
                </Link>
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {selectedProject?.description}
              </p>
              {selectedProject?.projects?.map((project: any) => (
                <Card key={project.id} className="p-4">
                  <h3 className="font-medium">{project.name}</h3>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}