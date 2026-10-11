export function BrandMark() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] shadow-[0_0_0_1px_rgba(245,230,66,0.08)]">
        <span className="absolute inset-2 rounded-md border border-[color:var(--primary)]/70" />
        <span className="absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 bg-[color:var(--primary)]/80" />
        <span className="absolute bottom-2 top-2 left-1/2 w-px -translate-x-1/2 bg-[color:var(--primary)]/80" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.72rem] font-semibold tracking-[0.34em] text-[color:var(--primary)]">
          NEXUS
        </span>
        <span className="text-sm font-medium tracking-[0.28em] text-[color:var(--foreground)]/92">
          COMPUTE
        </span>
      </span>
    </span>
  );
}