import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { ScriptPayload, CarouselPayload } from "@/lib/generators.functions";

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      className="h-7 gap-1.5 px-2 text-xs"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copiado!");
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {label}
    </Button>
  );
}

function Block({
  title,
  copyText,
  children,
}: {
  title: string;
  copyText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gradient-brand">{title}</h4>
        <CopyButton text={copyText} />
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function ScriptResultCard({ payload }: { payload: ScriptPayload }) {
  const full = [
    `TÍTULO: ${payload.title}`,
    `\nHOOK: ${payload.hook}`,
    `\nROTEIRO:`,
    ...payload.scenes.map((s) => `[${s.duration}] ${s.name}\n${s.description}`),
    `\nTEXTOS NA TELA:\n${payload.onScreenTexts.map((t) => `• ${t}`).join("\n")}`,
    `\nB-ROLL:\n${payload.bRoll.map((t) => `• ${t}`).join("\n")}`,
    `\nCTA: ${payload.cta}`,
    `\nLEGENDA:\n${payload.caption}`,
    `\nHASHTAGS: ${payload.hashtags.join(" ")}`,
  ].join("\n");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card-elev space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold">{payload.title}</h3>
        <CopyButton text={full} label="Copiar tudo" />
      </div>
      <Block title="Hook inicial" copyText={payload.hook}>
        {payload.hook}
      </Block>
      <Block
        title="Roteiro por cenas"
        copyText={payload.scenes.map((s) => `[${s.duration}] ${s.name}\n${s.description}`).join("\n\n")}
      >
        <div className="space-y-3">
          {payload.scenes.map((s) => (
            <div key={s.name} className="border-l-2 border-primary/50 pl-3">
              <div className="text-xs font-semibold text-muted-foreground">{s.name}</div>
              <p className="mt-0.5">{s.description}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Textos na tela" copyText={payload.onScreenTexts.join("\n")}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {payload.onScreenTexts.map((t, i) => (
            <li key={i} className="rounded-md bg-card px-3 py-1.5 border border-border text-xs">{t}</li>
          ))}
        </ul>
      </Block>
      <Block title="Sugestão de B-roll" copyText={payload.bRoll.join("\n")}>
        <ul className="list-disc list-inside space-y-1">
          {payload.bRoll.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </Block>
      <Block title="CTA" copyText={payload.cta}>{payload.cta}</Block>
      <Block title="Legenda" copyText={payload.caption}>
        <p className="whitespace-pre-wrap">{payload.caption}</p>
      </Block>
      <Block title="Hashtags" copyText={payload.hashtags.join(" ")}>
        <div className="flex flex-wrap gap-1.5">
          {payload.hashtags.map((h) => (
            <span key={h} className="rounded-full bg-gradient-brand-soft border border-border px-2.5 py-0.5 text-xs">
              {h}
            </span>
          ))}
        </div>
      </Block>
    </div>
  );
}

export function CarouselResultCard({ payload }: { payload: CarouselPayload }) {
  const full = [
    `TÍTULO: ${payload.title}`,
    `\nSLIDES:`,
    ...payload.slides.map((s) => `Slide ${s.n}\nTexto: ${s.text}\nVisual: ${s.visual}`),
    `\nCTA: ${payload.cta}`,
    `\nLEGENDA:\n${payload.caption}`,
  ].join("\n\n");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card-elev space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold">{payload.title}</h3>
        <CopyButton text={full} label="Copiar tudo" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {payload.slides.map((s) => (
          <div key={s.n} className="relative rounded-xl border border-border bg-background/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">
                {s.n}
              </span>
              <CopyButton text={`${s.text}\n\nVisual: ${s.visual}`} label="" />
            </div>
            <p className="text-sm font-medium">{s.text}</p>
            <p className="mt-2 text-xs text-muted-foreground italic">🎨 {s.visual}</p>
          </div>
        ))}
      </div>

      <Block title="CTA final" copyText={payload.cta}>{payload.cta}</Block>
      <Block title="Legenda" copyText={payload.caption}>
        <p className="whitespace-pre-wrap">{payload.caption}</p>
      </Block>
    </div>
  );
}
