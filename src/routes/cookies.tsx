import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Postviral.AI" },
      {
        name: "description",
        content:
          "Como a Postviral.AI utiliza cookies e tecnologias semelhantes para oferecer uma melhor experiência.",
      },
    ],
  }),
  component: CookiesPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mt-10 mb-3">{children}</h2>;
}

function CookiesPage() {
  return (
    <PageShell title="Política de Cookies" updatedAt="28 de junho de 2026">
      <p>
        Esta Política explica o que são cookies, quais utilizamos na Postviral.AI e como
        você pode gerenciá-los.
      </p>

      <H2>1. O que são cookies?</H2>
      <p>
        Cookies são pequenos arquivos de texto armazenados no seu navegador quando você
        acessa um site. Eles permitem reconhecer o seu dispositivo, lembrar preferências
        e analisar o uso da plataforma.
      </p>

      <H2>2. Tipos de cookies que usamos</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Essenciais:</strong> necessários para autenticação, sessão e segurança.
          Não podem ser desativados.
        </li>
        <li>
          <strong>Preferências:</strong> lembram escolhas como idioma e tema.
        </li>
        <li>
          <strong>Analíticos:</strong> ajudam a entender como a plataforma é usada para
          melhorá-la (de forma agregada e anonimizada).
        </li>
        <li>
          <strong>Marketing:</strong> usados apenas com o seu consentimento, para
          campanhas e remarketing.
        </li>
      </ul>

      <H2>3. Cookies de terceiros</H2>
      <p>
        Alguns parceiros (analytics, processadores de pagamento, autenticação social)
        podem definir cookies próprios sob suas respectivas políticas.
      </p>

      <H2>4. Como gerenciar</H2>
      <p>
        Você pode bloquear ou apagar cookies nas configurações do seu navegador. A
        desativação de cookies essenciais pode afetar o funcionamento da plataforma.
      </p>

      <H2>5. Alterações</H2>
      <p>
        Atualizações desta Política serão publicadas nesta página. Em caso de dúvidas,
        entre em contato pela página de{" "}
        <a className="text-brand-pink hover:underline" href="/contato">contato</a>.
      </p>
    </PageShell>
  );
}
