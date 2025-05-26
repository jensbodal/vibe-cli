import {beforeEach, afterEach, expect, test} from 'bun:test';
import {EventEmitter} from 'events';

let requests: any[] = [];
class MockClient {
  async chat(req: any) {
    requests.push(req);
    return {message: {content: 'bot says hi '}};
  }
}

let io: EventEmitter & {on: any; emit: any};
let messages: any[] = [];
let initBot: any;

beforeEach(async () => {
  requests = [];
  messages = [];
  io = new EventEmitter() as any;
  io.on = io.addListener;
  (globalThis as any).__Ollama = MockClient;
  const mod = await import('../bot');
  initBot = mod.initBot;
  initBot(io as any, () => []);
  io.on('bot:message', (m: any) => messages.push(m));
});

afterEach(() => {
  delete (globalThis as any).__Ollama;
});

test('bot responds to broadcast from user', async () => {
  io.emit('broadcast', {id: 'user1', message: 'hey'});
  await new Promise(r => setTimeout(r, 0));
  expect(requests.length).toBe(1);
  expect(messages.length).toBe(1);
  expect(messages[0].message).toBe('bot says hi');
});

test('bot ignores its own messages', async () => {
  io.emit('broadcast', {id: 'bot', message: 'ignore'});
  await new Promise(r => setTimeout(r, 0));
  expect(requests.length).toBe(0);
  expect(messages.length).toBe(0);
});
