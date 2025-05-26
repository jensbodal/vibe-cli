import fs from 'fs';
import path from 'path';
import {Server} from 'socket.io';
import {Ollama} from 'ollama';
import {Player} from './types';

const PROMPT_PATH = path.join(__dirname, '../../prompts/bot_system.txt');

let systemPrompt = fs.readFileSync(PROMPT_PATH, 'utf8');
fs.watch(PROMPT_PATH, () => {
  systemPrompt = fs.readFileSync(PROMPT_PATH, 'utf8');
});

const baseUrl = process.env.OPENAI_BASE_URL || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const client = new Ollama({baseUrl});

export function initBot(io: Server, getPlayers: () => Player[]) {
  io.on('bot:message', () => {/* noop to reserve namespace */});

  io.on('broadcast', async ({id, message}) => {
    if (id === 'bot') return;
    const res = await client.chat({
      model: process.env.BOT_MODEL || 'llama2',
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: message}
      ]
    });
    io.emit('bot:message', {id: 'bot', message: res.message.content.trim()});
  });
}
