import {generateStaticParamsFor, importPage} from 'nextra/pages'
import {useMDXComponents as getMDXComponents} from '../../../mdx-components'
import GiscusComments from "@/components/giscus-comments"
import type {Metadata} from 'next'
import React from "react";

// Define types for params and metadata
type PageParams = {
    mdxPath: string[]
}

type PageProps = {
    params: Promise<PageParams>
}

type CustomMetadata = Metadata & {
    enableComment?: boolean
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params
    const {metadata} = await importPage(params.mdxPath)
    return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: PageProps) {
    const params = await props.params
    const result = await importPage(params.mdxPath)
    const {default: MDXContent, toc, metadata} = result as {
        default: React.ComponentType<any>
        toc: any
        metadata: CustomMetadata
    }

    return (
        <Wrapper toc={toc} metadata={metadata}>
            <MDXContent {...props} params={params}/>

            {metadata.enableComment === true && <GiscusComments/>}
        </Wrapper>
    )
}