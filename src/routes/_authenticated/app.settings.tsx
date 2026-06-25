import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({ meta: [{ title: "Configurações — Postviral.AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Senha alterada!");
    setPassword("");
  }

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Configurações</h1>
        <p className="mt-1 text-muted-foreground">Gerencie a segurança da sua conta.</p>
      </div>

      <form onSubmit={changePassword} className="rounded-2xl border border-border bg-card p-6 shadow-card-elev space-y-4">
        <h2 className="font-semibold">Alterar senha</h2>
        <div className="space-y-2">
          <Label htmlFor="new-password">Nova senha</Label>
          <Input id="new-password" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading || !password} className="bg-gradient-brand">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Atualizar senha"}
        </Button>
      </form>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card-elev space-y-4">
        <h2 className="font-semibold">Sessão</h2>
        <Button variant="outline" onClick={signOut} className="gap-2">
          <LogOut className="h-4 w-4" /> Sair da conta
        </Button>
      </div>
    </div>
  );
}
