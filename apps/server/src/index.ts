import fs from 'fs';
import {fileURLToPath} from 'url';
import {maskMessage} from './mask';
import {initBot} from './bot';
import {PROMPT_PATH} from './promptPath';
import type {Player} from './types';

export async function createServer(
  exp?: any,
  httpLib?: any,
  Socket?: any,
  maskFn: (text: string) => Promise<string> = maskMessage,
  initBotFn: (io: any, getPlayers: () => Player[]) => void = initBot
) {
  const expressLib = exp ?? (await import('express')).default;
  const httpMod = httpLib ?? (await import('http'));
  const SocketCtor = Socket ?? (await import('socket.io')).Server;
  const app = expressLib();
  const server = httpMod.createServer(app);
  const io = new SocketCtor(server, {cors: {origin: '*'}});

  app.use(expressLib.json());

  const players: Map<string, Player> = new Map();
  const personaList: string[] = [];

  app.patch('/prompt', (req: any, res: any) => {
    const body = typeof req.body === 'string' ? req.body : req.body.prompt;
    fs.writeFileSync(PROMPT_PATH, body);
    res.json({ok: true});
  });

  io.on('connection', (socket: any) => {
    socket.on('join', ({name, persona}: any) => {
      const player: Player = {id: socket.id, name, persona};
      players.set(socket.id, player);
      personaList.push(persona);
      io.emit('personas', personaList.slice());
    });

    socket.on('chat:message', async (text: string) => {
      const masked = await maskFn(text);
      io.emit('broadcast', {id: socket.id, message: masked});
    });

    socket.on('guess', (target: string) => {
      io.emit('guess', {id: socket.id, target});
    });

    socket.on('disconnect', () => {
      players.delete(socket.id);
    });
  });

  initBotFn(io, () => Array.from(players.values()));

  return {app, server, io};
}

export async function start() {
  const {server} = await createServer();
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`server running on ${port}`);
  });
}

if (import.meta.main) {
  start();
}
