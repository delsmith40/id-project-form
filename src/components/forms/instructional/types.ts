export interface FormData {
  nameAndDepartment: string;
  topic: string;
  targetAudience: string;
  isCapaRelated: string;
  completionDate: Date | undefined;
  subjectMatterExpert: string;
  documentOwner: string;
  technicalApprover: string;
  sendEmailReceipt: boolean;
  email?: string;
}