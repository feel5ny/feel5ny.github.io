import {Footer, Layout, Navbar, ThemeSwitch} from 'nextra-theme-blog'
import {Banner, Head, Search} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import '../styles/globals.scss'

export const metadata = {
    title: 'Blog Example'
}

export default async function RootLayout({children}) {
    const banner = (
        <Banner storageKey="4.0-release">
            🎉 Nextra 4.0 is released.{' '}
            <a href="#" className="x:text-primary-600">
                Read more →
            </a>
        </Banner>
    )

    return (
        <html lang="en" suppressHydrationWarning>
        <Head backgroundColor={{dark: '#0f172a', light: '#fefce8'}}/>
        <body>
        <Layout banner={banner}>
            <div className="flex items-center justify-between">
                <div>
                    LOGO
                </div>

                <div className="flex items-center">
                    <Navbar pageMap={await getPageMap()}/>
                    <Search/>
                    <ThemeSwitch/>
                </div>
            </div>

            {children}

            <Footer>
                <abbr
                    title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
                    style={{cursor: 'help'}}
                >
                    CC BY-NC 4.0
                </abbr>{' '}
                {new Date().getFullYear()} © PHUCBM.
                <a href="/feed.xml" style={{float: 'right'}}>
                    RSS
                </a>
            </Footer>
        </Layout>
        </body>
        </html>
    )
}