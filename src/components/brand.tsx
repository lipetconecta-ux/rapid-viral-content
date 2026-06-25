import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { box: "h-7 w-7", icon: "h-4 w-4", text: "text-base" },
    md: { box: "h-9 w-9", icon: "h-5 w-5", text: "text-lg" },
    lg: { box: "h-11 w-11", icon: "h-6 w-6", text: "text-2xl" },
  } as const;
  const s = sizes[size];
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span
        className={`${s.box} grid place-items-center rounded-xl bg-gradient-brand shadow-glow transition-transform group-hover:scale-105`}
      >
        <Sparkles className={`${s.icon} text-primary-foreground`} strokeWidth={2.5} />
      </span>
      <span className={`${s.text} font-bold tracking-tight`}>
        Postviral<span className="text-gradient-brand">.AI</span>
      </span>
    </Link>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className="text-gradient-brand">{children}</span>;
}
