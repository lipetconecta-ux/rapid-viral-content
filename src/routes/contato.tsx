import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, MessageSquare, Send } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Postviral.AI" },
      {
        name: "description",
        content:
          "Fale com a equipe da Postviral.AI. Envie sua dúvida, sugestão ou pedido de parceria.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  message: z.string().trim().min(10, "Mensagem muito curta").max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos.");
      return;
    }
    setSending(true);
    // TODO: conectar a um endpoint real (e-mail ou tabela de leads no backend)
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Mensagem enviada! Retornaremos em breve.");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <PageShell
      title="Fale com a gente"
      subtitle="Dúvidas, sugestões, parcerias ou suporte. Respondemos em até 1 dia útil."
    >
      <div className="not-prose grid gap-8 md:grid-cols-[1fr_2fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">E-mail</h3>
            <p className="text-sm text-muted-foreground">contato@postviral.ai</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Suporte</h3>
            <p className="text-sm text-muted-foreground">
              Resposta em até 1 dia útil.
            </p>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card-elev space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Seu nome"
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="voce@email.com"
              maxLength={255}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Como podemos ajudar?"
              rows={6}
              maxLength={2000}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-gradient-brand hover:opacity-90 shadow-glow"
            size="lg"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </form>
      </div>
    </PageShell>
  );
}
