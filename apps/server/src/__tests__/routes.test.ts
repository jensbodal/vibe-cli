import {expect, test} from 'bun:test';
import {EventEmitter} from 'events';
import fs from 'fs';
import {createServer} from '../index';

function makeExpress() {
  const handlers: Record<string, any> = {};
  const app: any = {
    handlers,
    use() {},
    patch(path: string, handler: any) {
      handlers[path] = handler;
    }
  };
  return app;
}
makeExpress.json = () => {};

class MockSocket extends EventEmitter {
  emit(event: string, ...args: any[]) {
    super.emit(event, ...args);
  }
}

const http = {
  createServer(app: any) {
    return {app, listen: (_: any, cb: any) => cb && cb()};
  }
};

const noop = async (t: string) => t;

function makeServer() {
  class IOServer extends MockSocket {}
  return createServer(makeExpress as any, http as any, IOServer as any, noop, () => {});
}

test('PATCH /prompt saves new prompt', async () => {
  const {app} = await makeServer();
  const handler = (app as any).handlers['/prompt'];
  let pathArg = '';
  let bodyArg = '';
  const original = fs.writeFileSync;
  (fs as any).writeFileSync = (p: any, d: any) => { pathArg = String(p); bodyArg = String(d); };
  let jsonData: any;
  handler({body: 'new'}, {json: (d: any) => { jsonData = d; }});
  (fs as any).writeFileSync = original;
  expect(pathArg.includes('bot_system.txt')).toBe(true);
  expect(bodyArg).toBe('new');
  expect(jsonData.ok).toBe(true);
});

function setupConnection() {
  return makeServer().then(({io}) => {
    const socket = new MockSocket() as any;
    socket.id = 's1';
    io.emit('connection', socket);
    return {io, socket};
  });
}

test('join broadcasts personas list', async () => {
  const {io, socket} = await setupConnection();
  const personas: any[] = [];
  io.on('personas', (p: any) => personas.push(p));
  socket.emit('join', {name: 'a', persona: 'p1'});
  await new Promise(r => setTimeout(r, 0));
  expect(personas).toEqual([['p1']]);
});

test('guess event broadcasts target', async () => {
  const {io, socket} = await setupConnection();
  const guesses: any[] = [];
  io.on('guess', (g: any) => guesses.push(g));
  socket.emit('guess', 'p2');
  await new Promise(r => setTimeout(r, 0));
  expect(guesses).toEqual([{id: 's1', target: 'p2'}]);
});
