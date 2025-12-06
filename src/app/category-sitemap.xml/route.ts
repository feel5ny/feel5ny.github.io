// src/app/category-sitemap.xml/route.ts
// 카테고리 사이트맵
export const dynamic = 'force-static';

import { getCategories } from '@/lib/get-categories';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

export async function GET() {
  const categories = await getCategories();

  const categoryUrls: string[] = [];

  categories.forEach(category => {
    // 대카테고리 URL
    categoryUrls.push(`    <url>
        <loc>${baseUrl}/categories/${encodeURIComponent(category.slug)}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`);

    // 소카테고리 URL
    if (category.subCategories && category.subCategories.length > 0) {
      category.subCategories.forEach(subCategory => {
        categoryUrls.push(`    <url>
        <loc>${baseUrl}/categories/${encodeURIComponent(category.slug)}/${encodeURIComponent(subCategory.slug)}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>`);
      });
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categoryUrls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

