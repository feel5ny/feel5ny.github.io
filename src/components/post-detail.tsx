// @flow
import * as React from 'react';
import { Link } from 'next-view-transitions';
import { IconArrowBack, IconPoint, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { formatDate } from '@/lib/format-date';
import GiscusComments from '@/components/giscus-comments';
import { CustomMetadata } from '@/app/[[...mdxPath]]/page';
import { Posts } from '@/components/posts';
import { PostThumbnail } from '@/components/post-thumbnail';
import { getPostNavigation, getPostRoute } from '@/lib/post-navigation';
import { ReadingProgress } from '@/components/reading-progress';

type Props = {
  metadata: CustomMetadata;
  children: React.ReactNode;
};

function parseJsonSafely(jsonString: string | undefined): unknown | null {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn('Failed to parse JSON:', e);
    return null;
  }
}

export async function PostDetail({ metadata, children }: Props) {
  const isPostPage = metadata.title === 'Posts';
  const navigation = await getPostNavigation(metadata.title as string);

  return (
    <>
      <ReadingProgress />
      <div className="flex items-center gap-4 text-sm mb-6">
        <Link href="/posts" className="hover:underline no-underline flex items-center gap-1">
          <IconArrowBack className="w-4" />
          Back to Posts
        </Link>
        <IconPoint className="w-3" />
        <div>{formatDate(metadata.date)}</div>
      </div>
      {!isPostPage && <h1 className="text-3xl font-bold mb-6">{metadata.title as string}</h1>}

      {metadata.thumbnail && (
        <PostThumbnail
          thumbnail={metadata.thumbnail}
          alt={(metadata.title as string) || 'Post thumbnail'}
        />
      )}

      {children}

      {(navigation.prev || navigation.next) && (
        <div className="flex justify-between items-center gap-4 my-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          {navigation.prev ? (
            <Link
              href={getPostRoute(navigation.prev)}
              className="flex items-center gap-2 text-sm group max-w-[45%] no-underline"
            >
              <IconChevronLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-foreground mb-1">Previous</span>
                <span className="font-medium truncate">{navigation.prev.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {navigation.next ? (
            <Link
              href={getPostRoute(navigation.next)}
              className="flex items-center gap-2 text-sm group max-w-[45%] ml-auto text-right no-underline"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-foreground mb-1">Next</span>
                <span className="font-medium truncate">{navigation.next.title}</span>
              </div>
              <IconChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : null}
        </div>
      )}

      <h2>Related</h2>
      <Posts tags={metadata.tags} excludeByTitle={metadata.title as string} first={5} />

      {metadata.enableComment === true && (
        <div className="pt-32">
          <GiscusComments />
        </div>
      )}
    </>
  );
}
