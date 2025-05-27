// Minimal module stubs for TypeScript compilation without dependencies

declare module 'react';
declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
declare module 'react-dom/client' {
  export function createRoot(el: any): { render(children: any): void }
}
declare module 'socket.io-client' {
  export interface Socket {
    on(event: string, listener: (...args: any[]) => void): void
    emit(event: string, ...args: any[]): void
    disconnect(): void
  }
  export function io(): Socket
}
declare module 'socket.io' {
  export interface Server {
    on(event: string, listener: (...args: any[]) => void): void
    emit(event: string, ...args: any[]): void
  }
  export class Server implements Server {
    constructor(...args: any[])
    on(event: string, listener: (...args: any[]) => void): void
    emit(event: string, ...args: any[]): void
  }
}
declare module 'express';
declare module '@vitejs/plugin-react';
declare module 'vite';
declare module 'ollama';
declare module 'bun:test';
declare module 'fs';
declare module 'path';
declare module 'url';
declare module 'http';
