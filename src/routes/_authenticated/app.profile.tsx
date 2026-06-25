import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboardData, updateProfile } from "@/lib/generators.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/profile")({
  head: () => ({ meta: [{ title: "Perfil — Postviral.AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const dashFn = useServerFn(getDashboardData);
  const updFn = useServerFn(updateProfile);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => dashFn() });

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (data?.profile) {
      setFullName(data.profile.full_name ?? "");
      setAvatarUrl(data.profile.avatar_url ?? "");
    }
  }, [data]);

  const mut = useMutation({
    mutationFn: updFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Perfil atualizado!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    mut.mutate({ data: { full_name: fullName, avatar_url: avatarUrl } });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Perfil</h1>
        <p className="mt-1 text-muted-foreground">Atualize suas informações pessoais.</p>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card-elev space-y-4">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-xl font-bold text-primary-foreground overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              (fullName || "?").slice(0, 1).toUpperCase()
            )}
          </div>
          <div className="min-w-0">
            <div className="font-semibold truncate">{data?.profile?.email}</div>
            <div className="text-xs text-muted-foreground">
              Plano {data?.subscription?.plan === "pro" ? "Pro" : "Gratuito"}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Nome completo</Label>
          <Input id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar_url">URL do avatar (opcional)</Label>
          <Input id="avatar_url" type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://…" />
        </div>

        <Button type="submit" disabled={mut.isPending} className="bg-gradient-brand">
          {mut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
        </Button>
      </form>
    </div>
  );
}
