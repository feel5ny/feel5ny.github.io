import { getPosts, PostItem } from '@/lib/get-posts';
import { isDateBasedPath, isYearOnlyPath } from '@/lib/path-utils';

// 포스트 찾기 (여러 방법으로 시도)
function findPostByTitle(posts: PostItem[], title: string): PostItem | undefined {
  return posts.find(post => {
    const postTitle = post.route.replace('/posts/', '').replace(/^\//, '');

    // 정확한 매칭
    if (postTitle === title) return true;

    // URL 디코딩된 title과 비교
    try {
      const decodedTitle = decodeURIComponent(title);
      if (postTitle === decodedTitle) return true;
    } catch {
      // 디코딩 실패 무시
    }

    // 인코딩된 postTitle과 비교
    try {
      const encodedPostTitle = encodeURIComponent(postTitle);
      if (encodedPostTitle === title) return true;
    } catch {
      // 인코딩 실패 무시
    }

    return false;
  });
}

// 날짜 기반 경로를 실제 파일 경로로 변환
async function resolveDateBasedPath(mdxPath: string[]): Promise<string[]> {
  const title = decodeURIComponent(mdxPath[3]);

  // title로 직접 찾기
  const posts = await getPosts();
  const post = findPostByTitle(posts, title);

  if (post) {
    return post.route.replace(/^\//, '').split('/');
  }

  // 포스트를 찾지 못하면 빈 배열 반환 (나중에 notFound 호출)
  console.warn(`⚠️  Post not found for date-based path: ${mdxPath.join('/')}`);
  return [];
}

// 경로 해결
export async function resolvePath(mdxPath: string[]): Promise<string[]> {
  // 빈 경로나 루트 경로 처리
  if (!mdxPath || mdxPath.length === 0) {
    return [];
  }

  // 연도만 있는 경로는 [year] 라우트가 처리하도록 빈 배열 반환
  if (isYearOnlyPath(mdxPath)) {
    return [];
  }

  // 날짜 기반 경로인지 확인
  if (isDateBasedPath(mdxPath)) {
    return resolveDateBasedPath(mdxPath);
  }

  return mdxPath;
}

