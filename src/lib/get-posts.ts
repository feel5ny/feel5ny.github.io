import { normalizePages } from 'nextra/normalize-pages';
import { getPageMap } from 'nextra/page-map';

type GetPostsOptions = {
  first?: number;
  tags?: string[];
  excludeByTitle?: string;
};
export type PostItem = {
  title: string;
  name: string;
  route: string;
  type: string;
  frontMatter: {
    title: string;
    date: string;
    tags: string[];
    categories?: string[]; // 카테고리 필드 추가 (2 depth: [대카테고리, 소카테고리])
    description: string;
    enableComment: boolean;
    filePath: string;
    timestamp: number;
    thumbnail?: string; // 썸네일 이미지 경로
  };
};

export async function getPosts(options: GetPostsOptions = {}): Promise<PostItem[]> {
  const { first, tags, excludeByTitle } = options;

  // Get posts from /posts directory
  const { directories } = normalizePages({
    list: await getPageMap('/posts'),
    route: '/posts',
  });

  // Sort posts by date
  // frontMatter가 있는 포스트만 필터링
  let posts = directories
    .filter(post => post.name !== 'index' && post.frontMatter)
    .sort((a, b) => {
      const dateA = new Date(a.frontMatter?.date || '');
      const dateB = new Date(b.frontMatter?.date || '');
      return dateB.getTime() - dateA.getTime();
    });

  // Filter by tags if provided
  if (tags && tags.length > 0) {
    posts = posts.filter(
      post =>
        post.frontMatter &&
        post.frontMatter.tags &&
        tags.some(tag => post.frontMatter.tags?.includes(tag))
    );
  }

  // Exclude by title if provided
  if (excludeByTitle) {
    posts = posts.filter(post => post.title !== excludeByTitle);
  }

  // Apply first limit if provided
  if (first) {
    posts = posts.slice(0, first);
  }

  return posts as unknown as PostItem[];
}

// 연도별 포스트 가져오기
export async function getPostsByYear(year: number): Promise<PostItem[]> {
  const posts = await getPosts();
  return posts.filter(post => {
    if (!post.frontMatter?.date) return false;
    const postYear = new Date(post.frontMatter.date).getFullYear();
    return postYear === year;
  });
}
