import {normalizePages} from 'nextra/normalize-pages'
import {getPageMap} from 'nextra/page-map'


export async function getPosts() {
    const { directories } = normalizePages({
        list: await getPageMap('/posts'),
        route: '/posts'
    })

    return directories
        .filter((post) => post.name !== 'index')
        .sort((a, b) => {
            const dateA = new Date(a.frontMatter?.date || '');
            const dateB = new Date(b.frontMatter?.date || '');
            return dateB.getTime() - dateA.getTime();
        });
}