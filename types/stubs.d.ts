// Minimal stub modules for TypeScript compilation without external deps

declare module 'react' {
  const React: any;
  export default React;
}

declare module 'react-dom/client' {
  export const createRoot: any;
}

declare module 'socket.io-client' {
  const io: any;
  export default io;
}

declare module '@vitejs/plugin-react' {
  const plugin: any;
  export default plugin;
}

declare module 'vite' {
  const config: any;
  export default config;
}

declare module 'express' {
  const exp: any;
  export default exp;
}

declare module 'socket.io' {
  export const Server: any;
}

declare module 'ollama' {
  const ollama: any;
  export default ollama;
}

declare module 'bun:test' {
  export const describe: any;
  export const it: any;
  export const expect: any;
  export const test: any;
  export const beforeEach: any;
}

declare module 'fs';
declare module 'path';
declare module 'url';
declare module 'http';

// Basic globals used in tests
declare var process: any;
declare var console: any;
declare var module: any;
declare var require: any;
declare var fetch: any;
declare var Response: any;
declare var RequestInfo: any;
declare var URL: any;
declare var global: any;
