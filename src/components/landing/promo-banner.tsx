import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <div className="relative z-50 w-full bg-gradient-brand text-primary-foreground">
      <Link
        to="/auth"
        className="group mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center text-xs font-medium sm:text-sm"
      >
        <Sparkles className="hidden h-3.5 w-3.5 sm:inline-block" />
        <span className="font-bold uppercase tracking-wider">Oferta de lançamento:</span>
        <span>5 gerações grátis + garantia de 7 dias em todos os planos pagos</span>
        <span className="inline-flex items-center gap-0.5 underline underline-offset-2 group-hover:no-underline">
          Aproveitar
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
