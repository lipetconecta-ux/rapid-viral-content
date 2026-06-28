import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Postviral.AI" },
      {
        name: "description",
        content:
          "O blog da Postviral.AI com estratégias, tendências e estudos de caso para criadores. Em breve.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell title="Blog">
      <div className="not-prose flex flex-col items-center text-center rounded-3xl border border-dashed border-border bg-card/50 p-12">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
          <BookOpen className="h-7 w-7" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Em breve</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Estamos preparando artigos, estudos de caso e bastidores sobre conteúdo viral,
          algoritmos e crescimento orgânico. Volte em breve.
        </p>
        <Button asChild className="mt-6 bg-gradient-brand hover:opacity-90 shadow-glow">
          <Link to="/">Voltar para o início</Link>
        </Button>
      </div>
    </PageShell>
  );
}
