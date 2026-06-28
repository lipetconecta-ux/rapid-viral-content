import { Logo } from "@/components/brand";
import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Music2 } from "lucide-react";

// TODO: substituir pelos links reais das redes sociais da marca
const socials = [
  { Icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
  { Icon: Music2, href: "https://tiktok.com/", label: "TikTok" },
  { Icon: Youtube, href: "https://youtube.com/", label: "YouTube" },
];

const cols: Array<{
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "Produto",
    links: [
      { label: "Recursos", href: "/#recursos", external: true },
      { label: "Preços", href: "/#precos", external: true },
      { label: "Depoimentos", href: "/#depoimentos", external: true },
      { label: "FAQ", href: "/#faq", external: true },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos", href: "/termos" },
      { label: "Privacidade", href: "/privacidade" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A plataforma de IA para criadores que querem vender mais no orgânico.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:border-primary/50 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) =>
                  l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Postviral.AI. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Feito com IA para criadores brasileiros 🇧🇷
          </p>
        </div>
      </div>
    </footer>
  );
}
