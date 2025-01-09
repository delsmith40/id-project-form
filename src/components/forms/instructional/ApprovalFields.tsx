import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";

interface ApprovalFieldsProps {
  register: UseFormRegister<FormData>;
}

export function ApprovalFields({ register }: ApprovalFieldsProps) {
  return (
    <>
      <div>
        <Label htmlFor="subjectMatterExpert" className="text-base">
          Please provide the name of the person that will serve as the subject matter expert
        </Label>
        <Input
          id="subjectMatterExpert"
          {...register("subjectMatterExpert")}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="documentOwner" className="text-base">
          Please provide the name of the person that will serve as the Document Owner
        </Label>
        <Input
          id="documentOwner"
          {...register("documentOwner")}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="technicalApprover" className="text-base">
          Please provide the name of the person that will serve as the Technical Approver
        </Label>
        <Input
          id="technicalApprover"
          {...register("technicalApprover")}
          className="mt-1.5"
        />
      </div>
    </>
  );
}