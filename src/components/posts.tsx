import * as React from 'react';
import { getPosts, PostItem } from '@/lib/get-posts';
import { Link } from 'next-view-transitions';
import { IconArrowNarrowRight, IconTags } from '@tabler/icons-react';
import { formatDate } from '@/lib/format-date';
import { slugifyCategory } from '@/lib/get-categories';

type Props = {
  posts?: PostItem[];
  tags?: string[];
  excludeByTitle?: string;
  first?: number;
  showViewAllButton?: boolean;
};

export async function Posts({ posts, tags, excludeByTitle, first, showViewAllButton }: Props) {
  const displayPosts = posts ?? (await getPosts({ tags, excludeByTitle, first }));

  return (
    <div className="space-y-6 not-prose">
      {displayPosts.map(post => {
        const categories = post.frontMatter?.categories || [];
        const mainCategory = categories.length > 0 ? categories[0] : null;
        const subCategory = categories.length > 1 ? categories[1] : null;

        return (
          <div key={post.route} className="flex flex-wrap">
            <div className="w-[calc(100%-120px)]">
              {/* 카테고리 캡션 */}
              {mainCategory && (
                <div className="text-xs text-muted-foreground mb-1">
                  <Link
                    href={`/categories/${slugifyCategory(mainCategory)}/`}
                    className="hover:underline"
                  >
                    {mainCategory}
                  </Link>
                  {subCategory && (
                    <>
                      {' > '}
                      <Link
                        href={`/categories/${slugifyCategory(mainCategory)}/${slugifyCategory(subCategory)}/`}
                        className="hover:underline"
                      >
                        {subCategory}
                      </Link>
                    </>
                  )}
                </div>
              )}

              <div className="font-bold">
                {(() => {
                  // Parse the date from post.frontMatter.date
                  // Expecting format: 'YYYY-MM-DD'
                  let formattedRoute = post.route;
                  const { date } = post.frontMatter || {};

                  if (date) {
                    try {
                      const dateParts = date.split('-');
                      if (dateParts.length >= 3) {
                        const [year, month, day] = dateParts;
                        // Validate date parts
                        if (
                          year &&
                          month &&
                          day &&
                          year.length === 4 &&
                          month.length === 2 &&
                          day.length === 2
                        ) {
                          // Extract slug from post.route (e.g., /posts/mentoring-01 -> mentoring-01)
                          const slug = post.route.replace('/posts/', '').replace(/^\//, '');
                          if (slug) {
                            formattedRoute = `/${year}/${month}/${day}/${slug}`;
                          }
                        }
                      }
                    } catch (error) {
                      // If date parsing fails, use original route
                      console.warn('Failed to parse date for route:', post.route, error);
                    }
                  }

                  return (
                    <Link href={formattedRoute} className="hover:underline">
                      {post.title}
                    </Link>
                  );
                })()}
              </div>
              {post.frontMatter?.tags && post.frontMatter.tags.length > 0 && (
                <div className="flex gap-1 text-sm">
                  <IconTags className="w-4 min-w-4 -translate-y-0.5 text-muted-foreground" />
                  <div className="flex flex-wrap gap-x-1">
                    {post.frontMatter.tags.map((tagName, index: number) => {
                      return (
                        <Link
                          key={tagName}
                          href={`/tags/${tagName}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          <span>
                            {tagName}
                            {index < post.frontMatter.tags.length - 1 && ', '}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[120px] text-right">
              <div className="text-sm text-muted-foreground pt-1">
                <div>{post.frontMatter?.date ? formatDate(post.frontMatter.date) : ''}</div>
              </div>
            </div>
          </div>
        );
      })}

      {showViewAllButton === true && (
        <Link href="/posts" className="flex gap-1 items-center hover:underline">
          View all posts <IconArrowNarrowRight className="w-4" />
        </Link>
      )}
    </div>
  );
}
