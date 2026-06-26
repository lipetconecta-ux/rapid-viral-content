import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Postviral.AI — Server functions for AI content generation.
 *
 * NOTE: Currently returns rich mocked content with a simulated delay.
 * TODO: Replace the mock blocks below with a real call to the OpenAI / Lovable AI
 *       gateway. Keep the input/output contract identical so the UI doesn't change.
 */

// ----------------- Schemas -----------------
const platformEnum = z.enum(["instagram", "tiktok", "facebook", "youtube_shorts"]);
const toneEnum = z.enum(["divertido", "inspirador", "educativo", "polemico", "vendedor", "autoridade"]);
const structureEnum = z.enum(["AIDA", "PAS", "Storytelling", "Lista"]);

const scriptInputSchema = z.object({
  niche: z.string().trim().min(2).max(120),
  theme: z.string().trim().min(2).max(200),
  goal: z.string().trim().min(2).max(200),
  platform: platformEnum,
  duration: z.string().trim().min(1).max(40),
  tone: toneEnum,
});

const carouselInputSchema = z.object({
  niche: z.string().trim().min(2).max(120),
  theme: z.string().trim().min(2).max(200),
  goal: z.string().trim().min(2).max(200),
  slides: z.number().int().min(3).max(10),
  structure: structureEnum,
});

export type ScriptInput = z.infer<typeof scriptInputSchema>;
export type CarouselInput = z.infer<typeof carouselInputSchema>;

export interface ScriptPayload {
  title: string;
  hook: string;
  scenes: { name: string; description: string; duration: string }[];
  onScreenTexts: string[];
  bRoll: string[];
  cta: string;
  caption: string;
  hashtags: string[];
}

export interface CarouselPayload {
  title: string;
  slides: { n: number; text: string; visual: string }[];
  cta: string;
  caption: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ----------------- Mock generators -----------------
function mockScript(input: ScriptInput): ScriptPayload {
  const platformLabel: Record<ScriptInput["platform"], string> = {
    instagram: "Instagram Reels",
    tiktok: "TikTok",
    facebook: "Facebook Reels",
    youtube_shorts: "YouTube Shorts",
  };
  return {
    title: `3 erros que estão te impedindo de crescer em ${input.niche}`,
    hook: `Se você está em ${input.niche} e ainda não viralizou, provavelmente está cometendo um destes 3 erros — eu mesmo cometi por 2 anos.`,
    scenes: [
      {
        name: "Cena 1 — Abertura forte (0-3s)",
        description: `Plano fechado no rosto, olhar direto na câmera. Diga o hook com energia. Tom ${input.tone}.`,
        duration: "0-3s",
      },
      {
        name: "Cena 2 — Erro #1",
        description: `Mostre o primeiro erro com clareza. Use exemplo real e visual de algo errado vs certo. Tema: ${input.theme}.`,
        duration: "3-10s",
      },
      {
        name: "Cena 3 — Erro #2",
        description: "Conte uma micro-história sua: quando você percebeu esse erro e o que aconteceu depois que corrigiu.",
        duration: "10-20s",
      },
      {
        name: "Cena 4 — Erro #3 + Virada",
        description: `Apresente o terceiro erro e dê o insight principal alinhado ao objetivo: "${input.goal}".`,
        duration: `20-${input.duration}`,
      },
      {
        name: "Cena 5 — Encerramento + CTA",
        description: "Plano aberto, sorrindo. Convide para comentar e seguir.",
        duration: "Últimos 3s",
      },
    ],
    onScreenTexts: [
      "ERRO #1 ⚠️",
      `Por que ninguém te conta isso?`,
      "ERRO #2 🚨",
      "Eu também caía nessa...",
      "ERRO #3 (o pior)",
      "SALVA esse vídeo 👇",
    ],
    bRoll: [
      "Print de notificações de seguidores entrando",
      "Time-lapse editando vídeo no celular",
      `Imagens de referência do nicho ${input.niche}`,
      "Reação genuína no rosto ao revelar o erro #3",
      "Texto animado destacando o número de cada erro",
    ],
    cta: "Comenta aqui qual desses erros você já cometeu — e segue pra parte 2 amanhã.",
    caption: `Você cometia algum desses 3 erros? 🤯\n\nSe esse vídeo te ajudou:\n→ SALVA pra rever\n→ COMPARTILHA com alguém que precisa ouvir isso\n→ COMENTA "EU" se você se identificou\n\nMe segue pra mais conteúdo sobre ${input.niche}.\n\nOtimizado para ${platformLabel[input.platform]}.`,
    hashtags: [
      `#${input.niche.toLowerCase().replace(/\s+/g, "")}`,
      "#dicas",
      "#viral",
      "#reels",
      "#conteudoorganico",
      "#marketingdigital",
      "#empreendedorismo",
      "#crescimento",
      "#instagram",
      "#criadoresdeconteudo",
    ],
  };
}

function mockCarousel(input: CarouselInput): CarouselPayload {
  const intros: Record<CarouselInput["structure"], string> = {
    AIDA: "Atenção: o que ninguém te conta sobre ",
    PAS: "Você sofre com ",
    Storytelling: "Tudo mudou pra mim quando eu entendi isso sobre ",
    Lista: `${input.slides - 2} verdades sobre `,
  };

  const slides = Array.from({ length: input.slides }).map((_, i) => {
    const n = i + 1;
    if (n === 1) {
      return {
        n,
        text: `${intros[input.structure]}${input.theme}`,
        visual:
          "Capa impactante: tipografia grande, fundo escuro com gradiente violeta→rosa, foto de impacto centralizada.",
      };
    }
    if (n === input.slides) {
      return {
        n,
        text: `Salva esse carrossel e me segue pra mais sobre ${input.niche}.`,
        visual: "Slide final com seta apontando pro perfil + selo de salvar 💾.",
      };
    }
    return {
      n,
      text: `Insight #${n - 1}: ${input.structure === "PAS" && n === 2 ? `O verdadeiro problema é ${input.theme.toLowerCase()}` : `Aqui está uma verdade prática sobre ${input.theme.toLowerCase()} aplicada a ${input.niche}.`}`,
      visual:
        "Layout limpo, headline em destaque, ícone temático no topo, exemplo prático abaixo.",
    };
  });

  return {
    title: `${input.theme} — guia visual em ${input.slides} slides`,
    slides,
    cta: `Quer mais conteúdo assim? Me segue e ativa o sininho. Objetivo: ${input.goal}.`,
    caption: `📌 Carrossel essencial sobre ${input.theme}.\n\nSe te ajudou:\n→ SALVA pra reler depois\n→ ENVIA pra alguém de ${input.niche}\n→ COMENTA qual slide você mais curtiu\n\n#${input.niche.toLowerCase().replace(/\s+/g, "")} #carrossel #conteudo #dicas #viral`,
  };
}

// ----------------- Server functions -----------------
async function ensureAndConsumeCredit(supabase: any) {
  const { error } = await supabase.rpc("consume_credit");
  if (error) {
    if (error.message?.includes("CREDITS_EXHAUSTED")) {
      throw new Error("CREDITS_EXHAUSTED");
    }
    throw new Error("Falha ao verificar créditos");
  }
}


export const generateScript = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => scriptInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await ensureAndConsumeCredit(supabase);

    // TODO: Replace this block with a real OpenAI / Lovable AI Gateway call.
    // const completion = await aiGateway.chat.completions.create({ ... });
    await sleep(1200);
    const payload = mockScript(data);

    const { data: row, error } = await supabase
      .from("generations")
      .insert({
        user_id: userId,
        type: "script",
        title: payload.title,
        niche: data.niche,
        theme: data.theme,
        platform: data.platform,
        payload: payload as any,
        input: data as any,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    return { id: row.id as string, payload };
  });

export const generateCarousel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => carouselInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await ensureAndConsumeCredit(supabase);

    // TODO: Replace this block with a real OpenAI / Lovable AI Gateway call.
    await sleep(1200);
    const payload = mockCarousel(data);

    const { data: row, error } = await supabase
      .from("generations")
      .insert({
        user_id: userId,
        type: "carousel",
        title: payload.title,
        niche: data.niche,
        theme: data.theme,
        platform: null,
        payload: payload as any,
        input: data as any,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    return { id: row.id as string, payload };
  });

// ----------------- Reads -----------------
export const getDashboardData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [profileRes, subRes, creditRes, genCount, favCount, recent] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("credits").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("generations").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("favorites").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase
        .from("generations")
        .select("id, type, title, niche, platform, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    return {
      profile: profileRes.data,
      subscription: subRes.data,
      credits: creditRes.data,
      totalGenerations: genCount.count ?? 0,
      totalFavorites: favCount.count ?? 0,
      recent: recent.data ?? [],
    };
  });

export const listGenerations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [gens, favs] = await Promise.all([
      supabase
        .from("generations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase.from("favorites").select("generation_id").eq("user_id", userId),
    ]);
    const favSet = new Set((favs.data ?? []).map((f) => f.generation_id));
    return (gens.data ?? []).map((g) => ({ ...g, is_favorite: favSet.has(g.id) }));
  });

export const toggleFavorite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ generationId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("generation_id", data.generationId)
      .maybeSingle();
    if (existing) {
      await supabase.from("favorites").delete().eq("id", existing.id);
      return { favorited: false };
    }
    await supabase.from("favorites").insert({ user_id: userId, generation_id: data.generationId });
    return { favorited: true };
  });

export const deleteGeneration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("generations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const upgradeToPro = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // TODO: integrar Stripe / Mercado Pago aqui. Hoje só simula upgrade
    // através da função SECURITY DEFINER `upgrade_to_pro`.
    const { error } = await context.supabase.rpc("upgrade_to_pro");
    if (error) throw new Error(error.message);
    return { ok: true };
  });


export const updateProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        full_name: z.string().trim().min(1).max(120),
        avatar_url: z.string().url().max(500).optional().or(z.literal("")),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ full_name: data.full_name, avatar_url: data.avatar_url || null })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
