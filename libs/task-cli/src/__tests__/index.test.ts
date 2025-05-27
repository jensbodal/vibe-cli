import {fetchRss, fetchArticle, summarize, run, cli} from '../index';
import {expect, test, beforeEach} from 'bun:test';

let fetchMock: (url: string) => Promise<Response>;

global.fetch = ((input: RequestInfo | URL) => {
  if (typeof input === 'string' || input instanceof URL) {
    return fetchMock(input.toString());
  }
  return fetchMock(String(input));
}) as typeof fetch;

function makeResponse(body: string): Response {
  return new Response(body, {status: 200});
}

beforeEach(() => {
  fetchMock = async (url: string) => {
    throw new Error(`unmocked url ${url}`);
  };
});

test('fetchRss parses items', async () => {
  const rss = `<?xml version="1.0"?><rss><channel><item><title>t1</title><link>https://a/1</link></item></channel></rss>`;
  fetchMock = async () => makeResponse(rss);
  const items = await fetchRss('https://feed');
  expect(items.length).toBe(1);
  expect(items[0]!.title).toBe('t1');
  expect(items[0]!.link).toBe('https://a/1');
});

test('fetchArticle returns text', async () => {
  fetchMock = async () => makeResponse('hello world');
  const text = await fetchArticle('https://a/1');
  expect(text).toBe('hello world');
});

test('summarize returns first five lines', () => {
  const text = Array.from({length: 10}, (_, i) => `line${i}`).join('\n');
  expect(summarize(text)).toBe(text.split('\n').slice(0,5).join('\n'));
});

test('run outputs summaries', async () => {
  const rss = `<?xml version="1.0"?><rss><channel><item><title>t1</title><link>https://a/1</link></item></channel></rss>`;
  const article = 'l1\nl2\nl3\nl4\nl5\nl6';
  let call = 0;
  fetchMock = async (url: string) => {
    call++;
    return makeResponse(call === 1 ? rss : article);
  };
  const logs: string[] = [];
  const original = console.log;
  console.log = (msg?: any, ...args: any[]) => {
    logs.push(String(msg));
    if (args.length) logs.push(...args.map(String));
  };
  await run(['https://feed']);
  console.log = original;
  expect(logs.some(l => l.includes('t1'))).toBe(true);
  expect(logs.some(l => l.includes('https://a/1'))).toBe(true);
});

test('cli exits with usage when no args', async () => {
  const originalExit = process.exit;
  const originalArgv = process.argv;
  const originalError = console.error;
  const errors: string[] = [];
  let exitCode: number | undefined;
  process.exit = ((code?: number) => {
    exitCode = code;
    throw new Error('exit');
  }) as any;
  console.error = (msg?: any) => {
    errors.push(String(msg));
  };
  process.argv = ['node', 'script'];
  try {
    await cli([]);
  } catch (e) {
    // expected exit
  }
  process.exit = originalExit;
  process.argv = originalArgv;
  console.error = originalError;
  expect(exitCode).toBe(1);
  expect(errors.some(e => e.includes('Usage'))).toBe(true);
});

test('cli runs successfully with feed', async () => {
  const rss = `<?xml version="1.0"?><rss><channel><item><title>t2</title><link>https://a/2</link></item></channel></rss>`;
  const article = 'a\nb\nc\nd\ne\nf';
  let call = 0;
  fetchMock = async () => makeResponse(call++ === 0 ? rss : article);
  const logs: string[] = [];
  const origLog = console.log;
  console.log = (msg?: any) => { logs.push(String(msg)); };
  await cli(['https://feed']);
  console.log = origLog;
  expect(logs.some(l => l.includes('t2'))).toBe(true);
});
