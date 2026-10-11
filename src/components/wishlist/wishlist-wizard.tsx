"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Edit3, Info, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import {
  accessOptions,
  contactMethodOptions,
  createEmptySurveyDraft,
  currentComputeOptions,
  earlyAccessOptions,
  etbPaymentOptions,
  frequencyOptions,
  monthlyGpuOptions,
  noProviderOptions,
  painPointOptions,
  providerOptions,
  respondentTypeOptions,
  type SurveyAttribution,
  type SurveyDraft,
  type SubmissionResult,
  vramOptions,
  workloadOptions,
} from "@/lib/survey/types";
import { buildSurveySteps, type SurveyStepKey } from "@/lib/survey/steps";
import { submitWishlistApplication } from "@/lib/submission/adapter";

interface FieldButtonProps {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

function FieldButton({ selected, children, onClick, className }: FieldButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-4 py-4 text-left text-sm transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        selected
          ? "border-[color:var(--primary)] bg-[rgba(245,230,66,0.12)] text-[color:var(--foreground)] shadow-[0_0_0_1px_rgba(245,230,66,0.18)]"
          : "border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] text-[color:var(--foreground)]/90 hover:border-[color:var(--primary)]/36 hover:bg-white/5",
        className,
      )}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">{children}</p>;
}

function getAttribution(searchParams: Pick<URLSearchParams, "get">): SurveyAttribution {
  const source = searchParams.get("source") ?? searchParams.get("utm_source");
  const campaign = searchParams.get("campaign") ?? searchParams.get("utm_campaign");

  return {
    source,
    campaign,
    utmSource: searchParams.get("utm_source"),
    utmMedium: searchParams.get("utm_medium"),
    utmCampaign: searchParams.get("utm_campaign"),
    utmContent: searchParams.get("utm_content"),
  };
}

function isOtherSelected(values: string[], otherValue?: string) {
  return values.includes("Other") || values.includes("Another provider") || Boolean(otherValue?.trim());
}

function validateStep(stepKey: SurveyStepKey, draft: SurveyDraft): string | null {
  switch (stepKey) {
    case "respondentType":
      return draft.respondentType ? null : "Select the option that best describes you.";
    case "workloads":
      return draft.workloads.length > 0 ? null : "Select at least one workload.";
    case "intendedModel":
      return null;
    case "vram":
      return draft.vramRequirement ? null : "Choose the closest VRAM estimate or 'Not sure'.";
    case "frequency":
      return draft.usageFrequency ? null : "Choose how often you expect to use GPU compute.";
    case "gpuCloudUsage":
      return draft.hasUsedGpuCloud ? null : "Tell us whether you have used a GPU cloud provider before.";
    case "providersUsed":
      return draft.providersUsed.length > 0 || draft.otherProviderUsed.trim().length > 0
        ? null
        : "Select at least one provider or add another provider.";
    case "reasonNeverUsed":
      return draft.reasonNeverUsed.length > 0 || draft.otherReasonNeverUsed.trim().length > 0
        ? null
        : "Select at least one reason or add another reason.";
    case "currentCompute":
      return draft.currentComputeMethod ? null : "Select the option that most closely matches what you do today.";
    case "painPoints":
      return draft.currentPainPoints.length > 0 ? null : "Select at least one current problem.";
    case "monthlyHours":
      return draft.monthlyGpuHours ? null : "Choose the closest monthly estimate or 'I don't know yet'.";
    case "etbPayment":
      return draft.etbPaymentValue ? null : "Choose the answer that best reflects your situation.";
    case "preferredAccess":
      return draft.preferredAccessMethod ? null : "Choose the kind of access that sounds most useful.";
    case "earlyAccess":
      return draft.earlyAccessInterest ? null : "Tell us whether you would test an early version.";
    case "workloadDetails":
      return null;
    case "contactDetails": {
      if (draft.preferredContactMethod === "Prefer to stay anonymous") {
        return null;
      }

      const hasContactDetail = Boolean(draft.name.trim() || draft.email.trim() || draft.contactHandle.trim());
      if (!hasContactDetail) {
        return "Choose anonymous submission or add at least one contact detail.";
      }

      if (draft.email.trim() && !/^\S+@\S+\.\S+$/.test(draft.email.trim())) {
        return "Enter a valid email address or clear the field.";
      }

      if (!draft.contactConsent) {
        return "Confirm that you agree to be contacted about early access and updates.";
      }

      return null;
    }
    case "review":
      return null;
  }
}

function findFirstInvalidStep(draft: SurveyDraft, steps: ReturnType<typeof buildSurveySteps>) {
  for (const step of steps) {
    if (step.key === "review") {
      continue;
    }

    const error = validateStep(step.key, draft);
    if (error) {
      return { key: step.key, error };
    }
  }

  return null;
}

function ChoiceGroup({
  options,
  selectedValue,
  onSelect,
  className,
}: {
  options: readonly string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {options.map((option) => (
        <FieldButton key={option} selected={selectedValue === option} onClick={() => onSelect(option)}>
          {option}
        </FieldButton>
      ))}
    </div>
  );
}

function MultiChoiceGroup({
  options,
  selectedValues,
  onToggle,
}: {
  options: readonly string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <FieldButton key={option} selected={selectedValues.includes(option)} onClick={() => onToggle(option)}>
          {option}
        </FieldButton>
      ))}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] p-4">
      <div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--secondary)]">{label}</p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">{value}</p>
      </div>
      <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--primary-bright)]">
        Edit
        <Edit3 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function CompletionState({
  contactProvided,
  onReset,
}: {
  contactProvided: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[36rem] flex-col items-center justify-center gap-6 rounded-[2rem] border border-[color:var(--surface-border)] bg-[linear-gradient(180deg,rgba(23,26,32,0.98),rgba(10,12,16,0.94))] p-6 text-center sm:p-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--primary)]/28 bg-[rgba(245,230,66,0.12)] text-[color:var(--primary-bright)]">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl font-semibold tracking-[-0.04em]">You&apos;re on the wishlist.</h3>
        <p className="max-w-2xl text-base leading-8 text-[color:var(--secondary)]">
          Thanks for helping us understand what Ethiopian AI builders need. Your responses will help shape the first version of the platform.
        </p>
        {contactProvided ? (
          <p className="text-sm text-[color:var(--secondary)]">We may contact you about early access if you opted in.</p>
        ) : null}
        <p className="text-sm text-[color:var(--secondary)]">This prototype used a mock submission flow; no paid account was created.</p>
      </div>
      <button type="button" onClick={onReset} className={buttonStyles()}>
        <Sparkles className="h-4 w-4" />
        Return to the main page
      </button>
    </div>
  );
}

export function WishlistWizard() {
  const [draft, setDraft] = useState(createEmptySurveyDraft);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Step 1 ready.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const reduceMotion = useReducedMotion();

  const searchParams = useSearchParams();
  const attribution = useMemo(() => getAttribution(searchParams), [searchParams]);
  const steps = useMemo(() => buildSurveySteps(draft), [draft]);

  const questionCount = steps.length - 1;
  const clampedIndex = Math.min(currentStepIndex, steps.length - 1);
  const currentStep = steps[clampedIndex];
  const currentQuestionNumber = Math.min(clampedIndex + 1, questionCount);
  const progressPercent = Math.round(((clampedIndex + 1) / steps.length) * 100);
  const demoModeLabel = process.env.NEXT_PUBLIC_WISHLIST_SUBMISSION_MODE?.trim().toLowerCase() || "mock";

  const updateDraft = (updater: Partial<SurveyDraft>) => {
    setDraft((current) => ({ ...current, ...updater }));
    setStepError(null);
    setSubmissionError(null);
  };

  const toggleMulti = (field: "workloads" | "providersUsed" | "reasonNeverUsed" | "currentPainPoints", value: string) => {
    setDraft((current) => {
      const selected = current[field] as string[];
      let nextValues = selected.includes(value) ? selected.filter((entry) => entry !== value) : [...selected, value];

      if (field === "currentPainPoints" && value === "None of these") {
        nextValues = selected.includes(value) ? [] : [value];
      }

      if (field === "currentPainPoints" && value !== "None of these" && nextValues.includes("None of these")) {
        nextValues = nextValues.filter((entry) => entry !== "None of these");
      }

      return { ...current, [field]: nextValues } as SurveyDraft;
    });
    setStepError(null);
    setSubmissionError(null);
  };

  const goToStepKey = (key: SurveyStepKey) => {
    const index = steps.findIndex((step) => step.key === key);
    if (index >= 0) {
      setCurrentStepIndex(index);
      setStatusMessage(index === steps.length - 1 ? "Review your responses before submitting." : `Step ${index + 1} of ${questionCount} ready.`);
    }
    setStepError(null);
    setSubmissionError(null);
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      const nextIndex = currentStepIndex - 1;
      setCurrentStepIndex(nextIndex);
      setStatusMessage(nextIndex === steps.length - 1 ? "Review your responses before submitting." : `Step ${nextIndex + 1} of ${questionCount} ready.`);
    }
    setStepError(null);
    setSubmissionError(null);
  };

  const goNext = async () => {
    const error = validateStep(currentStep.key, draft);
    if (error) {
      setStepError(error);
      setStatusMessage(error);
      return;
    }

    if (currentStep.key === "review") {
      await handleSubmit();
      return;
    }

    const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1);
    setCurrentStepIndex(nextIndex);
    setStatusMessage(nextIndex === steps.length - 1 ? "Review your responses before submitting." : `Step ${nextIndex + 1} of ${questionCount} ready.`);
    setStepError(null);
  };

  const handleSubmit = async () => {
    const invalidStep = findFirstInvalidStep(draft, steps);
    if (invalidStep) {
      setCurrentStepIndex(Math.max(steps.findIndex((step) => step.key === invalidStep.key), 0));
      setStepError(invalidStep.error);
      setStatusMessage(invalidStep.error);
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStepError(null);
    setSubmissionError(null);

    const submission = await submitWishlistApplication(draft, attribution);
    setIsSubmitting(false);

    if (!submission.ok) {
      setSubmissionError(submission.message);
      setStatusMessage(submission.message);
      return;
    }

    setResult(submission);
  };

  const resetWizard = () => {
    setDraft(createEmptySurveyDraft());
    setCurrentStepIndex(0);
    setResult(null);
    setStepError(null);
    setSubmissionError(null);
    setStatusMessage("Step 1 ready.");
  };

  const currentQuestionLabel = currentStep.key === "review" ? "Review before submission" : `Question ${currentQuestionNumber} of ${questionCount}`;
  const isReviewStep = clampedIndex === steps.length - 1;

  const summaryText = useMemo(() => {
    return {
      respondentType: draft.respondentType ?? "Not answered",
      intendedWorkload: draft.workloads.length > 0 ? draft.workloads.join(", ") : "Not answered",
      frequency: draft.usageFrequency ?? "Not answered",
      vram: draft.vramRequirement ?? "Not answered",
      problem:
        draft.currentPainPoints.length > 0
          ? draft.currentPainPoints.join(", ")
          : "Not answered",
      access: draft.preferredAccessMethod ?? "Not answered",
      earlyAccess: draft.earlyAccessInterest ?? "Not answered",
      contact: draft.preferredContactMethod === "Prefer to stay anonymous" ? "Anonymous" : [draft.name, draft.email, draft.contactHandle].filter(Boolean).join(" · ") || "Not answered",
    };
  }, [draft]);

  const renderField = () => {
    switch (currentStep.key) {
      case "respondentType":
        return (
          <>
            <ChoiceGroup
              options={respondentTypeOptions}
              selectedValue={draft.respondentType}
              onSelect={(value) => updateDraft({ respondentType: value as SurveyDraft["respondentType"] })}
            />
            {draft.respondentType === "Other" ? (
              <input
                value={draft.otherRespondentType}
                onChange={(event) => updateDraft({ otherRespondentType: event.target.value.slice(0, 120) })}
                placeholder="Optional: tell us how you would describe yourself"
                className="mt-4 w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
              />
            ) : null}
          </>
        );
      case "workloads":
        return (
          <>
            <MultiChoiceGroup options={workloadOptions} selectedValues={draft.workloads} onToggle={(value) => toggleMulti("workloads", value)} />
            {draft.workloads.includes("Other") ? (
              <input
                value={draft.otherWorkload}
                onChange={(event) => updateDraft({ otherWorkload: event.target.value.slice(0, 120) })}
                placeholder="Optional: describe the workload"
                className="mt-4 w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
              />
            ) : null}
          </>
        );
      case "intendedModel":
        return (
          <div className="space-y-3">
            <textarea
              value={draft.intendedModelOrProject}
              onChange={(event) => updateDraft({ intendedModelOrProject: event.target.value.slice(0, 500) })}
              placeholder="e.g. fine-tuning Qwen, running an open-weight LLM, generating videos, training a computer-vision model..."
              maxLength={500}
              rows={6}
              className="w-full resize-none rounded-3xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-4 text-sm leading-7 text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
            />
            <div className="flex items-center justify-between text-xs text-[color:var(--secondary)]">
              <span>{currentStep.helperText}</span>
              <span>{draft.intendedModelOrProject.length}/500</span>
            </div>
          </div>
        );
      case "vram":
        return <ChoiceGroup options={vramOptions} selectedValue={draft.vramRequirement} onSelect={(value) => updateDraft({ vramRequirement: value as SurveyDraft["vramRequirement"] })} />;
      case "frequency":
        return <ChoiceGroup options={frequencyOptions} selectedValue={draft.usageFrequency} onSelect={(value) => updateDraft({ usageFrequency: value as SurveyDraft["usageFrequency"] })} />;
      case "gpuCloudUsage":
        return (
          <ChoiceGroup
            options={["Yes", "No"]}
            selectedValue={draft.hasUsedGpuCloud ? draft.hasUsedGpuCloud[0].toUpperCase() + draft.hasUsedGpuCloud.slice(1) : null}
            onSelect={(value) => updateDraft({ hasUsedGpuCloud: value.toLowerCase() as SurveyDraft["hasUsedGpuCloud"] })}
          />
        );
      case "providersUsed":
        return (
          <>
            <MultiChoiceGroup options={providerOptions} selectedValues={draft.providersUsed} onToggle={(value) => toggleMulti("providersUsed", value)} />
            {isOtherSelected(draft.providersUsed, draft.otherProviderUsed) ? (
              <input
                value={draft.otherProviderUsed}
                onChange={(event) => updateDraft({ otherProviderUsed: event.target.value.slice(0, 120) })}
                placeholder="Optional: another provider"
                className="mt-4 w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
              />
            ) : null}
          </>
        );
      case "reasonNeverUsed":
        return (
          <>
            <MultiChoiceGroup options={noProviderOptions} selectedValues={draft.reasonNeverUsed} onToggle={(value) => toggleMulti("reasonNeverUsed", value)} />
            {draft.reasonNeverUsed.includes("Other") ? (
              <input
                value={draft.otherReasonNeverUsed}
                onChange={(event) => updateDraft({ otherReasonNeverUsed: event.target.value.slice(0, 120) })}
                placeholder="Optional: tell us why you have not used one"
                className="mt-4 w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
              />
            ) : null}
          </>
        );
      case "currentCompute":
        return (
          <>
            <ChoiceGroup
              options={currentComputeOptions}
              selectedValue={draft.currentComputeMethod}
              onSelect={(value) => updateDraft({ currentComputeMethod: value })}
            />
            {draft.currentComputeMethod === "Other" ? (
              <input
                value={draft.otherCurrentComputeMethod}
                onChange={(event) => updateDraft({ otherCurrentComputeMethod: event.target.value.slice(0, 120) })}
                placeholder="Optional: describe your current fallback"
                className="mt-4 w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
              />
            ) : null}
          </>
        );
      case "painPoints":
        return (
          <>
            <MultiChoiceGroup options={painPointOptions} selectedValues={draft.currentPainPoints} onToggle={(value) => toggleMulti("currentPainPoints", value)} />
            {draft.currentPainPoints.includes("Other") ? (
              <input
                value={draft.otherPainPoint}
                onChange={(event) => updateDraft({ otherPainPoint: event.target.value.slice(0, 120) })}
                placeholder="Optional: describe the biggest issue"
                className="mt-4 w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
              />
            ) : null}
          </>
        );
      case "monthlyHours":
        return <ChoiceGroup options={monthlyGpuOptions} selectedValue={draft.monthlyGpuHours} onSelect={(value) => updateDraft({ monthlyGpuHours: value })} />;
      case "etbPayment":
        return <ChoiceGroup options={etbPaymentOptions} selectedValue={draft.etbPaymentValue} onSelect={(value) => updateDraft({ etbPaymentValue: value })} />;
      case "preferredAccess":
        return <ChoiceGroup options={accessOptions} selectedValue={draft.preferredAccessMethod} onSelect={(value) => updateDraft({ preferredAccessMethod: value })} />;
      case "earlyAccess":
        return <ChoiceGroup options={earlyAccessOptions} selectedValue={draft.earlyAccessInterest} onSelect={(value) => updateDraft({ earlyAccessInterest: value })} />;
      case "workloadDetails":
        return (
          <div className="space-y-3">
            <textarea
              value={draft.intendedWorkloadDetails}
              onChange={(event) => updateDraft({ intendedWorkloadDetails: event.target.value.slice(0, 1000) })}
              placeholder="Describe the model, project, or task, and any hardware requirements or obstacles you've encountered."
              maxLength={1000}
              rows={7}
              className="w-full resize-none rounded-3xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-4 text-sm leading-7 text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
            />
            <div className="flex items-center justify-between text-xs text-[color:var(--secondary)]">
              <span>If you had access to suitable GPU compute today, what would you run first?</span>
              <span>{draft.intendedWorkloadDetails.length}/1000</span>
            </div>
          </div>
        );
      case "contactDetails":
        return (
          <div className="space-y-5">
            <ChoiceGroup
              options={contactMethodOptions}
              selectedValue={draft.preferredContactMethod}
              onSelect={(value) => updateDraft({ preferredContactMethod: value as SurveyDraft["preferredContactMethod"] })}
            />

            {draft.preferredContactMethod !== "Prefer to stay anonymous" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-[color:var(--secondary)]">
                  <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Name or preferred identifier</span>
                  <input
                    value={draft.name}
                    onChange={(event) => updateDraft({ name: event.target.value.slice(0, 120) })}
                    placeholder="Your name, handle, or team name"
                    className="w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
                  />
                </label>
                <label className="space-y-2 text-sm text-[color:var(--secondary)]">
                  <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Email address</span>
                  <input
                    value={draft.email}
                    onChange={(event) => updateDraft({ email: event.target.value.slice(0, 254) })}
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
                  />
                </label>
                <label className="space-y-2 text-sm text-[color:var(--secondary)] sm:col-span-2">
                  <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Telegram username or other contact method</span>
                  <input
                    value={draft.contactHandle}
                    onChange={(event) => updateDraft({ contactHandle: event.target.value.slice(0, 120) })}
                    placeholder="@username or another method"
                    className="w-full rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--secondary)]"
                  />
                </label>
                <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] p-4 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={draft.contactConsent}
                    onChange={(event) => updateDraft({ contactConsent: event.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-[color:var(--surface-border)] bg-transparent accent-[color:var(--primary)]"
                  />
                  <span className="text-sm leading-7 text-[color:var(--secondary)]">
                    I agree to be contacted about early access and updates related to this GPU compute project.
                  </span>
                </label>
              </div>
            ) : (
              <div className="rounded-3xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] p-5 text-sm leading-7 text-[color:var(--secondary)]">
                Anonymous submissions are welcome for research. You can still share contact details later if you change your mind.
              </div>
            )}
          </div>
        );
      case "review":
        return (
          <div className="space-y-4">
            {draft.earlyAccessInterest === earlyAccessOptions[0] ? (
              <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--primary)]/28 bg-[rgba(245,230,66,0.08)] p-4 text-sm text-[color:var(--foreground)]">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[color:var(--primary)]" />
                <span>High-priority potential early customer. This is not a purchase commitment.</span>
              </div>
            ) : null}
            <div className="grid gap-3">
              <SummaryRow label="User type" value={summaryText.respondentType} onEdit={() => goToStepKey("respondentType")} />
              <SummaryRow label="Intended workload" value={summaryText.intendedWorkload} onEdit={() => goToStepKey("workloads")} />
              <SummaryRow label="Compute frequency" value={summaryText.frequency} onEdit={() => goToStepKey("frequency")} />
              <SummaryRow label="GPU requirement" value={summaryText.vram} onEdit={() => goToStepKey("vram")} />
              <SummaryRow label="Current obstacle" value={summaryText.problem} onEdit={() => goToStepKey("painPoints")} />
              <SummaryRow label="Preferred access method" value={summaryText.access} onEdit={() => goToStepKey("preferredAccess")} />
              <SummaryRow label="Early-access interest" value={summaryText.earlyAccess} onEdit={() => goToStepKey("earlyAccess")} />
            </div>
            <p className="text-sm text-[color:var(--secondary)]">
              You can go back and edit any answer before submitting. Submitting this form does not create a paid account or guarantee access to a future service.
            </p>
          </div>
        );
    }
  };

  if (result?.ok) {
    return <CompletionState contactProvided={draft.preferredContactMethod !== "Prefer to stay anonymous"} onReset={resetWizard} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--secondary)]">
            <span>Survey wizard</span>
            <span className="rounded-full border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-3 py-1 text-[color:var(--primary-bright)]">
              {demoModeLabel === "simulate" ? "Demo submission simulation" : "Demo submission mode"}
            </span>
          </div>
          <p className="mt-2 text-sm text-[color:var(--secondary)]">{statusMessage}</p>
        </div>
        <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--secondary)] sm:flex">
          <Info className="h-4 w-4 text-[color:var(--primary)]" />
          Question {currentQuestionNumber} of {questionCount}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--secondary)]">
          <span>{currentQuestionLabel}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[color:var(--surface-border)]">
          <motion.div
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="h-full rounded-full bg-[color:var(--primary)]"
          />
        </div>
      </div>

      {stepError ? (
        <div className="rounded-2xl border border-[color:var(--error)]/30 bg-[rgba(255,107,107,0.08)] px-4 py-3 text-sm text-[color:var(--foreground)]" aria-live="polite">
          {stepError}
        </div>
      ) : null}

      {submissionError ? (
        <div className="rounded-2xl border border-[color:var(--error)]/30 bg-[rgba(255,107,107,0.08)] px-4 py-3 text-sm text-[color:var(--foreground)]" aria-live="polite">
          {submissionError}
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.key}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="space-y-6"
        >
          {currentStep.key !== "review" ? (
            <div className="space-y-2">
              <SectionLabel>{isReviewStep ? "Review" : "Question"}</SectionLabel>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{currentStep.title}</h3>
              {currentStep.helperText ? <p className="max-w-2xl text-sm leading-7 text-[color:var(--secondary)]">{currentStep.helperText}</p> : null}
            </div>
          ) : null}

          {renderField()}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-3 border-t border-[color:var(--surface-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={goBack} disabled={currentStepIndex === 0 || isSubmitting} className={buttonStyles({ variant: "secondary", className: "disabled:cursor-not-allowed disabled:opacity-50" })}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep.key === "review" ? (
          <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={buttonStyles({ className: "disabled:cursor-not-allowed disabled:opacity-60" })}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Submit my responses
          </button>
        ) : (
          <button type="button" onClick={goNext} className={buttonStyles()}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}