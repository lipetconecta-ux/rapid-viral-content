import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como funciona a geração de conteúdo?",
    a: "Você preenche um formulário com nicho, tema e objetivo. Nossa IA processa e devolve roteiro completo (ou carrossel) com hook, CTA, legenda e hashtags otimizadas em segundos.",
  },
  {
    q: "Preciso saber escrever bem para usar?",
    a: "Não. A plataforma faz o trabalho pesado. Você só precisa ter clareza sobre seu nicho e o que quer comunicar.",
  },
  {
    q: "Quantos conteúdos posso gerar no plano gratuito?",
    a: "10 gerações por mês. Ao atingir o limite, basta fazer upgrade para o plano Pro e ter gerações ilimitadas.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, sem multa e sem burocracia. Cancele direto no painel de configurações.",
  },
  {
    q: "Os conteúdos gerados são meus?",
    a: "100%. Tudo que você gera é seu e pode ser usado comercialmente, sem royalties.",
  },
  {
    q: "Para quais redes funciona?",
    a: "Instagram (Reels e Carrosséis), TikTok, Facebook Reels e YouTube Shorts. Os roteiros são otimizados para o formato de cada plataforma.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-card/30 border-y border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Perguntas <span className="text-gradient-brand">frequentes</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
