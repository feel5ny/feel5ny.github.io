export const dynamic = 'force-static';

import { getPosts } from '@/lib/get-posts';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

// XML 이스케이프 처리
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const allPosts = await getPosts();

  const posts = allPosts
    .map(post => {
      const title = escapeXml(post.title);
      const description = escapeXml(post.frontMatter.description || '');
      const link = `${baseUrl}${post.route}`;
      const pubDate = post.frontMatter.date
        ? new Date(post.frontMatter.date).toUTCString()
        : new Date().toUTCString();
      const guid = `${baseUrl}${post.route}`;

      return `    <item>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <guid>${guid}</guid>
      <pubDate>${pubDate}</pubDate><author>feel5.nayoung@gmail.com (김나영)</author>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>필오나영 블로그</title>
    <link>${baseUrl}</link>
    <description>Latest blog posts from Feel5ny</description>
    <language>ko-kr</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
