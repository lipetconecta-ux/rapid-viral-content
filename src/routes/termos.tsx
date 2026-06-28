import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Postviral.AI" },
      {
        name: "description",
        content:
          "Termos e condições de uso da plataforma Postviral.AI para criadores de conteúdo brasileiros.",
      },
    ],
  }),
  component: TermsPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mt-10 mb-3">{children}</h2>;
}

function TermsPage() {
  return (
    <PageShell title="Termos de Uso" updatedAt="28 de junho de 2026">
      <p>
        Bem-vindo(a) à Postviral.AI. Ao acessar ou utilizar a plataforma você concorda
        integralmente com estes Termos de Uso. Leia com atenção. Se você não concorda
        com algum item, por favor não utilize a plataforma.
      </p>

      <H2>1. Sobre a Postviral.AI</H2>
      <p>
        A Postviral.AI é uma plataforma de software como serviço (SaaS) que oferece
        ferramentas baseadas em inteligência artificial para auxiliar na criação de
        conteúdos para redes sociais (roteiros, carrosséis e demais formatos).
      </p>

      <H2>2. Cadastro e conta</H2>
      <p>
        Para utilizar funcionalidades autenticadas é necessário criar uma conta com
        informações verdadeiras, completas e atualizadas. Você é responsável por manter
        a confidencialidade das suas credenciais e por todas as atividades realizadas
        em sua conta.
      </p>

      <H2>3. Planos, créditos e pagamentos</H2>
      <p>
        A Postviral.AI oferece um plano gratuito com limite mensal de gerações e planos
        pagos com diferentes cotas. O consumo é contabilizado em créditos: cada geração
        de conteúdo consome 1 crédito. Renovações, upgrades, downgrades e cancelamentos
        podem ser realizados diretamente na sua área de assinatura.
      </p>

      <H2>4. Uso aceitável</H2>
      <p>
        Você concorda em não utilizar a plataforma para gerar, publicar ou distribuir
        conteúdo ilegal, discriminatório, difamatório, fraudulento, que viole direitos
        de terceiros ou que infrinja a legislação brasileira, incluindo o Marco Civil da
        Internet e a Lei Geral de Proteção de Dados (LGPD).
      </p>

      <H2>5. Propriedade intelectual</H2>
      <p>
        Os conteúdos gerados pela IA com base nos seus inputs podem ser utilizados por
        você de forma livre em seus canais. A marca, o código-fonte, o design e as
        funcionalidades da Postviral.AI permanecem de propriedade exclusiva da empresa.
      </p>

      <H2>6. Limitação de responsabilidade</H2>
      <p>
        A Postviral.AI é uma ferramenta de apoio. Não garantimos resultados específicos
        de engajamento, alcance ou conversão. A revisão e a publicação final do conteúdo
        são de responsabilidade do(a) usuário(a).
      </p>

      <H2>7. Cancelamento e encerramento</H2>
      <p>
        Você pode encerrar sua conta a qualquer momento. Reservamo-nos o direito de
        suspender ou encerrar contas que descumpram estes Termos.
      </p>

      <H2>8. Alterações dos termos</H2>
      <p>
        Estes Termos podem ser atualizados periodicamente. Mudanças relevantes serão
        comunicadas por e-mail ou dentro da plataforma.
      </p>

      <H2>9. Foro</H2>
      <p>
        Fica eleito o foro da Comarca onde a Postviral.AI tem sede para dirimir
        quaisquer controvérsias decorrentes destes Termos.
      </p>

      <p>
        Dúvidas? Entre em contato pela página de{" "}
        <a className="text-brand-pink hover:underline" href="/contato">contato</a>.
      </p>
    </PageShell>
  );
}
