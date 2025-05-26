import {beforeEach, afterEach, expect, test} from 'bun:test';

let requests: any[] = [];

class MockClient {
  async chat(req: any) {
    requests.push(req);
    return {message: {content: 'masked response '}};
  }
}

let maskMessage: (text: string) => Promise<string>;

beforeEach(async () => {
  requests = [];
  (globalThis as any).__Ollama = MockClient;
  const mod = await import('../mask');
  maskMessage = mod.maskMessage;
});

afterEach(() => {
  delete (globalThis as any).__Ollama;
});

test('maskMessage calls ollama and trims output', async () => {
  const result = await maskMessage('hello');
  expect(result).toBe('masked response');
  expect(requests.length).toBe(1);
  expect(requests[0].messages[1].content).toBe('MESSAGE: hello');
});
