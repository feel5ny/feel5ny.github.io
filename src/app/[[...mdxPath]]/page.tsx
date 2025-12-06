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

// 날짜 기반 경로를 포함한 정적 경로 생성
export async function generateStaticParams() {
  // 기본 Nextra 경로 생성
  const defaultParams = await generateStaticParamsFor('mdxPath')();

  // 포스트에 대한 날짜 기반 경로 추가
  const posts = await getPosts();
  const dateBasedParams: Array<{ mdxPath: string[] }> = [];

  posts.forEach(post => {
    if (!post.frontMatter?.date) return;

    // URL 매핑에서 날짜 기반 경로 찾기 (우선)
    let mapping = urlMapping.find(m => m.newUrl === post.route);

    // 매핑이 있으면 매핑 사용
    if (mapping && mapping.date) {
      // oldUrl: /2025/03/02/mentoring-01/
      const pathParts = mapping.oldUrl.replace(/^\//, '').replace(/\/$/, '').split('/');
      if (
        pathParts.length >= 4 &&
        /^\d{4}$/.test(pathParts[0]) &&
        /^\d{2}$/.test(pathParts[1]) &&
        /^\d{2}$/.test(pathParts[2])
      ) {
        // [year, month, day, title] 형태
        dateBasedParams.push({
          mdxPath: pathParts,
        });
      }
    } else {
      // 매핑이 없으면 날짜 정보로 직접 생성
      const date = new Date(post.frontMatter.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // post.route: /posts/mentoring-01 -> title: mentoring-01
      const title = post.route.replace('/posts/', '').replace(/^\//, '');

      dateBasedParams.push({
        mdxPath: [String(year), month, day, title],
      });
    }
  });

  console.log(`📝 날짜 기반 경로 생성: ${dateBasedParams.length}개`);

  // 기본 경로와 날짜 기반 경로 합치기
  return [...defaultParams, ...dateBasedParams];
}

// 날짜 기반 경로를 실제 파일 경로로 변환하는 헬퍼 함수
async function resolvePath(mdxPath: string[]): Promise<string[]> {
  // 빈 경로나 루트 경로 처리
  if (!mdxPath || mdxPath.length === 0) {
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

  try {
    const { metadata } = await importPage(actualPath);
    return metadata;
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
