import {expect, test} from 'bun:test';
import {EventEmitter} from 'events';
import {createServer, runServer} from '../index';

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

test('chat messages are masked and broadcast', async () => {
  const express = makeExpress;
  const maskFn = async (t: string) => `m:${t}`;
  class IOServer extends MockSocket {}
  const {io} = await createServer(express as any, http as any, IOServer as any, maskFn, () => {});
  const socket = new MockSocket();
  io.emit('connection', socket);
  const messages: any[] = [];
  io.on('broadcast', (m: any) => messages.push(m));
  socket.emit('chat:message', 'hello');
  await new Promise(r => setTimeout(r, 0));
  expect(messages[0].message).toBe('m:hello');
});

test('listen failure logs an error', () => {
  const server: any = {
    listen: (_: any, cb: (err?: Error) => void) => {
      cb(new Error('fail'));
    }
  };
  const errs: any[] = [];
  const origError = console.error;
  console.error = (msg: any) => errs.push(msg);

  runServer(server, 3000);

  console.error = origError;
  expect(errs.some((m) => String(m).includes('server failed to start'))).toBe(true);
});
