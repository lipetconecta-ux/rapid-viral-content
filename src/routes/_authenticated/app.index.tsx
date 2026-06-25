import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboardData } from "@/lib/generators.functions";
import {
  FileText,
  LayoutGrid,
  Zap,
  Star,
  Crown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Postviral.AI" }] }),
  component: DashboardPage,
});

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: typeof Zap;
  label: string;
  value: React.ReactNode;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card-elev">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div
          className={`grid h-8 w-8 place-items-center rounded-lg ${
            accent ? "bg-gradient-brand shadow-glow" : "bg-gradient-brand-soft"
          }`}
        >
          <Icon className={`h-4 w-4 ${accent ? "text-primary-foreground" : "text-brand-pink"}`} />
        </div>
      </div>
      <div className="mt-3 text-3xl font-black tracking-tight">{value}</div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function DashboardPage() {
  const fn = useServerFn(getDashboardData);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fn(),
  });

  const profile = data?.profile;
  const isPro = data?.subscription?.plan === "pro";
  const greeting = profile?.full_name?.split(" ")[0] ?? "criador";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          Olá, {greeting} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          O que você quer criar hoje?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))
        ) : (
          <>
            <StatCard
              icon={Sparkles}
              label="Conteúdos gerados"
              value={data?.totalGenerations ?? 0}
              hint="Total acumulado"
            />
            <StatCard
              icon={Zap}
              label="Créditos restantes"
              value={isPro ? "∞" : data?.credits?.remaining ?? 0}
              hint={isPro ? "Plano Pro ativo" : "Renova mensalmente"}
              accent
            />
            <StatCard
              icon={Star}
              label="Favoritos"
              value={data?.totalFavorites ?? 0}
              hint="Conteúdos salvos"
            />
            <StatCard
              icon={Crown}
              label="Plano atual"
              value={isPro ? "Pro" : "Grátis"}
              hint={isPro ? "Gerações ilimitadas" : "10 gerações/mês"}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/app/script"
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card-elev transition-all hover:border-primary/40"
        >
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-brand opacity-20 blur-3xl group-hover:opacity-40 transition-opacity" />
          <div className="relative">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Gerar Roteiro Viral</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Roteiro completo com hook, cenas, CTA e legenda.
            </p>
            <div className="mt-4 inline-flex items-center text-sm font-semibold text-gradient-brand">
              Começar <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </Link>

        <Link
          to="/app/carousel"
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card-elev transition-all hover:border-primary/40"
        >
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-brand opacity-20 blur-3xl group-hover:opacity-40 transition-opacity" />
          <div className="relative">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
              <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Gerar Carrossel</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Slides de alta conversão (AIDA, PAS, Lista, Storytelling).
            </p>
            <div className="mt-4 inline-flex items-center text-sm font-semibold text-gradient-brand">
              Começar <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card-elev">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Atividade recente</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/app/history">Ver tudo</Link>
          </Button>
        </div>
        <div className="mt-4">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : data?.recent && data.recent.length > 0 ? (
            <ul className="divide-y divide-border">
              {data.recent.map((g) => (
                <li key={g.id} className="flex items-center gap-3 py-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand-soft">
                    {g.type === "script" ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <LayoutGrid className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{g.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {g.niche} ·{" "}
                      {formatDistanceToNow(new Date(g.created_at), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma geração ainda. Que tal criar a primeira?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
