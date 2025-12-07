import type { Metadata } from 'next';
import type { CustomMetadata } from '@/app/[[...mdxPath]]/page';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

// Canonical URL 생성
function createCanonicalUrl(mdxPath: string[]): string {
  if (!mdxPath || mdxPath.length === 0) {
    return `${BASE_URL}/`;
  }

  const path = '/' + mdxPath.join('/');
  return `${BASE_URL}${path}${path.endsWith('/') ? '' : '/'}`;
}

// Open Graph 이미지 URL 생성
function createOgImageUrl(thumbnail: string | undefined): string | undefined {
  if (!thumbnail) return undefined;

  return thumbnail.startsWith('http') ? thumbnail : `${BASE_URL}${thumbnail}`;
}

// 메타데이터 생성
export function generatePageMetadata(
  metadata: Metadata,
  mdxPath: string[],
  customMetadata: CustomMetadata
): Metadata {
  const canonicalUrl = createCanonicalUrl(mdxPath);
  const ogImage = createOgImageUrl(customMetadata.thumbnail);

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...(metadata.openGraph || {}),
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: (customMetadata.title as string) || 'Post thumbnail',
          },
        ],
      }),
    },
    twitter: {
      ...(metadata.twitter || {}),
      ...(ogImage && {
        card: 'summary_large_image',
        images: [ogImage],
      }),
    },
  };
}

