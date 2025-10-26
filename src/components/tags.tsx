import * as React from 'react';
import {Badge} from "@/components/ui/badge";
import {Link} from "next-view-transitions";
import {getTags} from "@/lib/get-tags";

type Props = {};

export async function Tags(props: Props) {
    const tags = await getTags()
    const allTags = Object.create(null)

    for (const tag of tags) {
        allTags[tag] ??= 0
        allTags[tag] += 1
    }
    return (
        <div className="not-prose">
            {Object.entries(allTags).map(([tag, count]: [string, number]) => (
                <Badge key={tag} variant="outline" asChild>
                    <Link key={tag} href={`/tags/${tag}`}>
                        {tag} <span className="opacity-50">({count})</span>
                    </Link>
                </Badge>
            ))}
        </div>
    );
}