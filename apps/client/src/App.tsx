import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

interface ChatMessage {
  id: string;
  message: string;
}

let socket: any;

export default function App() {
  const [name, setName] = useState('');
  const [persona, setPersona] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket = io();
    socket.on('broadcast', (msg: ChatMessage) => {
      setMessages((m: ChatMessage[]) => [...m, msg]);
    });
    socket.on('bot:message', (msg: ChatMessage) => {
      setMessages((m: ChatMessage[]) => [...m, msg]);
    });
    return () => { socket.disconnect(); };
  }, []);

  const join = () => {
    socket.emit('join', {name, persona});
    setJoined(true);
  };

  const send = () => {
    socket.emit('chat:message', input);
    setInput('');
  };

  if (!joined) {
    return (
      <div className="p-4 space-y-2">
        <input className="border" placeholder="name" value={name} onChange={(e: any) => setName(e.target.value)} />
        <textarea className="border w-full" placeholder="persona" value={persona} onChange={(e: any) => setPersona(e.target.value)} />
        <button className="bg-blue-500 text-white px-2" onClick={join}>Join</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="h-80 overflow-y-scroll border mb-2 p-2">
        {messages.map((m: ChatMessage, i: number) => (
          <div key={i} className="mb-1"><b>{m.id}:</b> {m.message}</div>
        ))}
      </div>
        <input className="border w-full" value={input} onChange={(e: any) => setInput(e.target.value)} onKeyDown={(e: any) => e.key==='Enter' && send()} />
    </div>
  );
}
