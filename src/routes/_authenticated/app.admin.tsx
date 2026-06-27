import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  adminIsAdmin,
  adminLookupUser,
  adminSetCredits,
} from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ShieldAlert, Search, Zap, Crown, FileText, LayoutGrid } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/_authenticated/app/admin")({
  head: () => ({ meta: [{ title: "Admin — Postviral.AI" }] }),
  component: AdminPage,
});

function AdminPage() {
  const isAdminFn = useServerFn(adminIsAdmin);
  const lookupFn = useServerFn(adminLookupUser);
  const setCreditsFn = useServerFn(adminSetCredits);

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["admin", "is-admin"],
    queryFn: () => isAdminFn(),
  });

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [newCredits, setNewCredits] = useState<string>("");

  const lookup = useMutation({
    mutationFn: (q: string) => lookupFn({ data: { query: q } }),
    onSuccess: (data) => {
      setResult(data);
      if (data.found) setNewCredits(String(data.credits?.remaining ?? 0));
      else toast.error("Usuário não encontrado");
    },
    onError: (e: any) => toast.error(e?.message ?? "Falha na busca"),
  });

  const setCredits = useMutation({
    mutationFn: (vars: { userId: string; remaining: number }) =>
      setCreditsFn({ data: vars }),
    onSuccess: (data) => {
      toast.success(`Créditos atualizados: ${data.remaining}`);
      // refresh
      if (result?.found) lookup.mutate(query);
    },
    onError: (e: any) => toast.error(e?.message ?? "Falha ao atualizar"),
  });

  if (roleLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    );
  }

  if (!roleData?.isAdmin) {
    return (
      <div className="mx-auto max-w-md mt-20">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card-elev">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="mt-4 text-xl font-bold">Acesso restrito</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta área é apenas para administradores.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Admin · Debug</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Inspecione e corrija o estado de créditos de qualquer usuário.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card-elev">
        <Label htmlFor="q">Buscar usuário (email ou UUID)</Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="q"
            placeholder="usuario@exemplo.com"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim().length >= 3) lookup.mutate(query.trim());
            }}
          />
          <Button
            onClick={() => lookup.mutate(query.trim())}
            disabled={lookup.isPending || query.trim().length < 3}
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>

      {result?.found && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card-elev">
            <h2 className="text-sm font-semibold text-muted-foreground">Perfil</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
              <Field label="Nome" value={result.profile.full_name ?? "—"} />
              <Field label="Email" value={result.profile.email ?? "—"} />
              <Field label="User ID" value={result.profile.id} mono />
              <Field
                label="Criado"
                value={formatDistanceToNow(new Date(result.profile.created_at), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              icon={Zap}
              label="Créditos restantes"
              value={result.credits?.remaining ?? "—"}
            />
            <Stat
              icon={Crown}
              label="Plano"
              value={result.subscription?.plan ?? "—"}
            />
            <Stat label="Gerações totais" value={result.totalGenerations} />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card-elev">
            <h2 className="text-sm font-semibold">Ajustar créditos</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Define o saldo absoluto. Use para corrigir falhas de fluxo (ex: cobrança
              feita mas geração falhou).
            </p>
            <div className="mt-3 flex gap-2">
              <Input
                type="number"
                min={0}
                max={100000}
                value={newCredits}
                onChange={(e) => setNewCredits(e.target.value)}
                className="max-w-[160px]"
              />
              <Button
                onClick={() =>
                  setCredits.mutate({
                    userId: result.profile.id,
                    remaining: Number(newCredits),
                  })
                }
                disabled={
                  setCredits.isPending ||
                  newCredits === "" ||
                  Number.isNaN(Number(newCredits)) ||
                  Number(newCredits) < 0
                }
              >
                Salvar
              </Button>
              {[10, 50, 100].map((v) => (
                <Button
                  key={v}
                  variant="outline"
                  size="sm"
                  onClick={() => setNewCredits(String(v))}
                >
                  +{v}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card-elev">
            <h2 className="text-sm font-semibold">Últimas gerações</h2>
            {result.recent.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Nenhuma geração.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border">
                {result.recent.map((g: any) => (
                  <li key={g.id} className="flex items-center gap-3 py-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand-soft">
                      {g.type === "script" ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <LayoutGrid className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{g.title ?? "(sem título)"}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(g.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm ${mono ? "font-mono text-xs break-all" : ""}`}>{value}</div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon?: typeof Zap;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card-elev">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {Icon && (
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand-soft">
            <Icon className="h-3.5 w-3.5 text-brand-pink" />
          </div>
        )}
      </div>
      <div className="mt-2 text-2xl font-black">{value}</div>
    </div>
  );
}
