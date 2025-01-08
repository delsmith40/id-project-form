import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "./types";

interface CapaSectionProps {
  setValue: UseFormSetValue<FormData>;
}

export function CapaSection({ setValue }: CapaSectionProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base">
        Is this request related to a CAPA? <span className="text-red-500">*</span>
      </Label>
      <div className="flex items-center space-x-2">
        <small className="text-sm text-muted-foreground">
          If yes, please email a copy of the report to Dacia Davis (dacia.davis@takeda.com)
        </small>
      </div>
      <RadioGroup
        onValueChange={(value) => setValue("isCapaRelated", value)}
        className="flex items-center space-x-4"
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
    </div>
  );
}