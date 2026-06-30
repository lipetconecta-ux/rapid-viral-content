import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroMockup from "@/assets/hero-mockup-ptbr.jpg.asset.json";
import { resolveAssetUrl } from "@/lib/asset-url";
import {
  AnimatedContainer,
  BgGradient,
  Hero as AnimatedHero,
  TextStagger,
} from "@/components/blocks/hero-animated";

const heroMockupSrc = resolveAssetUrl(heroMockup);

export function Hero() {
  return (
    <AnimatedHero className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <BgGradient
        gradientColors="purple"
        gradientPosition="top"
        gradientSize="lg"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedContainer transformDirection="top" className="flex justify-center">
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-border bg-card/60 px-3 py-1 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-gradient-brand" />
              <span className="text-xs font-medium">
                Novo: gerador de carrosséis com IA
              </span>
            </Badge>
          </AnimatedContainer>

          <h1 className="text-balance text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            <TextStagger
              as="span"
              text="Crie conteúdos virais em"
              className="block"
              direction="bottom"
            />
            <TextStagger
              as="span"
              text="segundos com IA"
              className="text-gradient-brand block"
              direction="bottom"
              stagger={0.06}
            />
          </h1>

          <AnimatedContainer
            transformDirection="bottom"
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base sm:text-lg text-muted-foreground"
          >
            Gere roteiros virais, carrosséis de alta conversão e conteúdos otimizados
            para vender mais no orgânico — Instagram, TikTok, Facebook e YouTube Shorts.
          </AnimatedContainer>

          <AnimatedContainer
            transformDirection="bottom"
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground"
          >
            Comece grátis com{" "}
            <span className="font-semibold text-foreground">5 gerações/mês</span>,
            sem cartão de crédito.
          </AnimatedContainer>

          <AnimatedContainer
            transformDirection="bottom"
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
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
          </AnimatedContainer>

          <AnimatedContainer
            transformDirection="bottom"
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-pink text-brand-pink" />
              ))}
            </span>
            <span>4.9/5 · +12.000 criadores usando</span>
          </AnimatedContainer>
        </div>

        {/* Mockup */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-x-4 -inset-y-8 -z-10 bg-gradient-brand-soft blur-3xl rounded-[3rem] opacity-60" />
          <div className="rounded-2xl border border-border bg-card/50 p-2 shadow-card-elev backdrop-blur">
            <img
              src={heroMockupSrc}
              alt="Painel Postviral.AI gerando roteiros virais"
              width={1536}
              height={1024}
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </AnimatedHero>
  );
}
