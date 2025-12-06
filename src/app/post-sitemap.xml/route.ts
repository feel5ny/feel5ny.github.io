// src/app/post-sitemap.xml/route.ts
// 포스트 사이트맵 (날짜 기반 URL 포함)
export const dynamic = 'force-static';

import { getPosts } from '@/lib/get-posts';
import { readFileSync } from 'fs';
import { join } from 'path';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

// URL 매핑 로드 (날짜 기반 URL 생성용)
let urlMapping: Array<{ oldUrl: string; newUrl: string; date: string }> = [];
try {
  const mappingPath = join(process.cwd(), '../feel5ny_blog/docs/migration/nextra-url-mapping.json');
  const mappingData = readFileSync(mappingPath, 'utf-8');
  urlMapping = JSON.parse(mappingData);
} catch (error) {
  console.warn('⚠️  URL mapping file not found. Using default paths.');
}

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
    // URL 매핑에서 날짜 기반 경로 찾기
    let mapping = urlMapping.find(m => m.newUrl === post.route);

    // 매핑이 없으면 날짜 정보로 직접 생성
    if (!mapping && post.frontMatter?.date) {
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
    } else if (mapping && mapping.date) {
      // 매핑이 있으면 매핑의 oldUrl 사용
      postUrls.push(`    <url>
        <loc>${baseUrl}${mapping.oldUrl}</loc>
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
