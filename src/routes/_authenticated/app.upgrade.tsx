import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboardData, upgradeToPro } from "@/lib/generators.functions";
import { Button } from "@/components/ui/button";
import { Check, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/upgrade")({
  head: () => ({ meta: [{ title: "Upgrade Pro — Postviral.AI" }] }),
  component: UpgradePage,
});

function UpgradePage() {
  const dashFn = useServerFn(getDashboardData);
  const upFn = useServerFn(upgradeToPro);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => dashFn() });
  const isPro = data?.subscription?.plan === "pro";

  const mut = useMutation({
    mutationFn: upFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Bem-vindo ao Pro! 🎉");
      navigate({ to: "/app" });
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
          <Crown className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight">
          {isPro ? "Você é Pro!" : "Faça upgrade para o Pro"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isPro
            ? "Aproveite gerações ilimitadas e todos os recursos."
            : "Tenha gerações ilimitadas e desbloqueie todo o potencial."}
        </p>
      </div>

      <div className="relative rounded-3xl border border-primary/60 bg-card p-8 shadow-card-elev overflow-hidden">
        <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-brand opacity-30 blur-xl" />
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Plano Pro</h2>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-5xl font-black tracking-tight">R$ 47</span>
            <span className="text-muted-foreground">/mês</span>
          </div>
          <ul className="mt-8 space-y-3 text-left">
            {[
              "Gerações ilimitadas",
              "Acesso prioritário a novos recursos",
              "Favoritos ilimitados",
              "Histórico completo",
              "Suporte prioritário",
            ].map((b) => (
              <li key={b} className="flex gap-3 text-sm">
                <Check className="h-5 w-5 shrink-0 text-brand-pink" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            disabled={isPro || mut.isPending}
            onClick={() => mut.mutate({} as never)}
            className="mt-8 w-full max-w-xs bg-gradient-brand hover:opacity-90 shadow-glow"
          >
            {mut.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPro ? (
              "Já é Pro"
            ) : (
              "Assinar Pro"
            )}
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            💡 Demonstração — integração real de pagamento entra na próxima fase.
          </p>
        </div>
      </div>
    </div>
  );
}
