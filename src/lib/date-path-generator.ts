import { getPosts, PostItem } from '@/lib/get-posts';

type DateBasedParam = {
  mdxPath: string[];
};

// 날짜에서 경로 세그먼트 생성
function createDatePathSegments(date: Date): [string, string, string] {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return [String(year), month, day];
}

// 포스트에서 날짜 기반 경로 생성
function generatePathsFromPosts(
  posts: PostItem[],
  addedPaths: Set<string>
): DateBasedParam[] {
  const dateBasedParams: DateBasedParam[] = [];

  posts.forEach(post => {
    if (!post.frontMatter?.date) return;

    try {
      const date = new Date(post.frontMatter.date);
      const [year, month, day] = createDatePathSegments(date);
      const title = post.route.replace('/posts/', '').replace(/^\//, '');

      if (!title) return;

      const pathKey = `${year}/${month}/${day}/${title}`;
      if (!addedPaths.has(pathKey)) {
        dateBasedParams.push({
          mdxPath: [year, month, day, title],
        });
        addedPaths.add(pathKey);
      }
    } catch (error) {
      console.warn(`⚠️  Failed to parse date for post: ${post.route}`, error);
    }
  });

  return dateBasedParams;
}

// 모든 날짜 기반 경로 생성
export async function generateDateBasedPaths(): Promise<DateBasedParam[]> {
  const posts = await getPosts();
  const addedPaths = new Set<string>();

  const pathsFromPosts = generatePathsFromPosts(posts, addedPaths);

  console.log(`📝 날짜 기반 경로 생성: ${pathsFromPosts.length}개`);

  return pathsFromPosts;
}

