import { buildSubmissionPayload, surveySubmissionSchema } from "@/lib/survey/schema";
import type { SurveyAttribution, SurveyDraft, SubmissionResult } from "@/lib/survey/types";
import { createMockWishlistSubmissionAdapter } from "./mock";

export interface WishlistSubmissionAdapter {
  submitWishlistApplication(
    draft: SurveyDraft,
    attribution: SurveyAttribution,
  ): Promise<SubmissionResult>;
}

function resolveMode() {
  return process.env.NEXT_PUBLIC_WISHLIST_SUBMISSION_MODE?.trim().toLowerCase() || "mock";
}

export function createWishlistSubmissionAdapter(): WishlistSubmissionAdapter {
  const mode = resolveMode();

  if (mode === "simulate") {
    return createMockWishlistSubmissionAdapter({ simulateFailures: true });
  }

  return createMockWishlistSubmissionAdapter({ simulateFailures: false });
}

export async function submitWishlistApplication(
  draft: SurveyDraft,
  attribution: SurveyAttribution,
): Promise<SubmissionResult> {
  const payload = buildSubmissionPayload(draft, attribution);
  const parsed = surveySubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: "The survey payload is incomplete. Please review your answers and try again.",
    };
  }

  const adapter = createWishlistSubmissionAdapter();
  return adapter.submitWishlistApplication(draft, attribution);
}