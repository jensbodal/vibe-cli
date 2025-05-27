declare module 'express' { const x: any; export default x; }
declare module 'socket.io' { export class Server { constructor(...args: any[]); on(event: string, listener: (...args: any[]) => void): void; emit(event: string, ...args: any[]): void; } }
declare module 'ollama' { export class Ollama { constructor(...args: any[]); chat(req: any): Promise<{message: {content: string}}>; } }
declare module 'bun:test' { export const test: any; export const expect: any; export const beforeEach: any; export const afterEach: any; }
declare module 'http' { const x: any; export = x; }
declare module 'fs' { const x: any; export = x; }
declare module 'path' { const x: any; export = x; }
declare module 'url' { const x: any; export = x; export function fileURLToPath(u: string): string; }
declare module 'events' { export class EventEmitter { on(event: string, listener: (...args: any[]) => void): void; emit(event: string, ...args: any[]): void; addListener(event: string, listener: (...args: any[]) => void): void; } }
interface ImportMeta { url: string; main?: boolean; }
declare var process: any;
declare function setTimeout(...args: any[]): any;
declare var console: any;
