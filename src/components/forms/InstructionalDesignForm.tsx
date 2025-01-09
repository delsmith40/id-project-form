import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { BasicInfoSection } from "./instructional/BasicInfoSection";
import { CapaSection } from "./instructional/CapaSection";
import { CompletionDatePicker } from "./instructional/CompletionDatePicker";
import { ApprovalFields } from "./instructional/ApprovalFields";
import { EmailReceiptSection } from "./instructional/EmailReceiptSection";
import { FormData } from "./instructional/types";

export function InstructionalDesignForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const sendEmailReceipt = watch("sendEmailReceipt");

  const sendEmail = async (data: FormData) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email,
          subject: 'Instructional Design Request Form Submission',
          text: `
            Name and Department: ${data.nameAndDepartment}
            Topic: ${data.topic}
            Target Audience: ${data.targetAudience}
            CAPA Related: ${data.isCapaRelated}
            Completion Date: ${data.completionDate ? format(new Date(data.completionDate), 'PPP') : 'Not specified'}
            Subject Matter Expert: ${data.subjectMatterExpert}
            Document Owner: ${data.documentOwner}
            Technical Approver: ${data.technicalApprover}
          `
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      toast({
        title: "Email Sent",
        description: "Form receipt has been sent to your email.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Email Error",
        description: "Failed to send email receipt. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.sendEmailReceipt && !data.email) {
      toast({
        title: "Email Required",
        description: "Please provide an email address to receive the form receipt.",
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem("instructionalRequests") || "[]");
    localStorage.setItem("instructionalRequests", JSON.stringify([...existingRequests, data]));
    
    if (data.sendEmailReceipt && data.email) {
      await sendEmail(data);
    }

    toast({
      title: "Form Submitted",
      description: "Your request has been submitted successfully. We'll get back to you within 48 hours.",
    });
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Instructional Design Request Form</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Thank you for your interest in working with the Instructional Design team! To help us serve you better, please complete all fields in this form. Once submitted, a team member will review your request and get back to you within 48 hours.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection register={register} />
          <CapaSection setValue={setValue} />
          <CompletionDatePicker setValue={setValue} />
          <ApprovalFields register={register} />
          <EmailReceiptSection
            register={register}
            setValue={setValue}
            sendEmailReceipt={sendEmailReceipt}
            errors={errors}
          />

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