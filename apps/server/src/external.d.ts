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
declare namespace JSX { interface IntrinsicElements { [el: string]: any; } }
declare var document: any;
interface HTMLElement {}
declare module 'react' {
  const React: any;
  export default React;
  export function useState<T>(initial: T): [T, (v: T | ((v: T) => T)) => void];
  export function useEffect(cb: () => void, deps?: any[]): void;
}
declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
declare module 'react-dom/client' { export const createRoot: any; }
declare module 'socket.io-client' {
  export interface Socket {}
  export function io(...args: any[]): Socket;
  export default io;
}
declare module 'vite' {
  export const defineConfig: any;
}
declare module '@vitejs/plugin-react' { const x: any; export default x; }
type RequestInfo = any;
type RequestInit = any;
declare class Response {
  constructor(body?: any, init?: any);
  text(): Promise<string>;
}
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
declare class URL { constructor(url: string, base?: string); }
declare var global: any;
declare var require: any;
declare var module: any;
