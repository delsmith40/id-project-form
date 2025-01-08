import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RequestDetailsDialogProps {
  request: any;
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit";
}

export function RequestDetailsDialog({
  request,
  isOpen,
  onClose,
  mode,
}: RequestDetailsDialogProps) {
  const [formData, setFormData] = useState(request);

  const handleSave = () => {
    const requests = JSON.parse(localStorage.getItem("instructionalRequests") || "[]");
    const index = requests.findIndex((r: any) => r.nameAndDepartment === request.nameAndDepartment);
    if (index !== -1) {
      requests[index] = formData;
      localStorage.setItem("instructionalRequests", JSON.stringify(requests));
    }
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" ? "Request Details" : "Edit Request"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name & Department</label>
            {mode === "view" ? (
              <p className="mt-1">{formData.nameAndDepartment}</p>
            ) : (
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={formData.nameAndDepartment}
                onChange={(e) =>
                  setFormData({ ...formData, nameAndDepartment: e.target.value })
                }
              />
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Topic</label>
            {mode === "view" ? (
              <p className="mt-1">{formData.topic}</p>
            ) : (
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Target Audience</label>
            {mode === "view" ? (
              <p className="mt-1">{formData.targetAudience}</p>
            ) : (
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
              />
            )}
          </div>
          <div>
            <label className="text-sm font-medium">CAPA Related</label>
            <p className="mt-1">{formData.isCapaRelated}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Completion Date</label>
            <p className="mt-1">
              {formData.completionDate
                ? new Date(formData.completionDate).toLocaleDateString()
                : "Not specified"}
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          {mode === "edit" && (
            <Button onClick={handleSave}>Save Changes</Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}