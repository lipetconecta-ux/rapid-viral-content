import { X, Check } from "lucide-react";

export function BeforeAfter() {
  return (
    <section className="py-24 sm:py-32 bg-card/20 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            A diferença está no <span className="text-gradient-brand">hook</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Compare um roteiro genérico (tipo ChatGPT cru) com um roteiro otimizado
            para viralizar gerado pela Postviral.AI.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Antes */}
          <div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-destructive/15 text-destructive">
                <X className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sem Postviral.AI
                </p>
                <p className="text-sm font-medium">Roteiro genérico, sem hook</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground/80">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                  Abertura
                </p>
                <p className="mt-1 italic">
                  "Olá pessoal, hoje eu vou falar sobre como economizar dinheiro
                  no dia a dia. Existem várias formas..."
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                  Desenvolvimento
                </p>
                <p className="mt-1 italic">
                  "Você pode anotar seus gastos, fazer um orçamento mensal,
                  evitar dívidas no cartão... [bullet points óbvios]"
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                  CTA
                </p>
                <p className="mt-1 italic">
                  "Curta o vídeo e siga para mais dicas."
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-destructive/10 px-4 py-3">
              <p className="text-xs font-semibold text-destructive">
                📉 Resultado típico: 800 views, 2% retenção
              </p>
            </div>
          </div>

          {/* Depois */}
          <div className="relative rounded-3xl border border-primary/60 bg-card p-6 sm:p-8 shadow-card-elev">
            <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-brand opacity-40 blur-xl" />
            <div className="mb-5 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gradient-brand">
                  Com Postviral.AI
                </p>
                <p className="text-sm font-medium">Roteiro estruturado para viralizar</p>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  🎯 Hook (3 segundos)
                </p>
                <p className="mt-1 font-medium">
                  "Pare de gastar R$ 600 por mês com algo que você NÃO precisa
                  — e ninguém te conta isso."
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  🎬 Cena 1 (corte rápido)
                </p>
                <p className="mt-1">
                  Mostrar a tela do extrato bancário com gastos circulados em
                  vermelho. Texto na tela: <span className="font-semibold">"Você está sangrando"</span>.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  🎬 Cena 2 (revelação)
                </p>
                <p className="mt-1">
                  Lista os 3 vilões silentes: streaming duplicado, taxa de cartão,
                  delivery por preguiça. Mostra cálculo: 200 + 150 + 250 = R$ 600/mês.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  🚀 CTA
                </p>
                <p className="mt-1 font-medium">
                  "Salva esse Reel pra revisar seu cartão hoje à noite. Comenta
                  'SOS' que mando o checklist completo."
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-gradient-brand-soft border border-primary/30 px-4 py-3">
              <p className="text-xs font-semibold text-foreground">
                🚀 Resultado típico: 47k views, 18% retenção, 340 salvamentos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
