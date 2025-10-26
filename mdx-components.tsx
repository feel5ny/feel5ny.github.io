import {useMDXComponents as getBlogMDXComponents} from 'nextra-theme-blog'
import {useMDXComponents as getNextraComponents} from 'nextra/mdx-components'

const blogComponents = getBlogMDXComponents({
    h1: ({children}) => (
        <h1 className="custom-h1">
            {children}
        </h1>
    ),
    DateFormatter: ({date}) =>
        `Last updated at ${date.toLocaleDateString('en', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}`
})


const defaultComponents = getNextraComponents({
    wrapper({children, toc}) {
        return (
            <>
                {children}

                {/*<TOC toc={toc}/>*/}
            </>
        )
    }
})

export function useMDXComponents() {
    return {
        ...blogComponents,
        ...defaultComponents
    }
}