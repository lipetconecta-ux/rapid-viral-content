import { useRef, useState } from "react";
import { ArrowRight, Bookmark, Download, Heart, Loader2, MessageCircle, Send } from "lucide-react";
import { toBlob } from "html-to-image";
import JSZip from "jszip";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarouselPayload } from "@/lib/generators.functions";

/**
 * Renders a carousel as real 4:5 Instagram-feed slide mockups.
 * Based on research of viral carousel patterns (2025/2026):
 *  - 1080x1350 portrait (aspect 4:5)
 *  - 7.5% safe-zone padding
 *  - branded edge + slide counter
 *  - cover / middle / CTA visual differentiation
 *  - 4 trending style presets
 */

export type SlideStyle = "dark" | "cream" | "gradient" | "brutal";

const STYLES: Record<
  SlideStyle,
  { label: string; swatch: string; description: string }
> = {
  dark: {
    label: "Dark Authority",
    swatch: "linear-gradient(135deg,#0f0f14 60%,#6366f1 60%)",
    description: "LinkedIn B2B — preto fosco + accent indigo",
  },
  cream: {
    label: "Warm Editorial",
    swatch: "linear-gradient(135deg,#faf7f2 60%,#c2410c 60%)",
    description: "Serif premium, papel quente, terracota",
  },
  gradient: {
    label: "Gradient Mesh",
    swatch: "linear-gradient(135deg,#667eea,#764ba2 50%,#f5576c)",
    description: "Glassmorphism sobre mesh roxo/rosa",
  },
  brutal: {
    label: "Brutal Mono",
    swatch: "linear-gradient(135deg,#ffffff 60%,#ff3366 60%)",
    description: "Mono brutal, branco + hot pink",
  },
};

type SlideRole = "cover" | "middle" | "cta";

function roleOf(index: number, total: number): SlideRole {
  if (index === 0) return "cover";
  if (index === total - 1) return "cta";
  return "middle";
}

interface SlideProps {
  index: number;
  total: number;
  text: string;
  title: string;
  cta: string;
  handle: string;
}

// ---------------- Style 1: Dark Authority ----------------
function DarkSlide({ index, total, text, title, cta, handle }: SlideProps) {
  const role = roleOf(index, total);
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f0f14] text-[#f0f0f8]">
      {/* branded edge */}
      <div className="absolute inset-y-[7.5%] left-0 w-[3px] bg-indigo-500" />
      <div className="absolute inset-[7.5%] flex flex-col">
        {role === "cover" ? (
          <>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-400">
              Carrossel · {total} slides
            </div>
            <div className="mt-auto">
              <h2 className="text-balance text-[28px] font-black uppercase leading-[0.95] tracking-tight">
                {title}
              </h2>
              <div className="mt-3 h-px w-10 bg-indigo-500" />
              <p className="mt-3 line-clamp-3 text-[11px] leading-relaxed text-white/60">
                {text}
              </p>
            </div>
          </>
        ) : role === "cta" ? (
          <div className="m-auto text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-indigo-500/20 text-indigo-300">
              <Bookmark className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-[18px] font-bold leading-tight">{cta}</h3>
            <p className="mt-2 text-[10px] text-white/50">@{handle}</p>
          </div>
        ) : (
          <>
            <div className="font-mono text-[10px] text-indigo-400">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="mt-auto mb-auto text-[15px] font-medium leading-snug text-balance">
              {text}
            </p>
          </>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 font-mono text-[9px] text-white/40">
          <span>@{handle}</span>
          <span className="flex items-center gap-1">
            <span className="text-indigo-400">{String(index + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(total).padStart(2, "0")}</span>
            {role !== "cta" && <ArrowRight className="ml-1 h-2.5 w-2.5" />}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- Style 2: Warm Cream Editorial ----------------
function CreamSlide({ index, total, text, title, cta, handle }: SlideProps) {
  const role = roleOf(index, total);
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#faf7f2] text-[#1a1a1a]">
      <div className="absolute inset-[7.5%] flex flex-col">
        {role === "cover" ? (
          <>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c2410c]">
              · Edição {total}
            </div>
            <div className="mt-auto">
              <h2
                className="text-balance text-[30px] font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "ui-serif, Georgia, serif" }}
              >
                {title}
              </h2>
              <div className="mt-4 h-0.5 w-12 bg-[#c2410c]" />
              <p className="mt-3 line-clamp-3 text-[11px] italic leading-relaxed text-[#1a1a1a]/60">
                {text}
              </p>
            </div>
          </>
        ) : role === "cta" ? (
          <div className="m-auto text-center">
            <div
              className="text-[14px] italic text-[#c2410c]"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              — fim —
            </div>
            <h3
              className="mt-3 text-[20px] font-bold leading-tight"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              {cta}
            </h3>
            <div className="mx-auto mt-3 h-0.5 w-8 bg-[#c2410c]" />
            <p className="mt-2 text-[10px] text-[#1a1a1a]/50">@{handle}</p>
          </div>
        ) : (
          <>
            <div
              className="text-[24px] font-bold text-[#c2410c]"
              style={{ fontFamily: "ui-serif, Georgia, serif" }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="my-2 h-px w-8 bg-[#c2410c]/40" />
            <p className="mt-auto mb-auto text-[14px] leading-snug text-balance">
              {text}
            </p>
          </>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 text-[9px] text-[#1a1a1a]/40">
          <span className="italic">@{handle}</span>
          <span>
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- Style 3: Gradient Mesh ----------------
function GradientSlide({ index, total, text, title, cta, handle }: SlideProps) {
  const role = roleOf(index, total);
  // alternate gradients to add rhythm
  const gradients = [
    "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
    "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
  ];
  const bg = gradients[index % gradients.length];
  return (
    <div
      className="relative h-full w-full overflow-hidden text-white"
      style={{ background: bg }}
    >
      {/* soft blobs */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="absolute inset-[7.5%] flex flex-col">
        {role === "cover" ? (
          <div className="m-auto text-center">
            <div className="inline-block rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider backdrop-blur-md">
              Thread · {total}
            </div>
            <h2 className="mt-4 text-balance text-[26px] font-black leading-[0.95] tracking-tight drop-shadow-sm">
              {title}
            </h2>
          </div>
        ) : role === "cta" ? (
          <div className="m-auto w-full rounded-2xl border border-white/25 bg-white/10 p-4 text-center backdrop-blur-md">
            <Heart className="mx-auto h-4 w-4 fill-white" />
            <h3 className="mt-2 text-[16px] font-bold leading-tight">{cta}</h3>
            <p className="mt-2 text-[9px] text-white/70">@{handle}</p>
          </div>
        ) : (
          <div className="m-auto w-full rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="text-[10px] font-bold tracking-widest text-white/70">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="mt-2 text-[14px] font-semibold leading-snug text-balance">
              {text}
            </p>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 text-[9px] text-white/70">
          <span>@{handle}</span>
          <span className="flex items-center gap-1">
            {index + 1}/{total}
            {role !== "cta" && <ArrowRight className="h-2.5 w-2.5" />}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- Style 4: Brutal Mono ----------------
function BrutalSlide({ index, total, text, title, cta, handle }: SlideProps) {
  const role = roleOf(index, total);
  return (
    <div className="relative h-full w-full overflow-hidden bg-white font-mono text-black">
      {/* branded top edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff3366]" />
      <div className="absolute inset-[7.5%] flex flex-col">
        {role === "cover" ? (
          <>
            <div className="text-[10px] font-bold uppercase">
              [ {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")} ]
            </div>
            <div className="mt-auto">
              <h2 className="text-balance text-[28px] font-black uppercase leading-[0.9] tracking-tight">
                {title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="bg-[#ff3366] px-1 text-white">
                  {title.split(" ").slice(-1)}
                </span>
              </h2>
            </div>
          </>
        ) : role === "cta" ? (
          <div className="m-auto w-full">
            <div className="border-2 border-black bg-[#ff3366] p-3 text-center text-white">
              <h3 className="text-[16px] font-black uppercase leading-tight">
                → {cta}
              </h3>
            </div>
            <p className="mt-3 text-center text-[10px] font-bold uppercase">
              @{handle}
            </p>
          </div>
        ) : (
          <>
            <div className="text-[10px] font-bold">
              # {String(index + 1).padStart(2, "0")}
            </div>
            <p className="mt-auto mb-auto text-[15px] font-bold leading-snug text-balance">
              {text}
            </p>
            <div className="h-1 w-12 bg-black" />
          </>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 text-[9px] font-bold uppercase">
          <span>@{handle}</span>
          {role !== "cta" && <span>swipe →</span>}
        </div>
      </div>
    </div>
  );
}

function Slide({ style, ...props }: SlideProps & { style: SlideStyle }) {
  if (style === "dark") return <DarkSlide {...props} />;
  if (style === "cream") return <CreamSlide {...props} />;
  if (style === "gradient") return <GradientSlide {...props} />;
  return <BrutalSlide {...props} />;
}

interface MockupProps {
  payload: CarouselPayload;
  handle?: string;
}

export function CarouselSlidesMockup({ payload, handle = "postviral.ai" }: MockupProps) {
  const [style, setStyle] = useState<SlideStyle>("dark");
  const total = payload.slides.length;

  return (
    <div className="space-y-4">
      {/* style picker */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Estilo visual:</span>
        {(Object.keys(STYLES) as SlideStyle[]).map((key) => {
          const s = STYLES[key];
          const active = key === style;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setStyle(key)}
              className={cn(
                "group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                active
                  ? "border-primary bg-primary/10 text-foreground shadow-glow"
                  : "border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
              title={s.description}
            >
              <span
                className="h-3.5 w-3.5 rounded-full border border-border"
                style={{ background: s.swatch }}
              />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* slides row */}
      <div className="-mx-2 overflow-x-auto pb-2">
        <div className="flex gap-4 px-2">
          {payload.slides.map((s, i) => (
            <div
              key={s.n}
              className="group relative w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card-elev transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[4/5] w-full">
                <Slide
                  style={style}
                  index={i}
                  total={total}
                  text={s.text}
                  title={payload.title}
                  cta={payload.cta}
                  handle={handle}
                />
              </div>
              {/* IG-like footer to sell the "real feed" illusion */}
              <div className="flex items-center justify-between border-t border-border bg-card/80 px-3 py-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-3 w-3" />
                  <MessageCircle className="h-3 w-3" />
                  <Send className="h-3 w-3" />
                </div>
                <Bookmark className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Dica: passe o mouse e role horizontalmente para visualizar cada slide. Formato 4:5 (1080×1350) — o que mais ocupa o feed.
      </p>
    </div>
  );
}
