import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Zap, Crown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getDashboardData } from "@/lib/generators.functions";

export function CreditBadge() {
  const fn = useServerFn(getDashboardData);
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fn(),
  });

  const isPro = data?.subscription?.plan === "pro";
  const remaining = data?.credits?.remaining ?? 0;

  if (isPro) {
    return (
      <Link
        to="/app/upgrade"
        className="flex items-center gap-1.5 rounded-full border border-border bg-gradient-brand-soft px-3 py-1.5 text-xs font-semibold"
      >
        <Crown className="h-3.5 w-3.5 text-brand-pink" />
        Plano Pro
      </Link>
    );
  }

  return (
    <Link
      to="/app/upgrade"
      className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:border-primary/50 transition-colors"
    >
      <Zap className="h-3.5 w-3.5 text-brand-pink" />
      {remaining} créditos
    </Link>
  );
}
