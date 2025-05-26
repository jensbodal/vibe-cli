import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import fs from 'fs';
import path from 'path';
import {maskMessage} from './mask';
import {initBot} from './bot';
import {Player} from './types';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: '*'}});

app.use(express.json());

const players: Map<string, Player> = new Map();
const personaList: string[] = [];

app.patch('/prompt', (req, res) => {
  const body = typeof req.body === 'string' ? req.body : req.body.prompt;
  const promptPath = path.join(__dirname, '../../prompts/bot_system.txt');
  fs.writeFileSync(promptPath, body);
  res.json({ok: true});
});

io.on('connection', (socket) => {
  socket.on('join', ({name, persona}) => {
    const player: Player = {id: socket.id, name, persona};
    players.set(socket.id, player);
    personaList.push(persona);
    io.emit('personas', personaList.slice());
  });

  socket.on('chat:message', async (text: string) => {
    const masked = await maskMessage(text);
    io.emit('broadcast', {id: socket.id, message: masked});
  });

  socket.on('guess', (target: string) => {
    io.emit('guess', {id: socket.id, target});
  });

  socket.on('disconnect', () => {
    players.delete(socket.id);
  });
});

initBot(io, () => Array.from(players.values()));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server running on ${port}`);
});
