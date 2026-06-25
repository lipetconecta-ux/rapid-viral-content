import { createFileRoute } from "@tanstack/react-router";
import { HistoryView } from "./app.history";

export const Route = createFileRoute("/_authenticated/app/favorites")({
  head: () => ({ meta: [{ title: "Favoritos — Postviral.AI" }] }),
  component: () => <HistoryView onlyFavorites={true} />,
});
