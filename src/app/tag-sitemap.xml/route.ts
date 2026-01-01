// src/app/tag-sitemap.xml/route.ts
// 태그 사이트맵
export const dynamic = 'force-static';

import { getTags } from '@/lib/get-tags';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

export async function GET() {
  const tags = await getTags();

  const tagUrls = tags
    .map(tag => {
      return `    <url>
        <loc>${baseUrl}/tags/${encodeURIComponent(tag.name)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>`;
    })
    .join('\n');

  // 빈 사이트맵 방지: 최소한 루트 URL 포함
  const urls = tags.length > 0 
    ? tagUrls
    : `    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}




