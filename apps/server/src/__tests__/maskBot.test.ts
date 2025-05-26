import {expect, test, mock, beforeEach} from 'bun:test';

let chatCalledWith: any;

mock.module('ollama', () => {
  class MockOllama {
    chat(args: any) {
      chatCalledWith = args;
      return Promise.resolve({message: {content: 'masked'}});
    }
  }
  return {Ollama: MockOllama};
});
mock.module('fs', () => ({
  default: {
    readFileSync: () => 'system prompt',
    watch: () => {},
  }
}));

async function loadMask() {
  return (await import('../mask?test'));
}

beforeEach(() => { chatCalledWith = undefined; });

test('maskMessage returns trimmed content from ollama', async () => {
  const {maskMessage} = await loadMask();
  const res = await maskMessage('hello');
  expect(res).toBe('masked');
  expect(chatCalledWith.messages[1].content).toContain('hello');
});

let emitArgs: any[] = [];

class MockServer {
  handlers: Record<string, Function> = {};
  on(event: string, cb: Function) { this.handlers[event] = cb; }
  emit(event: string, data: any) { emitArgs.push({event, data}); }
  trigger(event: string, data: any) { return this.handlers[event]?.(data); }
}

mock.module('../mask', () => ({maskMessage: (t: string) => Promise.resolve(t)}));
mock.module('socket.io', () => ({Server: MockServer}));

async function loadBot() {
  return (await import('../bot?test'));
}

beforeEach(() => { emitArgs = []; });

test('initBot echoes chat through bot namespace', async () => {
  const {initBot} = await loadBot();
  const io: any = new MockServer();
  initBot(io as any, () => []);
  await io.trigger('broadcast', {id: 'user', message: 'hi'});
  expect(emitArgs[0]).toEqual({event: 'bot:message', data: {id: 'bot', message: 'masked'}});
});
