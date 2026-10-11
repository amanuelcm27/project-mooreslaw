"use client";

import { ArrowRight, Cpu, Gauge, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { ScrollLink } from "@/components/ui/scroll-link";

function GpuChipVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] border border-[color:var(--surface-border)] bg-[linear-gradient(180deg,rgba(23,26,32,0.96),rgba(10,12,16,0.98))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,230,66,0.14),transparent_42%)]" />
      <div className="relative grid aspect-[1.05] gap-3 rounded-[1.4rem] border border-[color:var(--surface-border)] bg-[linear-gradient(180deg,rgba(8,9,11,0.86),rgba(16,18,22,0.92))] p-4">
        <div className="absolute inset-4 rounded-[1.1rem] border border-[color:var(--surface-border)]/60 opacity-70" />
        <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(245,230,66,0.7),transparent)]" />
        <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(245,230,66,0.7),transparent)]" />
        <div className="relative grid grid-cols-4 gap-2 rounded-[1rem] border border-[color:var(--primary)]/20 bg-[rgba(245,230,66,0.04)] p-3">
          {Array.from({ length: 16 }).map((_, index) => (
            <motion.div
              key={index}
              animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.45], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3 + index * 0.12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className={cn(
                "aspect-square rounded-lg border border-[color:var(--surface-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]",
                index % 3 === 0 && "bg-[rgba(245,230,66,0.2)]",
                index % 5 === 0 && "bg-[rgba(245,230,66,0.12)]",
              )}
            />
          ))}
        </div>
        <div className="relative grid grid-cols-2 gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--secondary)] sm:grid-cols-4">
          {[
            { label: "Compute Core", value: "GFLOPS" },
            { label: "VRAM", value: "24-80 GB" },
            { label: "Inference", value: "Optimized" },
            { label: "GPU Access", value: "Flexible" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface)]/80 p-3">
              <div className="text-[0.64rem] text-[color:var(--secondary)]">{item.label}</div>
              <div className="mt-2 text-sm tracking-normal text-[color:var(--foreground)]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="grid gap-10 py-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:py-14">
      <div className="space-y-7">
        <Badge>Early access research</Badge>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            GPU compute. Within reach.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--secondary)] sm:text-lg">
            Access the compute you need to run, fine-tune, and build AI models. We are exploring a simpler way for Ethiopian developers and teams to access GPU power, with local payment options.
          </p>
          <p className="max-w-2xl text-sm text-[color:var(--secondary)]">
            We are validating demand before launch. Help shape what we build.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ScrollLink targetId="wishlist" focusId="wishlist-heading" className={buttonStyles()}>
            Join the Wishlist
            <ArrowRight className="h-4 w-4" />
          </ScrollLink>
          <ScrollLink targetId="wishlist" focusId="wishlist-heading" className={buttonStyles({ variant: "secondary" })}>
            Tell Us What You Need
          </ScrollLink>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-3 text-sm text-[color:var(--secondary)] sm:grid-cols-3">
          {[
            { icon: Cpu, label: "GPU-focused", value: "Designed for compute-heavy AI work" },
            { icon: Gauge, label: "Clear intent", value: "Built around real workloads, not hype" },
            { icon: Zap, label: "Early signal", value: "Structured research, not a fake launch" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.5 }}
              className="rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface)] p-4"
            >
              <div className="flex items-center gap-3 text-[color:var(--primary-bright)]">
                <item.icon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em]">{item.label}</span>
              </div>
              <p className="mt-3 leading-6 text-[color:var(--secondary)]">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="lg:pl-8">
        <GpuChipVisual />
      </div>
    </section>
  );
}