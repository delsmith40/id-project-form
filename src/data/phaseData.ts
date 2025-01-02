interface QuestionSection {
  title: string;
  questions: { id: string; text: string }[];
  details?: string;
  timeline?: string;
}

export const analyzePhaseData: QuestionSection[] = [
  {
    title: "Identify Stakeholders",
    questions: [
      { id: "sponsors", text: "Who are the project sponsors?" },
      { id: "beneficiaries", text: "Who will benefit from the instructional program?" },
      { id: "approvers", text: "Who will approve the final product?" },
      { id: "businessNeed", text: "What is the primary business need or problem this training aims to address?" },
      { id: "alignment", text: "How does this project align with our organizational goals and strategy?" },
      { id: "outcomes", text: "What are the specific, measurable outcomes you expect from this training?" },
      { id: "deadlines", text: "Are there any critical deadlines or timelines we must adhere to?" },
    ],
    details: "Meet with stakeholders to understand their needs, expectations, and constraints.",
  },
  {
    title: "Define Goals",
    questions: [
      { id: "objectives", text: "What are the learning objectives?" },
      { id: "skills", text: "What specific skills or knowledge should learners gain?" },
      { id: "metrics", text: "Are there any specific performance metrics we aim to improve?" },
      { id: "shortLongObjectives", text: "What are the short-term and long-term objectives?" },
      { id: "successMeasures", text: "How will success be measured?" },
    ],
    details: "Develop a clear, concise statement of the learning objectives.",
  },
  {
    title: "Assess Needs",
    questions: [
      { id: "lackingSkills", text: "What skills or knowledge are currently lacking?" },
      { id: "availableResources", text: "What resources are available?" },
      { id: "gaps", text: "What are the gaps in knowledge or skills?" },
      { id: "previousTraining", text: "What previous training or instruction have the learners received?" },
      { id: "criticalTasks", text: "What critical tasks do learners need to perform?" },
      { id: "barriers", text: "What are the barriers to learning or performance?" },
      { id: "compliance", text: "Are there any legal or compliance requirements to consider?" },
    ],
    details: "Conduct surveys, interviews, and focus groups with the target audience.",
    timeline: "1-2 weeks for meetings, data collection, and analysis.",
  },
  {
    title: "Risk Assessment",
    questions: [
      { id: "majorRisks", text: "What are the major risks?" },
      { id: "mitigation", text: "How can we mitigate them?" },
    ],
    details: "Develop a risk management plan.",
  },
];

export const designPhaseData: QuestionSection[] = [
  {
    title: "Develop a Framework",
    questions: [
      { id: "topics", text: "What are the main topics and subtopics?" },
      { id: "structure", text: "What is the course structure?" },
      { id: "organization", text: "How will the content be organized and presented?" },
      { id: "timeline", text: "What is the timeline for the course development and delivery?" },
      { id: "strategies", text: "What instructional strategies will be most effective?" },
      { id: "materials", text: "What materials and resources are needed?" },
      { id: "sequence", text: "How will the content be sequenced and structured?" },
    ],
    details: "Create a detailed course outline and storyboard.",
  },
  {
    title: "Select Delivery Methods",
    questions: [
      { id: "deliveryMode", text: "Will the course be delivered online, in-person, or hybrid?" },
      { id: "technologies", text: "What technologies will be used?" },
      { id: "accessibility", text: "How will accessibility and inclusivity be ensured?" },
      { id: "preferredFormats", text: "Are there any preferred formats or delivery methods?" },
      { id: "backupPlans", text: "What are the backup plans for technical issues?" },
    ],
    details: "Choose the appropriate delivery methods and technologies.",
  },
  {
    title: "Create Assessments",
    questions: [
      { id: "assessmentTypes", text: "What types of assessments will be used (quizzes, projects, exams)?" },
      { id: "alignment", text: "How will assessments be aligned with learning objectives?" },
      { id: "formativeSummative", text: "What types of assessments will be used (formative, summative)?" },
      { id: "feedback", text: "How will feedback be provided to learners?" },
    ],
    details: "Design quizzes, tests, projects, and other assessment tools.",
    timeline: "2-4 weeks for developing the framework, choosing delivery methods, and creating assessments.",
  },
  {
    title: "Compliance Requirements",
    questions: [
      { id: "compliance", text: "Are there any compliance requirements we need to consider?" },
    ],
    details: "Review relevant regulations and standards.",
  },
];

export const developPhaseData: QuestionSection[] = [
  {
    title: "Create Materials",
    questions: [
      { id: "contentTypes", text: "What types of content will be created (videos, articles, interactive modules)?" },
      { id: "developers", text: "Who will develop each piece of content?" },
      { id: "engagement", text: "Are the materials engaging and accessible to all learners?" },
      { id: "alignment", text: "Does the content align with the learning objectives?" },
      { id: "supplementaryResources", text: "Are there supplementary resources like reading materials or videos?" },
      { id: "multimediaIntegration", text: "How will multimedia elements be integrated effectively?" },
    ],
    details: "Write scripts, create multimedia, and develop interactive activities.",
    timeline: "4-6 weeks for content creation, pilot testing, and revisions.",
  },
  {
    title: "Pilot Testing",
    questions: [
      { id: "participants", text: "Who will participate in the pilot test?" },
      { id: "feedback", text: "What feedback will be gathered?" },
      { id: "diversity", text: "How diverse is the pilot group to ensure varied feedback?" },
      { id: "testingAspects", text: "What specific aspects of the content are being tested?" },
    ],
    details: "Conduct pilot tests with a small group of learners and collect feedback.",
  },
  {
    title: "Revise Content",
    questions: [
      { id: "changesNeeded", text: "What changes are needed based on feedback?" },
      { id: "documentation", text: "How will revisions be documented and communicated to the team?" },
      { id: "alignmentRevisions", text: "How will we ensure that revisions align with the overall goals?" },
      { id: "feedbackIncorporation", text: "What feedback have you received, and how can it be incorporated?" },
    ],
    details: "Make necessary adjustments to content and materials.",
  },
  {
    title: "Branding and Consistency",
    questions: [
      { id: "branding", text: "How can we ensure all content is on-brand?" },
    ],
    details: "Create a style guide and review content for consistency.",
  },
];

export const implementPhaseData: QuestionSection[] = [
  {
    title: "Deliver Training",
    questions: [
      { id: "enrollment", text: "How will learners be enrolled?" },
      { id: "deliverySchedule", text: "What is the delivery schedule?" },
      { id: "preparedInstructors", text: "Are instructors/facilitators prepared to deliver the content effectively?" },
      { id: "alignmentMonitoring", text: "How will we ensure alignment between content and learning objectives?" },
      { id: "monitoringProgress", text: "How will we monitor learner progress and engagement?" },
      { id: "trackingCriteria", text: "How will learner progress be tracked and reported?" },
      { id: "completionCriteria", text: "What are the criteria for successful course completion?" },
    ],
    details: "Launch the course and monitor initial delivery.",
  },
  {
    title: "Provide Support",
    questions: [
      { id: "supportResources", text: "What support resources will be available (FAQs, helpdesk)?" },
      { id: "technicalIssues", text: "How will technical issues be addressed?" },
      { id: "diverseNeeds", text: "How will we address diverse learning needs and styles?" },
      { id: "technicalSupport", text: "What technical support is available for learners?" },
      { id: "issueResolution", text: "What is the process for resolving issues quickly?" },
    ],
    details: "Set up support channels and resources.",
    timeline: "2-4 weeks for course launch and support setup.",
  },
  {
    title: "Marketing and Communication Plan",
    questions: [
      { id: "communication", text: "How will we inform and engage potential learners about the course?" },
    ],
    details: "Create promotional materials and a communication strategy.",
  },
];

export const evaluatePhaseData: QuestionSection[] = [
  {
    title: "Gather Data",
    questions: [
      { id: "feedbackMethods", text: "What methods will be used to collect feedback (surveys, focus groups)?" },
      { id: "metrics", text: "What metrics will be tracked?" },
      { id: "frequency", text: "How frequently should progress updates and reviews be conducted?" },
      { id: "effectiveness", text: "What data is showing about the effectiveness of the instruction?" },
      { id: "engagementSatisfaction", text: "How will learner engagement and satisfaction be measured?" },
    ],
    details: "Collect and analyze feedback from learners and instructors.",
  },
  {
    title: "Analyze Outcomes",
    questions: [
      { id: "achievement", text: "Did the learners achieve the learning objectives?" },
      { id: "improvements", text: "What improvements are needed?" },
      { id: "satisfaction", text: "How satisfied are learners and stakeholders with the course?" },
      { id: "KPIs", text: "What are the key performance indicators (KPIs) for the course?" },
      { id: "successDefinition", text: "How will success be defined and measured?" },
    ],
    details: "Evaluate the effectiveness of the course and identify areas for improvement.",
  },
  {
    title: "Make Revisions",
    questions: [
      { id: "specificChanges", text: "What specific changes will be made?" },
      { id: "communication", text: "How will revisions be communicated to stakeholders?" },
      { id: "ongoingFeedback", text: "How will ongoing feedback be collected and integrated?" },
      { id: "futureImprovements", text: "What improvements can be made for future iterations?" },
      { id: "reviewFrequency", text: "How often will the course be reviewed and updated?" },
    ],
    details: "Implement necessary changes based on evaluation results.",
    timeline: "2-4 weeks for data collection, analysis, and making revisions.",
  },
  {
    title: "Continuous Improvement Plan",
    questions: [
      { id: "gatheringFeedback", text: "How will we continue to gather feedback and make improvements?" },
    ],
    details: "Schedule regular reviews and updates.",
  },
];

export const documentPhaseData: QuestionSection[] = [
  {
    title: "Document Process",
    questions: [
      { id: "documentationRequirements", text: "What documentation is required (reports, manuals)?" },
      { id: "storage", text: "How will documentation be stored and shared?" },
      { id: "accessibility", text: "How will project documentation be stored and accessed?" },
    ],
    details: "Compile project documentation and ensure accessibility.",
    timeline: "1-2 weeks for documentation and reflection.",
  },
  {
    title: "Reflect on Learnings",
    questions: [
      { id: "successesChallenges", text: "What were the key successes and challenges?" },
      { id: "processImprovement", text: "How can the process be improved?" },
      { id: "biggestChallenges", text: "What were the biggest challenges and how were they overcome?" },
      { id: "teamPerformance", text: "How can the team's performance be improved for future projects?" },
      { id: "lessonsLearned", text: "What lessons have you learned from this project?" },
      { id: "celebration", text: "How will we celebrate successes and recognize team contributions?" },
    ],
    details: "Conduct a project debrief and gather insights for future projects.",
  },
  {
    title: "Knowledge Transfer",
    questions: [
      { id: "knowledgeSharing", text: "How can we ensure the knowledge gained is shared and retained?" },
    ],
    details: "Create detailed project documentation and conduct knowledge-sharing sessions.",
  },
];

export const phaseOrder = ["analyze", "design", "develop", "implement", "evaluate", "document"];

export type PhaseData = typeof analyzePhaseData;
