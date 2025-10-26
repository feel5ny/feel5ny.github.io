import {PostCard} from 'nextra-theme-blog'
import {getPosts, getTags} from '../../posts/get-posts'
import type {Metadata} from 'next'

type TagPageParams = {
    tag: string
}

type TagPageProps = {
    params: Promise<TagPageParams>
}

export async function generateMetadata(props: TagPageProps): Promise<Metadata> {
    const params = await props.params
    return {
        title: `Posts Tagged with "${decodeURIComponent(params.tag)}"`
    }
}

export async function generateStaticParams(): Promise<TagPageParams[]> {
    const allTags = await getTags()
    return [...new Set(allTags)].map(tag => ({ tag }))
}

export default async function TagPage(props: TagPageProps) {
    const params = await props.params
    const posts = await getPosts()
    const decodedTag = decodeURIComponent(params.tag)

    return (
        <>
            <h1>Posts Tagged with &quot;{decodedTag}&quot;</h1>
            {posts
                .filter(post =>
                    post.frontMatter.tags?.includes(decodedTag)
                )
                .map(post => (
                    <PostCard key={post.route} post={post} />
                ))}
        </>
    )
}