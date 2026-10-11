import { ArrowRight, CheckCircle2, ClipboardList, Cpu, Play } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us what you're building.",
    description: "Share your workload, goals, and constraints so we can understand real demand.",
  },
  {
    icon: Cpu,
    title: "Choose the kind of compute you need.",
    description: "We are researching which access patterns are useful for Ethiopian builders.",
  },
  {
    icon: Play,
    title: "Access a suitable environment.",
    description: "The eventual product shape will depend on what early users actually need.",
  },
  {
    icon: CheckCircle2,
    title: "Run your AI workload.",
    description: "Use compute that matches the job, without forcing unnecessary setup overhead.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">How it works</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">We&apos;re exploring a simpler path to GPU compute.</h2>
        <p className="text-base leading-7 text-[color:var(--secondary)]">The exact product and supported access methods will be shaped by what early users actually need.</p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={step.title} className="relative overflow-hidden p-6">
            <div className="absolute right-4 top-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--secondary)]">
              0{index + 1}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] text-[color:var(--primary)]">
              <step.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 max-w-xs text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--secondary)]">{step.description}</p>
            {index < steps.length - 1 ? <ArrowRight className="mt-4 h-4 w-4 text-[color:var(--primary)]/70 xl:absolute xl:bottom-6 xl:right-6" /> : null}
          </Card>
        ))}
      </div>
    </section>
  );
}