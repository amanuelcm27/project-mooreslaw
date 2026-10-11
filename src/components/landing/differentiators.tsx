import { BadgeCent, Layers3, LockKeyhole, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const differentiators = [
  {
    icon: BadgeCent,
    title: "Local payment options",
    description: "We're exploring ways to make payment easier for Ethiopian users without implying integration is already in place.",
  },
  {
    icon: Layers3,
    title: "Simpler access to GPU compute",
    description: "Our goal is to reduce the setup burden around GPU selection, environments, and support.",
  },
  {
    icon: LockKeyhole,
    title: "Compute options for different workloads",
    description: "We're investigating how much users prefer direct machines, notebooks, APIs, or managed deployment.",
  },
  {
    icon: Users,
    title: "Early users helping shape the product",
    description: "Wishlist members will influence what gets built first and which features matter most.",
  },
] as const;

export function DifferentiatorsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">Why explore this</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Built around the needs of local AI builders.</h2>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {differentiators.map((item) => (
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