import { getPosts, PostItem } from '@/lib/get-posts';

type PostNavigation = {
  prev: PostItem | null;
  next: PostItem | null;
};

function createDateBasedRoute(post: PostItem): string {
  if (!post.frontMatter?.date) {
    return post.route;
  }

  try {
    const date = new Date(post.frontMatter.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const title = post.route.replace('/posts/', '').replace(/^\//, '');

    return `/${year}/${month}/${day}/${title}/`;
  } catch {
    return post.route;
  }
}

export async function getPostNavigation(
  currentPostTitle: string
): Promise<PostNavigation> {
  const posts = await getPosts();
  const currentIndex = posts.findIndex(post => post.title === currentPostTitle);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return { prev, next };
}

export function getPostRoute(post: PostItem): string {
  return createDateBasedRoute(post);
}


