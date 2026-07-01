import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Benefits } from "@/components/landing/benefits";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Resources } from "@/components/landing/resources";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { ExampleShowcase } from "@/components/landing/example-showcase";
import { BeforeAfter } from "@/components/landing/before-after";
import { Faq } from "@/components/landing/faq";
import { CtaFinal } from "@/components/landing/cta-final";
import { Footer } from "@/components/landing/footer";
import { PromoBanner } from "@/components/landing/promo-banner";
import { PlatformsMarquee } from "@/components/landing/platforms-marquee";
import { FloatingCta } from "@/components/landing/floating-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postviral.AI — Crie conteúdos virais em segundos com IA" },
      {
        name: "description",
        content:
          "Gere roteiros virais e carrosséis de alta conversão para Instagram, TikTok, Facebook e YouTube Shorts. Comece grátis com 5 gerações, sem cartão.",
      },
      { property: "og:title", content: "Postviral.AI — Conteúdo viral com IA" },
      {
        property: "og:description",
        content: "A plataforma de IA para criadores que querem vender mais no orgânico.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />
      <main>
        <Hero />
        <PlatformsMarquee />
        <Benefits />
        <HowItWorks />
        <BeforeAfter />
        <Resources />
        <ExampleShowcase />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
