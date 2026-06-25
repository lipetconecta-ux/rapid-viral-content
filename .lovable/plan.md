## Postviral.AI — Plano de Implementação

SaaS completo de geração de conteúdo viral com IA (mockada por enquanto). Stack: TanStack Start + React + TypeScript + Tailwind v4 + Lovable Cloud (Supabase).

### Fase 1 — Fundação
1. **Design system** (`src/styles.css`): tema dark (#0A0A0A bg, #111111 card), gradiente primário violet→pink (#7C3AED→#EC4899), secundária azul (#3B82F6), tokens semânticos em oklch, fonte Inter via `<link>` no `__root.tsx`.
2. **Ativar Lovable Cloud** para auth + banco.
3. **Schema do banco** (migration):
   - `profiles` (id→auth.users, full_name, avatar_url)
   - `subscriptions` (user_id, plan: 'free'|'pro', status, current_period_end)
   - `credits` (user_id, remaining, cycle_start, cycle_end)
   - `generations` (user_id, type: 'script'|'carousel', payload jsonb, niche, theme, platform, created_at)
   - `favorites` (user_id, generation_id)
   - Trigger `handle_new_user`: cria profile + subscription free + 10 créditos no signup.
   - RLS: cada usuário só vê o que é seu. Grants explícitos para `authenticated`.

### Fase 2 — Landing Page (`/`)
Navbar fixa translúcida, hero com gradiente + mockup ilustrativo gerado, seções: Benefícios (4 cards com ícones lucide), Como Funciona (3 passos), Recursos (gerador roteiros + carrosséis), Depoimentos (3-4 cards), Preços (Gratuito vs Pro), FAQ (accordion shadcn), CTA final, Footer completo. Todo conteúdo em PT-BR.

### Fase 3 — Autenticação
- Rota pública `/auth` com tabs login/cadastro (email+senha) + botão Google OAuth via `lovable.auth.signInWithOAuth("google")`.
- Rota `/auth/forgot` e `/reset-password`.
- Configurar provider Google via `supabase--configure_social_auth`.
- Layout protegido `_authenticated/route.tsx` gerenciado pela integração.

### Fase 4 — Dashboard (`/_authenticated/*`)
- Sidebar shadcn (Dashboard, Gerar Roteiro, Gerar Carrossel, Histórico, Favoritos, Perfil, Configurações) + topbar com SidebarTrigger e contador de créditos.
- `/app` (dashboard home): 4 cards de resumo (gerados, créditos, favoritos, plano) + atalhos rápidos + últimas 5 gerações.

### Fase 5 — Geradores
- **Server functions** `src/lib/generators.functions.ts`:
  - `generateScript({ niche, theme, goal, platform, duration, tone })` → retorna { title, hook, scenes[], onScreenTexts[], bRoll[], cta, caption, hashtags[] }
  - `generateCarousel({ niche, theme, goal, slides, structure })` → retorna { title, slides[{n, text, visual}], cta, caption }
  - Ambas: `requireSupabaseAuth`, valida créditos (>0 ou plano pro), decrementa crédito (se free), persiste em `generations`, delay 1.2s, retorna mock realista bem detalhado. Comentário `// TODO: integrar OpenAI aqui`.
- **UI**: `/app/script` e `/app/carousel` com formulário shadcn + card de resultado com botão Copiar por bloco e geral, botão Favoritar.
- Bloqueio quando créditos=0: modal/CTA de upgrade.

### Fase 6 — Histórico, Favoritos, Perfil, Upgrade
- `/app/history`: lista com filtros (tipo, busca), ações Duplicar/Favoritar/Excluir/Ver.
- `/app/favorites`: mesma UI filtrada.
- `/app/profile` e `/app/settings`: editar nome, avatar, e-mail (read-only), trocar senha.
- `/app/upgrade`: mock de checkout (botão "Assinar Pro" que só simula confirmação).

### Fase 7 — Polimento
- Toasts (sonner) para todas as ações.
- Loading states com Skeleton.
- Empty states em histórico/favoritos.
- SEO: head() único por rota + sitemap.xml + robots.txt.
- Imagem gerada para o mockup do hero.

### Detalhes técnicos
- TanStack Query para todas as leituras (`useSuspenseQuery` + `ensureQueryData` nos loaders de `_authenticated`).
- Tipos do banco gerados via Lovable Cloud.
- Sem chamadas a IA real — apenas mocks ricos + estrutura pronta.
- `attachSupabaseAuth` já wired pela integração.
- Sem hardcode de cores em componentes — só tokens.

### Escopo NÃO incluído (mock/futuro)
- Pagamento real (Stripe). Upgrade só simula.
- E-mails transacionais customizados.
- Geração real de IA (estrutura pronta, mock no lugar).
