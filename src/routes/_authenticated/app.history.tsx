import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listGenerations,
  toggleFavorite,
  deleteGeneration,
  type ScriptPayload,
  type CarouselPayload,
} from "@/lib/generators.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScriptResultCard, CarouselResultCard } from "@/components/generation-result";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  FileText,
  LayoutGrid,
  Star,
  Trash2,
  Eye,
  History as HistoryIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/history")({
  head: () => ({ meta: [{ title: "Histórico — Postviral.AI" }] }),
  component: () => <HistoryView onlyFavorites={false} />,
});

export function HistoryView({ onlyFavorites }: { onlyFavorites: boolean }) {
  const fn = useServerFn(listGenerations);
  const favFn = useServerFn(toggleFavorite);
  const delFn = useServerFn(deleteGeneration);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["generations"],
    queryFn: () => fn(),
  });

  const [type, setType] = useState<"all" | "script" | "carousel">("all");
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<any>(null);

  const items = useMemo(() => {
    let list = data ?? [];
    if (onlyFavorites) list = list.filter((g) => g.is_favorite);
    if (type !== "all") list = list.filter((g) => g.type === type);
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.title?.toLowerCase().includes(s) ||
          g.niche?.toLowerCase().includes(s) ||
          g.theme?.toLowerCase().includes(s),
      );
    }
    return list;
  }, [data, type, search, onlyFavorites]);

  const favMut = useMutation({
    mutationFn: favFn,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["generations"] }),
  });
  const delMut = useMutation({
    mutationFn: delFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["generations"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Removido");
    },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          {onlyFavorites ? "Favoritos" : "Histórico"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {onlyFavorites
            ? "Seus conteúdos marcados como favoritos."
            : "Todos os conteúdos que você já gerou."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, nicho ou tema…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="script">Roteiros</SelectItem>
            <SelectItem value="carousel">Carrosséis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-brand-soft">
            {onlyFavorites ? <Star className="h-5 w-5" /> : <HistoryIcon className="h-5 w-5" />}
          </div>
          <h3 className="mt-4 font-semibold">
            {onlyFavorites ? "Nenhum favorito ainda" : "Nenhuma geração ainda"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie seu primeiro conteúdo na aba de geradores.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((g) => (
            <li
              key={g.id}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card-elev"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft">
                  {g.type === "script" ? <FileText className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{g.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">
                    {g.niche} · {formatDistanceToNow(new Date(g.created_at), { addSuffix: true, locale: ptBR })}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setViewing(g)} className="gap-1.5">
                  <Eye className="h-3.5 w-3.5" /> Ver
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => favMut.mutate({ data: { generationId: g.id } })}
                  className="gap-1.5"
                >
                  <Star className={`h-3.5 w-3.5 ${g.is_favorite ? "fill-brand-pink text-brand-pink" : ""}`} />
                  {g.is_favorite ? "Desfavoritar" : "Favoritar"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => delMut.mutate({ data: { id: g.id } })}
                  className="gap-1.5 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewing?.title}</DialogTitle>
          </DialogHeader>
          {viewing?.type === "script" && (
            <ScriptResultCard payload={viewing.payload as ScriptPayload} />
          )}
          {viewing?.type === "carousel" && (
            <CarouselResultCard payload={viewing.payload as CarouselPayload} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
