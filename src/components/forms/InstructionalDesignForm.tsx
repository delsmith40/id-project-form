import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BasicInfoSection } from "./instructional/BasicInfoSection";
import { CapaSection } from "./instructional/CapaSection";
import { FormData } from "./instructional/types";

export function InstructionalDesignForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const [date, setDate] = useState<Date>();
  const sendEmailReceipt = watch("sendEmailReceipt");

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (data.sendEmailReceipt && !data.email) {
      toast({
        title: "Email Required",
        description: "Please provide an email address to receive the form receipt.",
        variant: "destructive",
      });
      return;
    }
    
    // Send email using default email client
    if (data.sendEmailReceipt && data.email) {
      const subject = encodeURIComponent("Instructional Design Request Form Submission");
      const body = encodeURIComponent(`
Name and Department: ${data.nameAndDepartment}
Topic: ${data.topic}
Target Audience: ${data.targetAudience}
CAPA Related: ${data.isCapaRelated}
Completion Date: ${data.completionDate ? format(data.completionDate, 'PPP') : 'Not specified'}
Subject Matter Expert: ${data.subjectMatterExpert}
Document Owner: ${data.documentOwner}
Technical Approver: ${data.technicalApprover}
      `);
      window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
    }

    toast({
      title: "Form Submitted",
      description: "Your request has been submitted successfully. We'll get back to you within 48 hours.",
    });
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">2025 Instructional Design Request Form</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Thank you for your interest in working with the Instructional Design team! To help us serve you better, please complete all fields in this form. Once submitted, a team member will review your request and get back to you within 48 hours.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection register={register} />
          <CapaSection setValue={setValue} />

          <div className="space-y-2">
            <Label className="text-base">
              What is the desired completion date? <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setValue("completionDate", newDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

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

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}