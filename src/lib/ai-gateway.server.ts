/**
 * Lovable AI Gateway client — server-only.
 * Calls google/gemini-2.5-flash with structured tool-calling to guarantee JSON output.
 */

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

export interface AIGenerateOptions {
  system: string;
  user: string;
  /** JSON schema (OpenAI tool-style) for the structured response. */
  schema: Record<string, unknown>;
  toolName?: string;
  model?: string;
  temperature?: number;
}

export async function aiGenerateJSON<T>(opts: AIGenerateOptions): Promise<T> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY ausente no servidor");

  const toolName = opts.toolName ?? "emit_result";
  const body = {
    model: opts.model ?? "google/gemini-2.5-flash",
    temperature: opts.temperature ?? 0.95,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: toolName,
          description: "Retorna o resultado estruturado.",
          parameters: opts.schema,
        },
      },
    ],
    tool_choice: { type: "function", function: { name: toolName } },
  };

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 429) throw new Error("Limite de requisições da IA atingido. Tente novamente em instantes.");
    if (res.status === 402) throw new Error("Créditos de IA insuficientes na conta Lovable. Adicione créditos.");
    throw new Error(`Falha da IA (${res.status}): ${text.slice(0, 200)}`);
  }

  const json = await res.json();
  const call = json?.choices?.[0]?.message?.tool_calls?.[0];
  const args = call?.function?.arguments;
  if (!args) throw new Error("Resposta da IA sem conteúdo estruturado");
  try {
    return JSON.parse(args) as T;
  } catch {
    throw new Error("Resposta da IA não é JSON válido");
  }
}
