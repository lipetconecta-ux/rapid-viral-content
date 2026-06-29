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
    q: "Quanto custa? Tem plano grátis?",
    a: "Sim, plano gratuito para sempre com 5 gerações por mês, sem cartão de crédito. Planos pagos a partir de R$ 27,90/mês com mais gerações e recursos.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, sem multa e sem burocracia. Cancele direto no painel de configurações — sua assinatura segue ativa até o fim do período já pago.",
  },
  {
    q: "Vocês oferecem garantia?",
    a: "Sim. Garantia incondicional de 7 dias em todos os planos pagos. Se não gostar por qualquer motivo, devolvemos 100% do valor — sem perguntas.",
  },
  {
    q: "Os roteiros são em português do Brasil?",
    a: "100%. A IA foi treinada com referências brasileiras: gírias, hooks que funcionam no público BR, formato de Reels nacional. Nada de tradução robótica do inglês.",
  },
  {
    q: "Preciso saber escrever bem para usar?",
    a: "Não. A plataforma faz o trabalho pesado. Você só precisa ter clareza sobre seu nicho e o que quer comunicar — a IA entrega roteiro, cena a cena, legenda e hashtags prontos para gravar.",
  },
  {
    q: "Funciona para o meu nicho?",
    a: "Funciona para qualquer nicho: emagrecimento, finanças, afiliados, infoprodutos, beleza, fitness, educação, espiritualidade, marketing digital, e-commerce, advocacia, saúde, gastronomia. Quanto mais específico o nicho que você informar, melhores os resultados.",
  },
  {
    q: "Posso usar para meus clientes (agências/social media)?",
    a: "Sim. Você é dono 100% do conteúdo gerado e pode usar comercialmente para clientes, sem royalties. O plano Premium é pensado especificamente para agências com múltiplas marcas.",
  },
  {
    q: "A IA copia conteúdo de outros criadores?",
    a: "Não. Cada roteiro é gerado do zero a partir do seu briefing. Não há banco de roteiros prontos — é IA generativa real, então o conteúdo é único.",
  },
  {
    q: "Para quais redes funciona?",
    a: "Instagram (Reels e Carrosséis), TikTok, Facebook Reels e YouTube Shorts. Os roteiros são otimizados para o formato de cada plataforma (duração, ritmo, hook, CTA).",
  },
  {
    q: "Quanto tempo demora para gerar um roteiro?",
    a: "Em média 10 a 20 segundos. Você preenche o briefing, clica em gerar e em poucos segundos tem roteiro completo pronto para gravar.",
  },
  {
    q: "Os conteúdos gerados são meus?",
    a: "100%. Tudo que você gera é seu, pode publicar onde quiser, vender, adaptar, sem royalties e sem créditos para a Postviral.AI.",
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
          <p className="mt-3 text-muted-foreground">
            Tirou todas suas dúvidas? Comece agora — leva 30 segundos.
          </p>
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
