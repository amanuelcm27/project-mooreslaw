export const respondentTypeOptions = [
  "Individual developer",
  "AI startup / small team",
  "Established company",
  "Researcher",
  "University student",
  "University / research institution",
  "Other",
] as const;

export const workloadOptions = [
  "Running open-weight LLMs / AI inference",
  "Fine-tuning open-source models",
  "Training models from scratch",
  "Image generation",
  "Video generation",
  "Speech / audio AI",
  "Computer vision",
  "Scientific computing / simulation",
  "Other",
] as const;

export const vramOptions = [
  "8 GB VRAM or less",
  "8–16 GB VRAM",
  "16–24 GB VRAM",
  "24–48 GB VRAM",
  "48–80 GB VRAM",
  "More than 80 GB VRAM / multiple GPUs",
  "Not sure",
] as const;

export const frequencyOptions = [
  "One-time project",
  "A few hours per month",
  "Several times per month",
  "Several times per week",
  "Daily or near-continuous usage",
  "Not sure yet",
] as const;

export const providerOptions = [
  "Vast.ai",
  "RunPod",
  "AWS",
  "Google Cloud",
  "Microsoft Azure",
  "Lambda",
  "CoreWeave",
  "Another provider",
] as const;

export const noProviderOptions = [
  "International payment methods are difficult to access",
  "Too expensive",
  "Didn't know these services existed",
  "Setup is too complicated",
  "I haven't needed one yet",
  "Security or privacy concerns",
  "Other",
] as const;

export const currentComputeOptions = [
  "Use my own computer / GPU",
  "Use university or employer hardware",
  "Rent from an international GPU provider",
  "Use an AI API instead",
  "Borrow someone else's hardware",
  "Delay or abandon the project",
  "I haven't needed GPU compute yet",
  "Other",
] as const;

export const painPointOptions = [
  "Price",
  "International payments / access to USD",
  "GPU availability",
  "Not enough VRAM",
  "Complicated setup",
  "Reliability",
  "Performance",
  "Poor documentation",
  "Lack of support",
  "Unclear billing",
  "Data privacy / security",
  "None of these",
  "Other",
] as const;

export const monthlyGpuOptions = [
  "Less than 5 GPU-hours",
  "5–20 GPU-hours",
  "20–50 GPU-hours",
  "50–100 GPU-hours",
  "100–250 GPU-hours",
  "More than 250 GPU-hours",
  "I don't know yet",
] as const;

export const etbPaymentOptions = [
  "Yes, significantly",
  "Yes, somewhat",
  "No, it wouldn't change much",
  "Not sure",
] as const;

export const accessOptions = [
  "Direct GPU machine with SSH access",
  "A ready-to-use notebook / Jupyter environment",
  "A preconfigured environment for running or fine-tuning models",
  "An API endpoint for a model",
  "A platform that deploys my model for me",
  "Not sure — I want the simplest option",
] as const;

export const earlyAccessOptions = [
  "Yes — I have a real workload I want to run",
  "Yes — I'd like to experiment",
  "Maybe, depending on price and available GPUs",
  "Not right now",
] as const;

export const contactMethodOptions = [
  "Email",
  "Telegram",
  "Either email or Telegram",
  "Prefer to stay anonymous",
] as const;

export type RespondentType = (typeof respondentTypeOptions)[number] | null;
export type WorkloadNeed = (typeof workloadOptions)[number];
export type VramRequirement = (typeof vramOptions)[number] | null;
export type UsageFrequency = (typeof frequencyOptions)[number] | null;
export type HasUsedGpuCloud = "yes" | "no" | null;
export type PreferredContactMethod = (typeof contactMethodOptions)[number] | null;

export interface SurveyDraft {
  respondentType: RespondentType;
  otherRespondentType: string;
  workloads: WorkloadNeed[];
  otherWorkload: string;
  intendedModelOrProject: string;
  vramRequirement: VramRequirement;
  usageFrequency: UsageFrequency;
  hasUsedGpuCloud: HasUsedGpuCloud;
  providersUsed: string[];
  otherProviderUsed: string;
  reasonNeverUsed: string[];
  otherReasonNeverUsed: string;
  currentComputeMethod: string | null;
  otherCurrentComputeMethod: string;
  currentPainPoints: string[];
  otherPainPoint: string;
  monthlyGpuHours: string | null;
  etbPaymentValue: string | null;
  preferredAccessMethod: string | null;
  earlyAccessInterest: string | null;
  intendedWorkloadDetails: string;
  name: string;
  email: string;
  contactHandle: string;
  contactConsent: boolean;
  preferredContactMethod: PreferredContactMethod;
  source: string;
  campaign: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
}

export interface SurveySubmissionPayload {
  respondent_type: string | null;
  other_respondent_type: string | null;
  workloads: string[];
  other_workload: string | null;
  intended_model_or_project: string | null;
  vram_requirement: string | null;
  usage_frequency: string | null;
  has_used_gpu_cloud: HasUsedGpuCloud;
  providers_used: string[];
  other_provider_used: string | null;
  reason_never_used: string[];
  other_reason_never_used: string | null;
  current_compute_method: string | null;
  other_current_compute_method: string | null;
  current_pain_points: string[];
  other_pain_point: string | null;
  monthly_gpu_hours: string | null;
  etb_payment_value: string | null;
  preferred_access_method: string | null;
  early_access_interest: string | null;
  intended_workload_details: string | null;
  name: string | null;
  email: string | null;
  contact_handle: string | null;
  contact_method: PreferredContactMethod;
  contact_consent: boolean;
  source: string | null;
  campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
}

export interface SurveyAttribution {
  source: string | null;
  campaign: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
}

export interface SubmissionSuccess {
  ok: true;
  referenceId: string;
}

export interface SubmissionFailure {
  ok: false;
  message: string;
}

export type SubmissionResult = SubmissionSuccess | SubmissionFailure;

export const createEmptySurveyDraft = (): SurveyDraft => ({
  respondentType: null,
  otherRespondentType: "",
  workloads: [],
  otherWorkload: "",
  intendedModelOrProject: "",
  vramRequirement: null,
  usageFrequency: null,
  hasUsedGpuCloud: null,
  providersUsed: [],
  otherProviderUsed: "",
  reasonNeverUsed: [],
  otherReasonNeverUsed: "",
  currentComputeMethod: null,
  otherCurrentComputeMethod: "",
  currentPainPoints: [],
  otherPainPoint: "",
  monthlyGpuHours: null,
  etbPaymentValue: null,
  preferredAccessMethod: null,
  earlyAccessInterest: null,
  intendedWorkloadDetails: "",
  name: "",
  email: "",
  contactHandle: "",
  contactConsent: false,
  preferredContactMethod: "Email",
  source: "",
  campaign: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
});