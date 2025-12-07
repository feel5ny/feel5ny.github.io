import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { PostDetail } from '@/components/post-detail';
import { isStaticAssetPath, isYearOnlyPath, isPostPage } from '@/lib/path-utils';
import { generateDateBasedPaths } from '@/lib/date-path-generator';
import { resolvePath } from '@/lib/path-resolver';
import { generatePageMetadata } from '@/lib/metadata-generator';

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

  // 날짜 기반 경로 생성
  const dateBasedParams = await generateDateBasedPaths();

  // 기본 경로와 날짜 기반 경로 합치기 (빈 경로도 포함)
  return [
    { mdxPath: [] }, // 루트 경로
    ...filteredDefaultParams,
    ...dateBasedParams,
  ];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const actualPath = await resolvePath(params.mdxPath);

  try {
    const { metadata } = await importPage(actualPath);
    const customMetadata = metadata as CustomMetadata;

    return generatePageMetadata(metadata, params.mdxPath, customMetadata);
  } catch (error) {
    console.error(`Failed to import page for path: ${actualPath.join('/')}`, error);
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
  if (params.mdxPath && isYearOnlyPath(params.mdxPath)) {
    notFound();
  }

  const actualPath = await resolvePath(params.mdxPath);

  // 루트 경로는 허용 (빈 배열이면 루트 페이지)
  const isRootPath = !params.mdxPath || params.mdxPath.length === 0;

  // 빈 경로가 아닌데 resolvePath에서 빈 배열을 반환한 경우는 포스트를 찾지 못한 경우
  if (!isRootPath && (!actualPath || actualPath.length === 0)) {
    notFound();
  }

  const result = await importPage(actualPath).catch(error => {
    console.error(`Failed to import page for path: ${actualPath.join('/')}`, error);
    notFound();
  });

  const {
    default: MDXContent,
    toc,
    metadata,
  } = result as {
    default: React.ComponentType<any>;
    toc: any;
    metadata: CustomMetadata;
  };

  // 포스트 페이지 판단
  const shouldShowPostDetail = params.mdxPath && isPostPage(params.mdxPath);

  const postDetailContent = shouldShowPostDetail ? (
    <PostDetail metadata={metadata}>
      <MDXContent {...props} params={params} />
    </PostDetail>
  ) : (
    <MDXContent {...props} params={params} />
  );

  return (
    // @ts-ignore
    <Wrapper toc={toc} metadata={metadata}>
      {postDetailContent}
    </Wrapper>
  );
}
