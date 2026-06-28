import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Postviral.AI" },
      {
        name: "description",
        content:
          "Como a Postviral.AI coleta, usa e protege seus dados, em conformidade com a LGPD.",
      },
    ],
  }),
  component: PrivacyPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mt-10 mb-3">{children}</h2>;
}

function PrivacyPage() {
  return (
    <PageShell title="Política de Privacidade" updatedAt="28 de junho de 2026">
      <p>
        Esta Política descreve como a Postviral.AI ("nós") coleta, utiliza, armazena e
        protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018 — LGPD) e demais normas aplicáveis.
      </p>

      <H2>1. Dados que coletamos</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Dados de cadastro:</strong> nome, e-mail e foto de perfil (quando
          fornecida via login social).
        </li>
        <li>
          <strong>Dados de uso:</strong> inputs enviados aos geradores (nicho, público,
          tema), conteúdos gerados, favoritos e histórico.
        </li>
        <li>
          <strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo, navegador,
          páginas visitadas, cookies.
        </li>
        <li>
          <strong>Dados de pagamento:</strong> processados por gateways parceiros; não
          armazenamos números completos de cartão.
        </li>
      </ul>

      <H2>2. Como usamos seus dados</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Prestar e melhorar os serviços da plataforma.</li>
        <li>Personalizar sua experiência e os conteúdos gerados.</li>
        <li>Comunicar atualizações, novidades e alertas de segurança.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>

      <H2>3. Base legal (LGPD)</H2>
      <p>
        Tratamos seus dados com base em: execução de contrato, cumprimento de obrigação
        legal, consentimento (quando aplicável) e legítimo interesse para melhorias e
        segurança da plataforma.
      </p>

      <H2>4. Compartilhamento</H2>
      <p>
        Compartilhamos dados apenas com prestadores essenciais (hospedagem, banco de
        dados, modelos de IA, gateways de pagamento e envio de e-mails), sempre sob
        contrato e obrigações de confidencialidade. Não vendemos seus dados.
      </p>

      <H2>5. Cookies</H2>
      <p>
        Utilizamos cookies para autenticação, preferências e análise de uso. Detalhes na
        nossa <a className="text-brand-pink hover:underline" href="/cookies">Política de Cookies</a>.
      </p>

      <H2>6. Retenção</H2>
      <p>
        Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para
        cumprir obrigações legais. Você pode solicitar a exclusão a qualquer momento.
      </p>

      <H2>7. Seus direitos como titular</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Confirmar a existência de tratamento.</li>
        <li>Acessar e corrigir seus dados.</li>
        <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.</li>
        <li>Portabilidade dos dados.</li>
        <li>Revogar o consentimento.</li>
      </ul>
      <p>
        Para exercer seus direitos, escreva para nosso encarregado de dados (DPO) pela
        página de <a className="text-brand-pink hover:underline" href="/contato">contato</a>.
      </p>

      <H2>8. Segurança</H2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo
        criptografia em trânsito, controle de acesso e monitoramento contínuo.
      </p>

      <H2>9. Alterações</H2>
      <p>
        Esta Política pode ser atualizada. A versão vigente estará sempre disponível
        nesta página.
      </p>
    </PageShell>
  );
}
