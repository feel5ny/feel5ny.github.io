import GiscusComments from "../../_components/giscus-comments";

export default function CommentsLayout({children}) {
    return (
        <>
            {children}
            <GiscusComments/>
        </>
    )
}
