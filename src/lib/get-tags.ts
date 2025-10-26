import {getPosts} from "@/lib/get-posts";

export async function getTags(): Promise<string[]> {
    const posts = await getPosts();
    const tags = posts.flatMap((post) => post.frontMatter?.tags || []);
    return [...new Set(tags)]; // Remove duplicates
}