import {expect, test, mock} from 'bun:test';

let patchedPath: string | undefined;
let patchedBody: string | undefined;
let patchHandler: any;

mock.module('ollama', () => ({Ollama: class { chat() { return Promise.resolve({message:{content:'masked'}}); } }}));

mock.module('express', () => {
  const express = () => ({
    use: () => {},
    patch: (path: string, handler: any) => { patchHandler = handler; }
  });
  express.json = () => () => {};
  return { default: express };
});

mock.module('http', () => ({ default: { createServer: () => ({ listen: () => {} }) } }));
mock.module('socket.io', () => ({ Server: class { constructor() {} on() {} emit() {} } }));
mock.module('../bot', () => ({ initBot: () => {} }));

mock.module('fs', () => ({
  default: {
    writeFileSync: (p: string, body: string) => {
      patchedPath = p;
      patchedBody = body;
    }
  }
}));

await import('../index');

test('PATCH /prompt writes prompt file and responds', () => {
  const req = { body: { prompt: 'new prompt' } } as any;
  let jsonResp: any;
  const res = { json: (v: any) => { jsonResp = v; } } as any;
  patchHandler(req, res);
  expect(patchedPath?.endsWith('prompts/bot_system.txt')).toBe(true);
  expect(patchedBody).toBe('new prompt');
  expect(jsonResp.ok).toBe(true);
});
