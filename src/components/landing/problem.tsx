import { AlertTriangle, CreditCard, Cpu, HardDriveDownload } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: Cpu,
    title: "Hardware limitations",
    description: "Your laptop or local machine cannot run the workload you want.",
  },
  {
    icon: CreditCard,
    title: "Access barriers",
    description: "International payment methods can make global providers difficult to access.",
  },
  {
    icon: HardDriveDownload,
    title: "Setup complexity",
    description: "Choosing hardware, configuring environments, and deploying models can consume time.",
  },
  {
    icon: AlertTriangle,
    title: "Unpredictable economics",
    description: "It can be difficult to estimate and control the cost of running AI workloads.",
  },
] as const;

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">The problem</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Getting GPU access shouldn&apos;t be the hardest part of building AI.</h2>
        <p className="text-base leading-7 text-[color:var(--secondary)]">These are the frictions we are investigating, not universal facts for every team.</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {problems.map((item) => (
          <Card key={item.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] p-3 text-[color:var(--primary)]">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--secondary)]">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}