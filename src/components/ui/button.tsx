import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonStyleProps {
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[color:var(--primary)] text-[#111111] hover:bg-[color:var(--primary-bright)] focus-visible:outline-[color:var(--primary-bright)]",
  secondary:
    "border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] text-[color:var(--foreground)] hover:border-[color:var(--primary)]/40 hover:bg-[color:var(--surface)]",
  ghost:
    "bg-transparent text-[color:var(--foreground)] hover:bg-white/5 border border-transparent hover:border-[color:var(--surface-border)]",
};

export function buttonStyles({ variant = "primary", className }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, className })} type={props.type ?? "button"} {...props} />;
}

export interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

export function AnchorButton({ variant = "primary", className, ...props }: AnchorButtonProps) {
  return <a className={buttonStyles({ variant, className })} {...props} />;
}