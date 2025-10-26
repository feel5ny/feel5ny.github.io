import * as React from 'react';
import {getPosts} from "@/lib/get-posts";
import {Link} from "next-view-transitions";
import {IconTags} from "@tabler/icons-react";
import {formatDate} from "@/lib/format-date";

type Props = {
    first?: number;
    tags?: string[];
    excludeByTitle?: string;
};

export async function Posts({first, tags, excludeByTitle}: Props) {
    const posts = await getPosts()

    // Filter by tags if provided
    let filteredPosts = tags && tags.length > 0
        ? posts.filter(post =>
            tags.some(tag => post.frontMatter.tags?.includes(tag))
        )
        : posts;

    // Exclude by title if provided
    if (excludeByTitle) {
        filteredPosts = filteredPosts.filter(post => post.title !== excludeByTitle);
    }

    // Apply first limit if provided
    const displayPosts = first ? filteredPosts.slice(0, first) : filteredPosts;
    const hasMore = first && filteredPosts.length > first;

    return (
        <div className="space-y-4 not-prose">
            {displayPosts.map(post => {
                return (
                    <div key={post.route} className="flex flex-wrap">
                        <div className="w-[100px]">
                            <div className="text-sm text-muted-foreground pt-1">
                                <div>
                                    {formatDate(post.frontMatter.date)}
                                </div>
                            </div>
                        </div>
                        <div className="w-[calc(100%-100px)]">
                            <div className="font-bold text-black">
                                <Link href={post.route} className="hover:underline">
                                    {post.title}
                                </Link>
                            </div>
                            <div className="flex gap-1 text-sm">
                                <IconTags className="w-4 min-w-4 -translate-y-0.5 text-muted-foreground"/>
                                <div className="flex flex-wrap gap-x-1">
                                    {post.frontMatter.tags.map((tag: string, index: number) => {
                                        return (
                                            <Link key={tag} href={`/tags/${tag}`} className="text-sm hover:underline">
                                                <span>{tag}{index < post.frontMatter.tags.length - 1 && ", "}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {hasMore && (
                <div className="pt-2">
                    <Link href="/posts" className="text-sm hover:underline">
                        View all →
                    </Link>
                </div>
            )}
        </div>
    );
}