import {Ollama} from 'ollama';

const baseUrl = process.env.OPENAI_BASE_URL || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const client = new Ollama({baseUrl});

const SYSTEM_PROMPT = `You are a content filter. Rewrite "MESSAGE:" so it retains meaning but removes real names, addresses, age, phone numbers, or direct declarations of identity.\nIf already anonymised, output it unchanged.`;

export async function maskMessage(text: string): Promise<string> {
  const res = await client.chat({
    model: process.env.MASK_MODEL || 'llama2',
    messages: [
      {role: 'system', content: SYSTEM_PROMPT},
      {role: 'user', content: `MESSAGE: ${text}`}
    ]
  });
  return res.message.content.trim();
}
