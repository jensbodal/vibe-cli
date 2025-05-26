const baseUrl =
  process.env.OPENAI_BASE_URL ||
  process.env.OLLAMA_BASE_URL ||
  'http://localhost:11434';

let client: {chat: (req: any) => Promise<{message: {content: string}}>} | null =
  null;

async function getClient() {
  if (client) return client;
  const Ollama = (globalThis as any).__Ollama || (await import('ollama')).Ollama;
  client = new Ollama({baseUrl});
  return client;
}

const SYSTEM_PROMPT = `You are a content filter. Rewrite "MESSAGE:" so it retains meaning but removes real names, addresses, age, phone numbers, or direct declarations of identity.\nIf already anonymised, output it unchanged.`;

export async function maskMessage(text: string): Promise<string> {
  const c = await getClient();
  const res = await c.chat({
    model: process.env.MASK_MODEL || 'llama2',
    messages: [
      {role: 'system', content: SYSTEM_PROMPT},
      {role: 'user', content: `MESSAGE: ${text}`}
    ]
  });
  return res.message.content.trim();
}
