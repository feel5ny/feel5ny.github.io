// @flow
import * as React from 'react';
import { Link } from 'next-view-transitions';
import { IconArrowBack, IconPoint } from '@tabler/icons-react';
import { formatDate } from '@/lib/format-date';
import GiscusComments from '@/components/giscus-comments';
import { CustomMetadata } from '@/app/[[...mdxPath]]/page';
import { Posts } from '@/components/posts';
import { CustomTOC } from '@/components/custom-toc';
import { CustomTodo } from '@/components/custom-todo';
import { PostThumbnail } from '@/components/post-thumbnail';

type Props = {
  metadata: CustomMetadata;
  children: React.ReactNode;
};

export function PostDetail({ metadata, children }: Props) {
  // Parse customList and customTodo from JSON strings
  let customList = null;
  let customTodo = null;

  try {
    if (metadata.customList) {
      customList = JSON.parse(metadata.customList);
    }
  } catch (e) {
    console.warn('Failed to parse customList:', e);
  }

  try {
    if (metadata.customTodo) {
      customTodo = JSON.parse(metadata.customTodo);
    }
  } catch (e) {
    console.warn('Failed to parse customTodo:', e);
  }

  const isPostPage = metadata.title === 'Posts';
  return (
    <>
      <div className="flex items-center gap-4 text-sm mb-6">
        <Link href="/posts" className="hover:underline no-underline flex items-center gap-1">
          <IconArrowBack className="w-4" />
          Back to Posts
        </Link>
        <IconPoint className="w-3" />
        <div>{formatDate(metadata.date)}</div>
      </div>
      {!isPostPage && <h1 className="text-3xl font-bold mb-6">{metadata.title as string}</h1>}

      {/* 썸네일 이미지 표시 */}
      {metadata.thumbnail && (
        <PostThumbnail
          thumbnail={metadata.thumbnail}
          alt={(metadata.title as string) || 'Post thumbnail'}
        />
      )}

      {/* Render custom TOC if available */}
      {/* {customList && <CustomTOC list={customList} />} */}
      {children}

      {/* Render custom TODO if available */}
      {/* {customTodo && <CustomTodo todo={customTodo} />} */}

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
