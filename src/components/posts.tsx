import * as React from 'react';
import {getPosts} from "@/lib/get-posts";
import {Link} from "next-view-transitions";

type Props = {
    first?: number;
};

export async function Posts(props: Props) {
    const posts = await getPosts()
    const displayPosts = props.first ? posts.slice(0, props.first) : posts;
    const hasMore = props.first && posts.length > props.first;

    return (
        <div className="space-y-4 not-prose">
            {displayPosts.map(post => {
                return (
                    <div key={post.route} className="flex flex-wrap">
                        <div className="w-[100px]">
                            <div className="text-sm">{post.frontMatter.date}</div>
                        </div>
                        <div className="w-[calc(100%-100px)]">
                            <div className="font-bold text-[14px] text-black">
                                <Link href={post.route} className="hover:underline">
                                    {post.title}
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {post.frontMatter.tags.map((tag: string) => {
                                    return (
                                        <span key={tag} className="text-sm">{tag}</span>
                                    )
                                })}
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