// src/app/post-sitemap.xml/route.ts
// 포스트 사이트맵 (날짜 기반 URL 포함)
export const dynamic = 'force-static';

import { getPosts } from '@/lib/get-posts';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

export async function GET() {
  const posts = await getPosts();

  const postUrls: string[] = [];

  posts.forEach(post => {
    const lastmod = post.frontMatter?.date
      ? new Date(post.frontMatter.date).toISOString()
      : new Date().toISOString();

    // 1. 기본 경로 (/posts/[slug])
    postUrls.push(`    <url>
        <loc>${baseUrl}${post.route}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`);

    // 2. 날짜 기반 경로 (/:year/:month/:day/:title/)
    if (post.frontMatter?.date) {
      const date = new Date(post.frontMatter.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // post.route: /posts/mentoring-01 -> title: mentoring-01
      const title = post.route.replace('/posts/', '').replace(/^\//, '');
      const dateBasedUrl = `/${year}/${month}/${day}/${title}/`;

      postUrls.push(`    <url>
        <loc>${baseUrl}${dateBasedUrl}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`);
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${postUrls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
