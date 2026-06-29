import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && sessionStorage.getItem("pv_floating_cta_dismissed");
    if (stored === "1") {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrolled / docHeight : 0;
      setVisible(ratio > 0.35 && ratio < 0.95);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pv_floating_cta_dismissed", "1");
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6">
      <div className="relative rounded-2xl border border-border bg-card/95 p-3 pr-10 shadow-card-elev backdrop-blur-xl">
        <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-brand opacity-30 blur-md" />
        <button
          onClick={handleDismiss}
          aria-label="Fechar"
          className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-2xl">🚀</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight">
              5 gerações grátis, sem cartão
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              Crie seu primeiro roteiro viral em 30 segundos.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-gradient-brand hover:opacity-90 shadow-glow shrink-0"
          >
            <Link to="/auth">
              Começar
              <ArrowRight className="ml-0.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
