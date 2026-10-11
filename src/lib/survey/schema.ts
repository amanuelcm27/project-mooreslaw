import { z } from "zod";
import type { SurveyAttribution, SurveyDraft, SurveySubmissionPayload } from "./types";

const nullableText = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : null))
  .nullable();

export const surveySubmissionSchema = z.object({
  respondent_type: nullableText,
  other_respondent_type: nullableText,
  workloads: z.array(z.string().min(1)).min(1),
  other_workload: nullableText,
  intended_model_or_project: nullableText,
  vram_requirement: nullableText,
  usage_frequency: nullableText,
  has_used_gpu_cloud: z.enum(["yes", "no"]),
  providers_used: z.array(z.string().min(1)),
  other_provider_used: nullableText,
  reason_never_used: z.array(z.string().min(1)),
  other_reason_never_used: nullableText,
  current_compute_method: nullableText,
  other_current_compute_method: nullableText,
  current_pain_points: z.array(z.string().min(1)).min(1),
  other_pain_point: nullableText,
  monthly_gpu_hours: nullableText,
  etb_payment_value: nullableText,
  preferred_access_method: nullableText,
  early_access_interest: nullableText,
  intended_workload_details: nullableText,
  name: nullableText,
  email: nullableText,
  contact_handle: nullableText,
  contact_method: z
    .enum(["Email", "Telegram", "Either email or Telegram", "Prefer to stay anonymous"])
    .nullable(),
  contact_consent: z.boolean(),
  source: nullableText,
  campaign: nullableText,
  utm_source: nullableText,
  utm_medium: nullableText,
  utm_campaign: nullableText,
  utm_content: nullableText,
});

export function buildSubmissionPayload(
  draft: SurveyDraft,
  attribution: SurveyAttribution,
): SurveySubmissionPayload {
  return {
    respondent_type: draft.respondentType,
    other_respondent_type: draft.otherRespondentType.trim() || null,
    workloads: draft.workloads,
    other_workload: draft.otherWorkload.trim() || null,
    intended_model_or_project: draft.intendedModelOrProject.trim() || null,
    vram_requirement: draft.vramRequirement,
    usage_frequency: draft.usageFrequency,
    has_used_gpu_cloud: draft.hasUsedGpuCloud ?? "no",
    providers_used: draft.providersUsed,
    other_provider_used: draft.otherProviderUsed.trim() || null,
    reason_never_used: draft.reasonNeverUsed,
    other_reason_never_used: draft.otherReasonNeverUsed.trim() || null,
    current_compute_method: draft.currentComputeMethod,
    other_current_compute_method: draft.otherCurrentComputeMethod.trim() || null,
    current_pain_points: draft.currentPainPoints,
    other_pain_point: draft.otherPainPoint.trim() || null,
    monthly_gpu_hours: draft.monthlyGpuHours,
    etb_payment_value: draft.etbPaymentValue,
    preferred_access_method: draft.preferredAccessMethod,
    early_access_interest: draft.earlyAccessInterest,
    intended_workload_details: draft.intendedWorkloadDetails.trim() || null,
    name: draft.name.trim() || null,
    email: draft.email.trim() || null,
    contact_handle: draft.contactHandle.trim() || null,
    contact_method: draft.preferredContactMethod,
    contact_consent: draft.contactConsent,
    source: attribution.source,
    campaign: attribution.campaign,
    utm_source: attribution.utmSource,
    utm_medium: attribution.utmMedium,
    utm_campaign: attribution.utmCampaign,
    utm_content: attribution.utmContent,
  };
}