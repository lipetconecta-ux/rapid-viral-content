import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroMockup from "@/assets/hero-mockup-ptbr.jpg.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-radial-brand opacity-60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,oklch(0.58_0.24_295/0.35),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 border-border bg-card/60 px-3 py-1 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-gradient-brand" />
            <span className="text-xs font-medium">Novo: gerador de carrosséis com IA</span>
          </Badge>

          <h1 className="text-balance text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Crie conteúdos virais em{" "}
            <span className="text-gradient-brand">segundos com IA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base sm:text-lg text-muted-foreground">
            Gere roteiros virais, carrosséis de alta conversão e conteúdos otimizados
            para vender mais no orgânico — Instagram, TikTok, Facebook e YouTube Shorts.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand hover:opacity-90 shadow-glow text-base h-12 px-6"
            >
              <Link to="/auth">
                Começar gratuitamente
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 bg-card/40 backdrop-blur"
            >
              <a href="#recursos">Ver recursos</a>
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-pink text-brand-pink" />
              ))}
            </div>
            <span>4.9/5 · +12.000 criadores usando</span>
          </div>
        </div>

        {/* Mockup */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-x-4 -inset-y-8 -z-10 bg-gradient-brand-soft blur-3xl rounded-[3rem] opacity-60" />
          <div className="rounded-2xl border border-border bg-card/50 p-2 shadow-card-elev backdrop-blur">
            <img
              src={heroMockup}
              alt="Painel Postviral.AI gerando roteiros virais"
              width={1536}
              height={1024}
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
