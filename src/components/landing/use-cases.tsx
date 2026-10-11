import { ChartColumnBig, Code2, Cpu, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const useCases = [
  {
    icon: Code2,
    title: "Run AI Models",
    description: "Run open-weight language models and other AI workloads.",
  },
  {
    icon: Cpu,
    title: "Fine-Tune Models",
    description: "Adapt open-source models to your data and use case.",
  },
  {
    icon: ChartColumnBig,
    title: "Train & Experiment",
    description: "Access additional compute for machine-learning experiments.",
  },
  {
    icon: Sparkles,
    title: "Generate",
    description: "Explore image, video, audio, and other generative AI workloads.",
  },
] as const;

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-16 sm:py-20">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">Use cases</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">What do you need compute for?</h2>
        <p className="text-base leading-7 text-[color:var(--secondary)]">From your first model experiment to production AI workloads.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {useCases.map((item) => (
          <Card key={item.title} className="group p-6 transition duration-200 hover:-translate-y-1 hover:border-[color:var(--primary)]/30">
            <item.icon className="h-5 w-5 text-[color:var(--primary)] transition group-hover:scale-110" />
            <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--secondary)]">{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}