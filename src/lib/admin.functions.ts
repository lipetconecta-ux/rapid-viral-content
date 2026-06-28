import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function checkIsAdmin(userId: string): Promise<boolean> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error("Falha ao verificar permissões");
  return Boolean(data);
}

async function assertAdmin(_supabase: any, userId: string) {
  const ok = await checkIsAdmin(userId);
  if (!ok) throw new Error("Acesso negado: somente administradores");
}

export const adminIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await checkIsAdmin(context.userId);
    return { isAdmin };
  });

export const adminLookupUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        query: z.string().trim().min(3).max(200),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Try lookup by email via profiles first (RLS bypassed by service role)
    const q = data.query.toLowerCase();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q);

    let profileRow: any = null;
    if (isUuid) {
      const { data: p } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", q)
        .maybeSingle();
      profileRow = p;
    } else {
      const { data: p } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .ilike("email", q)
        .maybeSingle();
      profileRow = p;
    }

    if (!profileRow) {
      return { found: false as const };
    }

    const userId = profileRow.id as string;

    const [credits, subscription, genCount, recent] = await Promise.all([
      supabaseAdmin.from("credits").select("*").eq("user_id", userId).maybeSingle(),
      supabaseAdmin.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
      supabaseAdmin
        .from("generations")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabaseAdmin
        .from("generations")
        .select("id, type, title, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    return {
      found: true as const,
      profile: profileRow,
      credits: credits.data,
      subscription: subscription.data,
      totalGenerations: genCount.count ?? 0,
      recent: recent.data ?? [],
    };
  });

export const adminSetCredits = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        userId: z.string().uuid(),
        remaining: z.number().int().min(0).max(100000),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await (supabaseAdmin as any)
      .schema("private")
      .rpc("admin_set_credits", { _user_id: data.userId, _remaining: data.remaining });
    if (error) throw new Error(error.message);
    return { remaining: result as number };
  });
