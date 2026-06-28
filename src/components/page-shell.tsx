import type { ReactNode } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export function PageShell({
  title,
  subtitle,
  children,
  updatedAt,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  updatedAt?: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              <span className="text-gradient-brand">{title}</span>
            </h1>
            {subtitle && (
              <p className="mt-4 text-muted-foreground">{subtitle}</p>
            )}
            {updatedAt && (
              <p className="mt-2 text-xs text-muted-foreground">
                Última atualização: {updatedAt}
              </p>
            )}
          </header>
          <article className="prose-legal space-y-6 text-foreground/90 leading-relaxed">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
