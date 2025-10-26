import type {PageMapItem} from 'nextra'
import {normalizePages} from 'nextra/normalize-pages'
import type {FC, ReactNode} from 'react'
import {NavbarLink} from './navbar-link'

type NavbarProps = {
    children?: ReactNode
    pageMap: PageMapItem[]
}

export const Navbar: FC<NavbarProps> = ({children, pageMap}) => {
    const {topLevelNavbarItems} = normalizePages({list: pageMap, route: '/'})
    return (
        <div
            className="flex items-center gap-3 justify-end"
            data-pagefind-ignore="all"
        >
            {topLevelNavbarItems.map(nav => (
                <NavbarLink key={nav.route} href={nav.route}>
                    {nav.title}
                </NavbarLink>
            ))}
            {children}

            <NavbarLink href="/rss.xml" target="_blank">
                RSS
            </NavbarLink>
        </div>
    )
}
