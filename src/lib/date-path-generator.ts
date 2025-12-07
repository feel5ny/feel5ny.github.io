import { getPosts, PostItem } from '@/lib/get-posts';
import type { UrlMapping } from '@/lib/url-mapping';

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

// URL 매핑에서 날짜 기반 경로 생성
function generatePathsFromMappings(
  urlMapping: UrlMapping[],
  addedPaths: Set<string>
): DateBasedParam[] {
  const dateBasedParams: DateBasedParam[] = [];

  urlMapping.forEach(mapping => {
    if (!mapping.date) return;

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
          dateBasedParams.push({ mdxPath: pathParts });
          addedPaths.add(pathKey);
        }
      }
      return;
    }

    // oldUrl이 없으면 newUrl과 date를 사용하여 경로 생성
    if (mapping.newUrl) {
      const title = mapping.newUrl.replace('/posts/', '').replace(/^\//, '');
      if (!title) return;

      try {
        const date = new Date(mapping.date);
        const [year, month, day] = createDatePathSegments(date);
        const pathKey = `${year}/${month}/${day}/${title}`;

        if (!addedPaths.has(pathKey)) {
          dateBasedParams.push({
            mdxPath: [year, month, day, title],
          });
          addedPaths.add(pathKey);
        }
      } catch (error) {
        console.warn(`⚠️  Failed to parse date for mapping: ${mapping.newUrl}`, error);
      }
    }
  });

  return dateBasedParams;
}

// 포스트에서 날짜 기반 경로 생성
function generatePathsFromPosts(
  posts: PostItem[],
  urlMapping: UrlMapping[],
  addedPaths: Set<string>
): DateBasedParam[] {
  const dateBasedParams: DateBasedParam[] = [];

  posts.forEach(post => {
    if (!post.frontMatter?.date) return;

    // URL 매핑에서 날짜 기반 경로 찾기
    const mapping = urlMapping.find(m => m.newUrl === post.route);

    // 매핑이 있으면 이미 처리됨
    if (mapping?.date) return;

    // 매핑이 없으면 날짜 정보로 직접 생성
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
export async function generateDateBasedPaths(
  urlMapping: UrlMapping[]
): Promise<DateBasedParam[]> {
  const posts = await getPosts();
  const addedPaths = new Set<string>();

  const pathsFromMappings = generatePathsFromMappings(urlMapping, addedPaths);
  const pathsFromPosts = generatePathsFromPosts(posts, urlMapping, addedPaths);

  const allPaths = [...pathsFromMappings, ...pathsFromPosts];
  console.log(`📝 날짜 기반 경로 생성: ${allPaths.length}개`);

  return allPaths;
}

