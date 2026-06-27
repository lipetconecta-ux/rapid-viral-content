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

// ----------------- AI prompt builders -----------------
const PLATFORM_LABEL: Record<ScriptInput["platform"], string> = {
  instagram: "Instagram Reels",
  tiktok: "TikTok",
  facebook: "Facebook Reels",
  youtube_shorts: "YouTube Shorts",
};

const SCRIPT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "hook", "scenes", "onScreenTexts", "bRoll", "cta", "caption", "hashtags"],
  properties: {
    title: { type: "string", description: "Título magnético do vídeo, específico ao tema." },
    hook: { type: "string", description: "Gancho dos primeiros 3 segundos. Frase única, forte, sem clichês." },
    scenes: {
      type: "array",
      minItems: 4,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "description", "duration"],
        properties: {
          name: { type: "string", description: "Ex: 'Cena 2 — Desenvolvimento'." },
          description: { type: "string", description: "Fala/ação ESPECÍFICA dessa cena. Sem repetir outras cenas." },
          duration: { type: "string", description: "Ex: '3-8s'." },
        },
      },
    },
    onScreenTexts: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 8 },
    bRoll: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 6 },
    cta: { type: "string" },
    caption: { type: "string", description: "Legenda pronta com quebras de linha e emojis." },
    hashtags: { type: "array", items: { type: "string" }, minItems: 6, maxItems: 12 },
  },
};

function buildScriptPrompt(input: ScriptInput): { system: string; user: string } {
  const system = `Você é um roteirista sênior de vídeos curtos virais (${PLATFORM_LABEL[input.platform]}).
Escreve em português do Brasil, direto, com gancho forte e cenas DIFERENTES entre si.
Regras obrigatórias:
- Cada cena tem um propósito ÚNICO (gancho, problema, virada, prova, CTA). Nunca repita ideias entre cenas.
- Fale do tema específico do usuário, não use lugares-comuns ("trabalhe duro", "acredite em você").
- Tom: ${input.tone}. Nicho: ${input.niche}.
- Inclua dados, exemplos concretos, números ou micro-histórias quando fizer sentido.
- Hashtags relevantes ao nicho, sem genéricos vazios tipo #viral #fyp sozinhos.`;
  const user = `Crie um roteiro para ${PLATFORM_LABEL[input.platform]} com duração ${input.duration}.
Nicho: ${input.niche}
Tema central: ${input.theme}
Objetivo do vídeo: ${input.goal}
Tom: ${input.tone}

Entregue o roteiro completo no formato estruturado.`;
  return { system, user };
}

const CAROUSEL_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "slides", "cta", "caption"],
  properties: {
    title: { type: "string" },
    slides: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["n", "text", "visual"],
        properties: {
          n: { type: "integer" },
          text: { type: "string", description: "Texto do slide. ÚNICO, sem repetir conteúdo de outros slides." },
          visual: { type: "string", description: "Direção visual específica desse slide (layout, cor, elemento)." },
        },
      },
    },
    cta: { type: "string" },
    caption: { type: "string" },
  },
};

function buildCarouselPrompt(input: CarouselInput): { system: string; user: string } {
  const structureGuide: Record<CarouselInput["structure"], string> = {
    AIDA: "Slide 1 = Atenção (gancho impossível de ignorar). Slides do meio = Interesse + Desejo (provas, exemplos, benefícios). Último = Ação (CTA).",
    PAS: "Slide 1 = Problema doloroso. Slides do meio = Agitação (consequências) → Solução prática passo-a-passo. Último = CTA.",
    Storytelling: "Slide 1 = Cena inicial intrigante. Slides do meio = jornada com reviravolta. Último = lição + CTA.",
    Lista: "Slide 1 = promessa numerada. Cada slide do meio = UM item da lista, distinto. Último = recapitulação + CTA.",
  };
  const system = `Você é um copywriter sênior especializado em carrosséis para Instagram.
Português do Brasil. Cada slide deve ter conteúdo ÚNICO — proibido repetir a mesma ideia em slides diferentes.
Estrutura escolhida (${input.structure}): ${structureGuide[input.structure]}
Regras:
- Texto curto, escaneável, frases impactantes.
- Concreto: dados, exemplos, comparações, mini-listas.
- Sem clichês genéricos. Especificidade > generalidade.
- Visual: descreva layout/cor/elemento gráfico do slide, diferente entre slides.`;
  const user = `Crie um carrossel de EXATAMENTE ${input.slides} slides (numerados de 1 a ${input.slides}).
Nicho: ${input.niche}
Tema central: ${input.theme}
Objetivo: ${input.goal}
Estrutura: ${input.structure}

Cada slide deve aprofundar/avançar — nunca repetir o anterior.`;
  return { system, user };
}

// ----------------- Server functions -----------------
async function ensureAndConsumeCredit(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await (supabaseAdmin.schema("private") as any).rpc("consume_credit", { _user_id: userId });
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
    await ensureAndConsumeCredit(userId);

    const { aiGenerateJSON } = await import("./ai-gateway.server");
    const { system, user } = buildScriptPrompt(data);
    const payload = await aiGenerateJSON<ScriptPayload>({ system, user, schema: SCRIPT_SCHEMA, toolName: "emit_script" });

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

    const { aiGenerateJSON } = await import("./ai-gateway.server");
    const { system, user } = buildCarouselPrompt(data);
    const payload = await aiGenerateJSON<CarouselPayload>({ system, user, schema: CAROUSEL_SCHEMA, toolName: "emit_carousel" });
    // Garante numeração sequencial mesmo se a IA escapar do contrato
    payload.slides = payload.slides.map((s, i) => ({ ...s, n: i + 1 }));

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
