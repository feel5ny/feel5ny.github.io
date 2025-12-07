import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { PostDetail } from '@/components/post-detail';
import { getPosts } from '@/lib/get-posts';
import { readFileSync } from 'fs';
import { join } from 'path';

// Define types for params and metadata
type PageParams = {
  mdxPath: string[];
};

type PageProps = {
  params: Promise<PageParams>;
};

export type CustomMetadata = Metadata & {
  date?: string;
  enableComment?: boolean;
  tags?: string[];
  customList?: string; // JSON string
  customTodo?: string; // JSON string
  thumbnail?: string; // 썸네일 이미지 경로
};

// URL 매핑 로드 (빌드 시 날짜 기반 경로 생성용)
let urlMapping: Array<{ oldUrl: string; newUrl: string; date: string }> = [];
try {
  const mappingPath = join(process.cwd(), '../feel5ny_blog/docs/migration/nextra-url-mapping.json');
  const mappingData = readFileSync(mappingPath, 'utf-8');
  urlMapping = JSON.parse(mappingData);
} catch (error) {
  console.warn('⚠️  URL mapping file not found. Using default paths.');
}

// 정적 파일 경로인지 확인하는 헬퍼 함수
function isStaticAssetPath(mdxPath: string[]): boolean {
  if (!mdxPath || mdxPath.length === 0) return false;

  const firstSegment = mdxPath[0];
  // 정적 파일 확장자 체크
  const staticExtensions = [
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.webp',
    '.css',
    '.js',
    '.json',
    '.xml',
    '.txt',
  ];
  const lastSegment = mdxPath[mdxPath.length - 1];

  // 마지막 세그먼트가 정적 파일 확장자로 끝나는지 확인
  if (staticExtensions.some(ext => lastSegment.toLowerCase().endsWith(ext))) {
    return true;
  }

  // favicon, robots.txt 등 특정 파일명 체크
  if (
    firstSegment === 'favicon.ico' ||
    firstSegment === 'robots.txt' ||
    firstSegment === 'sitemap.xml'
  ) {
    return true;
  }

  return false;
}

// output: 'export' 모드에서는 dynamicParams를 사용할 수 없음
// 모든 경로는 generateStaticParams에서 생성되어야 함

// 날짜 기반 경로를 포함한 정적 경로 생성
export async function generateStaticParams() {
  // 기본 Nextra 경로 생성
  const defaultParams = await generateStaticParamsFor('mdxPath')();

  // 정적 파일 경로 필터링
  const filteredDefaultParams = defaultParams.filter(param => {
    const mdxPath = param.mdxPath || [];
    const pathArray = Array.isArray(mdxPath) ? mdxPath : [mdxPath];
    return !isStaticAssetPath(pathArray);
  });

  // 포스트에 대한 날짜 기반 경로 추가
  const posts = await getPosts();
  const dateBasedParams: Array<{ mdxPath: string[] }> = [];
  const addedPaths = new Set<string>(); // 중복 방지

  // URL 매핑의 모든 날짜 기반 경로 추가
  urlMapping.forEach(mapping => {
    if (mapping.date) {
      // oldUrl이 있으면 사용
      if (mapping.oldUrl) {
        const pathParts = mapping.oldUrl.replace(/^\//, '').replace(/\/$/, '').split('/');
        if (
          pathParts.length >= 4 &&
          /^\d{4}$/.test(pathParts[0]) &&
          /^\d{2}$/.test(pathParts[1]) &&
          /^\d{2}$/.test(pathParts[2])
        ) {
          const pathKey = pathParts.join('/');
          if (!addedPaths.has(pathKey)) {
            dateBasedParams.push({
              mdxPath: pathParts,
            });
            addedPaths.add(pathKey);
          }
        }
      } else if (mapping.newUrl) {
        // oldUrl이 없으면 newUrl과 date를 사용하여 경로 생성
        // newUrl: /posts/Communication_002 -> title: Communication_002
        const title = mapping.newUrl.replace('/posts/', '').replace(/^\//, '');
        if (title) {
          try {
            const date = new Date(mapping.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const pathKey = `${year}/${month}/${day}/${title}`;
            if (!addedPaths.has(pathKey)) {
              dateBasedParams.push({
                mdxPath: [String(year), month, day, title],
              });
              addedPaths.add(pathKey);
            }
          } catch (error) {
            console.warn(`⚠️  Failed to parse date for mapping: ${mapping.newUrl}`, error);
          }
        }
      }
    }
  });

  // 포스트에 대한 날짜 기반 경로 추가 (매핑에 없는 경우)
  posts.forEach(post => {
    if (!post.frontMatter?.date) return;

    // URL 매핑에서 날짜 기반 경로 찾기
    let mapping = urlMapping.find(m => m.newUrl === post.route);

    // 매핑이 없으면 날짜 정보로 직접 생성
    if (!mapping || !mapping.date) {
      const date = new Date(post.frontMatter.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // post.route: /posts/mentoring-01 -> title: mentoring-01
      const title = post.route.replace('/posts/', '').replace(/^\//, '');

      const pathKey = `${year}/${month}/${day}/${title}`;
      if (!addedPaths.has(pathKey)) {
        dateBasedParams.push({
          mdxPath: [String(year), month, day, title],
        });
        addedPaths.add(pathKey);
      }
    }
  });

  console.log(`📝 날짜 기반 경로 생성: ${dateBasedParams.length}개`);

  // 기본 경로와 날짜 기반 경로 합치기 (빈 경로도 포함)
  return [
    { mdxPath: [] }, // 루트 경로
    ...filteredDefaultParams,
    ...dateBasedParams,
  ];
}

// 날짜 기반 경로를 실제 파일 경로로 변환하는 헬퍼 함수
async function resolvePath(mdxPath: string[]): Promise<string[]> {
  // 빈 경로나 루트 경로 처리
  if (!mdxPath || mdxPath.length === 0) {
    return [];
  }

  // 연도만 있는 경로는 [year] 라우트가 처리하도록 빈 배열 반환
  if (mdxPath.length === 1 && /^\d{4}$/.test(mdxPath[0])) {
    return [];
  }

  // 날짜 기반 경로인지 확인: [year, month, day, title]
  if (
    mdxPath.length >= 4 &&
    /^\d{4}$/.test(mdxPath[0]) &&
    /^\d{2}$/.test(mdxPath[1]) &&
    /^\d{2}$/.test(mdxPath[2])
  ) {
    const title = decodeURIComponent(mdxPath[3]); // URL 디코딩
    const oldUrl = '/' + mdxPath.join('/') + '/';
    let mapping = urlMapping.find(m => m.oldUrl === oldUrl);

    // 매핑이 없으면 title로 직접 찾기
    if (!mapping) {
      const posts = await getPosts();
      // 여러 방법으로 포스트 찾기 시도
      let post = posts.find(p => {
        const postTitle = p.route.replace('/posts/', '').replace(/^\//, '');
        // 정확한 매칭
        if (postTitle === title) return true;
        // URL 디코딩된 title과 비교
        try {
          const decodedTitle = decodeURIComponent(title);
          if (postTitle === decodedTitle) return true;
        } catch (e) {
          // 디코딩 실패 무시
        }
        // 인코딩된 postTitle과 비교
        try {
          const encodedPostTitle = encodeURIComponent(postTitle);
          if (encodedPostTitle === title) return true;
        } catch (e) {
          // 인코딩 실패 무시
        }
        return false;
      });

      if (post) {
        // newUrl: /posts/mentoring-01 -> ['posts', 'mentoring-01']
        return post.route.replace(/^\//, '').split('/');
      }

      // 포스트를 찾지 못하면 빈 배열 반환 (나중에 notFound 호출)
      console.warn(`⚠️  Post not found for date-based path: ${mdxPath.join('/')}`);
      // 빈 배열을 반환하여 나중에 notFound 처리
      return [];
    } else {
      // 매핑이 있으면 매핑 사용
      return mapping.newUrl.replace(/^\//, '').split('/');
    }
  }
  return mdxPath;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const actualPath = await resolvePath(params.mdxPath);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

  try {
    const { metadata } = await importPage(actualPath);
    const customMetadata = metadata as CustomMetadata;

    // Canonical URL 생성
    let canonicalUrl = baseUrl;
    if (params.mdxPath && params.mdxPath.length > 0) {
      const path = '/' + params.mdxPath.join('/');
      canonicalUrl = `${baseUrl}${path}${path.endsWith('/') ? '' : '/'}`;
    } else {
      canonicalUrl = `${baseUrl}/`;
    }

    // Open Graph 이미지 생성 (thumbnail이 있는 경우)
    const ogImage = customMetadata.thumbnail
      ? customMetadata.thumbnail.startsWith('http')
        ? customMetadata.thumbnail
        : `${baseUrl}${customMetadata.thumbnail}`
      : undefined;

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
  } catch (error) {
    console.error(`Failed to import page for path: ${actualPath.join('/')}`, error);
    // Return default metadata if import fails
    return {
      title: 'Page Not Found',
    };
  }
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;

  // 정적 파일 경로는 404 반환
  if (params.mdxPath && isStaticAssetPath(params.mdxPath)) {
    notFound();
  }

  // 연도만 있는 경로는 [year] 라우트가 처리하도록 404 반환
  if (params.mdxPath && params.mdxPath.length === 1 && /^\d{4}$/.test(params.mdxPath[0])) {
    notFound();
  }

  const actualPath = await resolvePath(params.mdxPath);

  // 루트 경로는 허용 (빈 배열이면 루트 페이지)
  const isRootPath = !params.mdxPath || params.mdxPath.length === 0;

  // 빈 경로가 아닌데 resolvePath에서 빈 배열을 반환한 경우는 포스트를 찾지 못한 경우
  if (!isRootPath && (!actualPath || actualPath.length === 0)) {
    notFound();
  }

  let result;
  try {
    result = await importPage(actualPath);
  } catch (error) {
    console.error(`Failed to import page for path: ${actualPath.join('/')}`, error);
    notFound();
  }

  const {
    default: MDXContent,
    toc,
    metadata,
  } = result as {
    default: React.ComponentType<any>;
    toc: any;
    metadata: CustomMetadata;
  };

  // 포스트 페이지 판단: posts 디렉토리 내의 파일이거나, 날짜 기반 경로 (예: 2020/11/16/title)
  const isPostPage =
    params.mdxPath &&
    params.mdxPath.length > 0 &&
    (params.mdxPath.includes('posts') ||
      (params.mdxPath.length >= 3 &&
        /^\d{4}$/.test(params.mdxPath[0]) &&
        /^\d{2}$/.test(params.mdxPath[1]) &&
        /^\d{2}$/.test(params.mdxPath[2])));

  return (
    // @ts-ignore
    <Wrapper toc={toc} metadata={metadata}>
      {isPostPage && (
        <PostDetail metadata={metadata}>
          <MDXContent {...props} params={params} />
        </PostDetail>
      )}

      {!isPostPage && (
        <>
          <MDXContent {...props} params={params} />
        </>
      )}
    </Wrapper>
  );
}
