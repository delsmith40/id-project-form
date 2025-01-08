import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "./types";

interface BasicInfoSectionProps {
  register: UseFormRegister<FormData>;
}

export function BasicInfoSection({ register }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nameAndDepartment" className="text-base">
          Name and Department <span className="text-red-500">*</span>
        </Label>
        <Input
          id="nameAndDepartment"
          {...register("nameAndDepartment", { required: true })}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="topic" className="text-base">
          What is the topic or subject matter? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="topic"
          {...register("topic", { required: true })}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="targetAudience" className="text-base">
          Who is the target audience? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="targetAudience"
          {...register("targetAudience", { required: true })}
          placeholder="production staff, management, maintenance technicians, etc."
          className="mt-1.5"
        />
      </div>
    </div>
  );
}