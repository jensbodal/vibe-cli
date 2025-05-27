# Replace __dirname with import.meta.url

This task updates server files to derive `__dirname` using `fileURLToPath(import.meta.url)`. Both `apps/server/src/bot.ts` and `apps/server/src/index.ts` now compute their own `__dirname` variable so paths resolve correctly in ESM environments.
