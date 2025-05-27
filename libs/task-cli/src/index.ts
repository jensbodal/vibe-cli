export interface NewsArticle {
  title: string;
  link: string;
  summary: string;
}

/**
 * Fetch an RSS feed and return a list of items. This uses a very naive XML
 * parser so it may not work for all feeds. In a real implementation you would
 * use a robust library.
 */
export async function fetchRss(url: string): Promise<NewsArticle[]> {
  const res = await fetch(url);
  const text = await res.text();
  const items = Array.from(text.matchAll(/<item>([\s\S]*?)<\/item>/g));
  return items.map((m) => {
    const content = (m[1] ?? "") as string;
    const titleMatch = /<title>(.*?)<\/title>/.exec(content);
    const linkMatch = /<link>(.*?)<\/link>/.exec(content);
    const title = (titleMatch?.[1] ?? "") as string;
    const link = (linkMatch?.[1] ?? "") as string;
    return { title, link, summary: "" } as NewsArticle;
  });
}

/**
 * Retrieve the article contents from the web.
 */
export async function fetchArticle(url: string): Promise<string> {
  const res = await fetch(url);
  return await res.text();
}

/**
 * Very simple summarization placeholder. In a real implementation this would
 * call an AI service like OpenAI to extract key information.
 */
export function summarize(text: string): string {
  return text.split("\n").slice(0, 5).join("\n");
}

export async function run(feedUrls: string[]) {
  const articles: NewsArticle[] = [];
  for (const url of feedUrls) {
    const feedItems = await fetchRss(url);
    for (const item of feedItems) {
      const html = await fetchArticle(item.link);
      const summary = summarize(html);
      articles.push({ ...item, summary });
    }
  }

  for (const art of articles) {
    console.log(`- ${art.title}\n  ${art.link}\n  ${art.summary}\n`);
  }
}

/* c8 ignore start */
export async function cli(args: string[] = process.argv.slice(2)) {
  if (args.length === 0) {
    console.error("Usage: task-cli <rss-feed-url> [rss-feed-url...]");
    process.exit(1);
  }
  await run(args);
}

if (require.main === module) {
  cli().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
/* c8 ignore end */
