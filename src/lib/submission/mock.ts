import { buildSubmissionPayload, surveySubmissionSchema } from "@/lib/survey/schema";
import type { SurveyAttribution, SurveyDraft, SubmissionResult } from "@/lib/survey/types";

interface MockSubmissionOptions {
  simulateFailures: boolean;
}

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, milliseconds);
  });
}

function createReferenceId() {
  return `WL-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
}

export function createMockWishlistSubmissionAdapter({ simulateFailures }: MockSubmissionOptions) {
  return {
    async submitWishlistApplication(
      draft: SurveyDraft,
      attribution: SurveyAttribution,
    ): Promise<SubmissionResult> {
      const payload = buildSubmissionPayload(draft, attribution);
      const parsed = surveySubmissionSchema.safeParse(payload);

      if (!parsed.success) {
        return {
          ok: false,
          message: "The submission could not be validated.",
        };
      }

      await wait(900 + Math.round(Math.random() * 700));

      if (simulateFailures && Math.random() < 0.12) {
        return {
          ok: false,
          message: "The demo submission service is temporarily unavailable. Please try again.",
        };
      }

      return {
        ok: true,
        referenceId: createReferenceId(),
      };
    },
  };
}