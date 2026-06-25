import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaFinal() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16 text-center shadow-card-elev">
          <div className="absolute inset-0 -z-10 bg-gradient-brand-soft opacity-60" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Pronto para <span className="text-gradient-brand">viralizar</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Comece grátis hoje. Sem cartão de crédito. Cancele quando quiser.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-gradient-brand hover:opacity-90 shadow-glow h-12 px-6"
          >
            <Link to="/auth">
              Criar minha conta grátis
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
