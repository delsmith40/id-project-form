import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" ? "Request Details" : "Edit Request"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Name & Department</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.nameAndDepartment}</p>
            ) : (
              <Input
                type="text"
                className="w-full mt-1.5"
                value={formData.nameAndDepartment}
                onChange={(e) =>
                  setFormData({ ...formData, nameAndDepartment: e.target.value })
                }
              />
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">Topic</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.topic}</p>
            ) : (
              <Input
                type="text"
                className="w-full mt-1.5"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">Target Audience</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.targetAudience}</p>
            ) : (
              <Input
                type="text"
                className="w-full mt-1.5"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
              />
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">CAPA Related</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.isCapaRelated}</p>
            ) : (
              <RadioGroup
                value={formData.isCapaRelated}
                onValueChange={(value) =>
                  setFormData({ ...formData, isCapaRelated: value })
                }
                className="flex items-center space-x-4 mt-1.5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="capaYes" />
                  <Label htmlFor="capaYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="capaNo" />
                  <Label htmlFor="capaNo">No</Label>
                </div>
              </RadioGroup>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">Completion Date</Label>
            {mode === "view" ? (
              <p className="mt-1">
                {formData.completionDate
                  ? new Date(formData.completionDate).toLocaleDateString()
                  : "Not specified"}
              </p>
            ) : (
              <Input
                type="date"
                className="w-full mt-1.5"
                value={formData.completionDate ? new Date(formData.completionDate).toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  setFormData({ ...formData, completionDate: new Date(e.target.value) })
                }
              />
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">Subject Matter Expert</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.subjectMatterExpert || "Not specified"}</p>
            ) : (
              <Input
                type="text"
                className="w-full mt-1.5"
                value={formData.subjectMatterExpert || ""}
                onChange={(e) =>
                  setFormData({ ...formData, subjectMatterExpert: e.target.value })
                }
              />
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">Document Owner</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.documentOwner || "Not specified"}</p>
            ) : (
              <Input
                type="text"
                className="w-full mt-1.5"
                value={formData.documentOwner || ""}
                onChange={(e) =>
                  setFormData({ ...formData, documentOwner: e.target.value })
                }
              />
            )}
          </div>

          <div>
            <Label className="text-sm font-medium">Technical Approver</Label>
            {mode === "view" ? (
              <p className="mt-1">{formData.technicalApprover || "Not specified"}</p>
            ) : (
              <Input
                type="text"
                className="w-full mt-1.5"
                value={formData.technicalApprover || ""}
                onChange={(e) =>
                  setFormData({ ...formData, technicalApprover: e.target.value })
                }
              />
            )}
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