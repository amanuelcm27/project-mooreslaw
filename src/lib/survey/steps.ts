import type { SurveyDraft } from "./types";

export type SurveyStepKey =
  | "respondentType"
  | "workloads"
  | "intendedModel"
  | "vram"
  | "frequency"
  | "gpuCloudUsage"
  | "providersUsed"
  | "reasonNeverUsed"
  | "currentCompute"
  | "painPoints"
  | "monthlyHours"
  | "etbPayment"
  | "preferredAccess"
  | "earlyAccess"
  | "workloadDetails"
  | "contactDetails"
  | "review";

export interface SurveyStepDefinition {
  key: SurveyStepKey;
  title: string;
  helperText?: string;
}

export function buildSurveySteps(draft: SurveyDraft): SurveyStepDefinition[] {
  return [
    { key: "respondentType", title: "What best describes you?" },
    { key: "workloads", title: "What do you need GPU compute for?" },
    {
      key: "intendedModel",
      title: "What would you actually run?",
      helperText: "Specific examples help us understand the hardware and software you may need.",
    },
    { key: "vram", title: "What GPU memory do you think you need?" },
    { key: "frequency", title: "How often would you need GPU compute?" },
    { key: "gpuCloudUsage", title: "Have you used a GPU cloud provider before?" },
    ...(draft.hasUsedGpuCloud === "yes"
      ? [{ key: "providersUsed" as const, title: "Which providers have you used?" }]
      : draft.hasUsedGpuCloud === "no"
        ? [{ key: "reasonNeverUsed" as const, title: "Why have you not used one?" }]
        : []),
    { key: "currentCompute", title: "What do you do when you need more GPU compute today?" },
    { key: "painPoints", title: "What is the biggest problem with your current solution?" },
    { key: "monthlyHours", title: "How much GPU compute would you need in a typical month?" },
    { key: "etbPayment", title: "Would local payment in Ethiopian birr make GPU access easier for you?" },
    { key: "preferredAccess", title: "What kind of access would you prefer?" },
    { key: "earlyAccess", title: "Would you test an early version?" },
    { key: "workloadDetails", title: "Tell us about your intended workload." },
    { key: "contactDetails", title: "Optional contact details" },
    { key: "review", title: "You're helping shape what we build." },
  ];
}