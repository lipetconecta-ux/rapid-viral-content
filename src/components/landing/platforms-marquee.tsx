import { Instagram, Youtube, Facebook, Linkedin, Twitter, Music2, ImageIcon, Video } from "lucide-react";

const platforms = [
  { name: "Instagram", Icon: Instagram },
  { name: "TikTok", Icon: Music2 },
  { name: "YouTube", Icon: Youtube },
  { name: "Facebook", Icon: Facebook },
  { name: "LinkedIn", Icon: Linkedin },
  { name: "Twitter", Icon: Twitter },
  { name: "Pinterest", Icon: ImageIcon },
  { name: "Kwai", Icon: Video },
];

export function PlatformsMarquee() {
  const items = [...platforms, ...platforms];
  return (
    <section
      aria-label="Plataformas suportadas"
      className="border-y border-border/60 bg-card/30 py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Funciona com as principais plataformas
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-[marquee_35s_linear_infinite] gap-12 sm:gap-16">
            {items.map(({ name, Icon }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-3 text-muted-foreground/80 transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-base font-semibold tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
