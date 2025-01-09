import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "./types";

interface EmailReceiptSectionProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  sendEmailReceipt: boolean;
  errors: any;
}

export function EmailReceiptSection({ 
  register, 
  setValue, 
  sendEmailReceipt, 
  errors 
}: EmailReceiptSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="sendEmailReceipt"
          onCheckedChange={(checked) => {
            setValue("sendEmailReceipt", checked as boolean);
          }}
        />
        <Label htmlFor="sendEmailReceipt" className="text-base">
          Send me an email receipt of my responses
        </Label>
      </div>

      {sendEmailReceipt && (
        <div>
          <Label htmlFor="email" className="text-base">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: sendEmailReceipt,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="mt-1.5"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message || "Email is required"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}