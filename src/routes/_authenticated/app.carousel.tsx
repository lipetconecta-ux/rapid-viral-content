import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateCarousel, type CarouselPayload } from "@/lib/generators.functions";
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
import { CarouselResultCard } from "@/components/generation-result";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/carousel")({
  head: () => ({ meta: [{ title: "Gerar Carrossel — Postviral.AI" }] }),
  component: CarouselPage,
});

function CarouselPage() {
  const fn = useServerFn(generateCarousel);
  const qc = useQueryClient();
  const [result, setResult] = useState<CarouselPayload | null>(null);
  const [creditsBlocked, setCreditsBlocked] = useState(false);

  const mut = useMutation({
    mutationFn: fn,
    onSuccess: (res) => {
      setResult(res.payload);
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["generations"] });
      toast.success("Carrossel gerado!");
    },
    onError: (err: Error) => {
      if (err.message.includes("CREDITS_EXHAUSTED")) setCreditsBlocked(true);
      else toast.error(err.message || "Erro ao gerar");
    },
  });

  const [form, setForm] = useState({
    niche: "",
    theme: "",
    goal: "",
    slides: 7,
    structure: "AIDA" as const,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    mut.mutate({ data: form });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Gerar Carrossel</h1>
        <p className="mt-1 text-muted-foreground">
          Carrosséis de alta conversão, prontos para postar.
        </p>
      </div>

      {creditsBlocked && (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold">Créditos esgotados</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">Faça upgrade para gerações ilimitadas.</p>
          </div>
          <Button asChild size="sm" className="bg-gradient-brand">
            <Link to="/app/upgrade">Upgrade</Link>
          </Button>
        </div>
      )}

      <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card-elev grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Nicho</Label>
          <Input required value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} placeholder="Ex: marketing digital" />
        </div>
        <div className="space-y-2">
          <Label>Tema</Label>
          <Input required value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })} placeholder="Ex: copywriting para vendas" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Objetivo</Label>
          <Input required value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Ex: educar e gerar autoridade" />
        </div>
        <div className="space-y-2">
          <Label>Quantidade de slides</Label>
          <Select value={String(form.slides)} onValueChange={(v) => setForm({ ...form, slides: Number(v) })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[3, 5, 7, 8, 10].map((n) => (
                <SelectItem key={n} value={String(n)}>{n} slides</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Estrutura</Label>
          <Select value={form.structure} onValueChange={(v) => setForm({ ...form, structure: v as typeof form.structure })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="AIDA">AIDA</SelectItem>
              <SelectItem value="PAS">PAS</SelectItem>
              <SelectItem value="Storytelling">Storytelling</SelectItem>
              <SelectItem value="Lista">Lista</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" size="lg" disabled={mut.isPending || creditsBlocked} className="w-full bg-gradient-brand hover:opacity-90 shadow-glow">
            {mut.isPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Gerar carrossel</>
            )}
          </Button>
        </div>
      </form>

      {result && <CarouselResultCard payload={result} />}
    </div>
  );
}
