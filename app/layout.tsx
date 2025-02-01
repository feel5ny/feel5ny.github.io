import {Footer, Layout, Navbar, ThemeSwitch} from 'nextra-theme-blog'
import {Banner, Head, Search} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import '../styles/globals.css'
import CustomFooter from "./_components/custom-footer";
import CustomHeader from "./_components/custom-header";

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
            <CustomHeader/>

            {children}

            <CustomFooter/>
        </Layout>
        </body>
        </html>
    )
}