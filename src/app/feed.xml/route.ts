export const dynamic = 'force-static';

import { generateRssFeed } from '@/lib/generate-rss-feed';

export async function GET() {
  const xml = await generateRssFeed('feed.xml');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

