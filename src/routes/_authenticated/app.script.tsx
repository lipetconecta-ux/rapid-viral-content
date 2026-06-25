import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateScript, type ScriptPayload } from "@/lib/generators.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScriptResultCard } from "@/components/generation-result";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/script")({
  head: () => ({ meta: [{ title: "Gerar Roteiro — Postviral.AI" }] }),
  component: ScriptPage,
});

function ScriptPage() {
  const fn = useServerFn(generateScript);
  const qc = useQueryClient();
  const [result, setResult] = useState<ScriptPayload | null>(null);
  const [creditsBlocked, setCreditsBlocked] = useState(false);

  const mut = useMutation({
    mutationFn: fn,
    onSuccess: (res) => {
      setResult(res.payload);
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["generations"] });
      toast.success("Roteiro gerado!");
    },
    onError: (err: Error) => {
      if (err.message.includes("CREDITS_EXHAUSTED")) {
        setCreditsBlocked(true);
      } else {
        toast.error(err.message || "Erro ao gerar");
      }
    },
  });

  const [form, setForm] = useState({
    niche: "",
    theme: "",
    goal: "",
    platform: "instagram" as const,
    duration: "30s",
    tone: "inspirador" as const,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    mut.mutate({ data: form });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Gerar Roteiro Viral</h1>
        <p className="mt-1 text-muted-foreground">
          Preencha os campos e a IA cria seu roteiro completo em segundos.
        </p>
      </div>

      {creditsBlocked && <CreditsBlockedBanner />}

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-border bg-card p-6 shadow-card-elev grid gap-4 sm:grid-cols-2"
      >
        <div className="space-y-2">
          <Label>Nicho</Label>
          <Input required value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} placeholder="Ex: emagrecimento" />
        </div>
        <div className="space-y-2">
          <Label>Tema</Label>
          <Input required value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })} placeholder="Ex: jejum intermitente" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Objetivo do conteúdo</Label>
          <Input required value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Ex: gerar leads para mentoria" />
        </div>
        <div className="space-y-2">
          <Label>Plataforma</Label>
          <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v as typeof form.platform })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram Reels</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="facebook">Facebook Reels</SelectItem>
              <SelectItem value="youtube_shorts">YouTube Shorts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Duração</Label>
          <Select value={form.duration} onValueChange={(v) => setForm({ ...form, duration: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="15s">15 segundos</SelectItem>
              <SelectItem value="30s">30 segundos</SelectItem>
              <SelectItem value="45s">45 segundos</SelectItem>
              <SelectItem value="60s">60 segundos</SelectItem>
              <SelectItem value="90s">90 segundos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Tom de voz</Label>
          <Select value={form.tone} onValueChange={(v) => setForm({ ...form, tone: v as typeof form.tone })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="inspirador">Inspirador</SelectItem>
              <SelectItem value="divertido">Divertido</SelectItem>
              <SelectItem value="educativo">Educativo</SelectItem>
              <SelectItem value="polemico">Polêmico</SelectItem>
              <SelectItem value="vendedor">Vendedor</SelectItem>
              <SelectItem value="autoridade">Autoridade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            disabled={mut.isPending || creditsBlocked}
            className="w-full bg-gradient-brand hover:opacity-90 shadow-glow"
          >
            {mut.isPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Gerar roteiro</>
            )}
          </Button>
        </div>
      </form>

      {result && <ScriptResultCard payload={result} />}
    </div>
  );
}

function CreditsBlockedBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold">Créditos esgotados</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Faça upgrade para o plano Pro e tenha gerações ilimitadas.
        </p>
      </div>
      <Button asChild size="sm" className="bg-gradient-brand">
        <Link to="/app/upgrade">Fazer upgrade</Link>
      </Button>
    </div>
  );
}
