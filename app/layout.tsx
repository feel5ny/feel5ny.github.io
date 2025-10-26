import {Layout} from 'nextra-theme-blog'
import {Banner, Head} from 'nextra/components'
import 'nextra-theme-blog/style.css'
import '../styles/globals.css'
import CustomFooter from "./_components/custom-footer";
import CustomHeader from "./_components/custom-header";

export const metadata = {
    title: 'Nextra Blog'
}

export default async function RootLayout({children}) {
    const banner = (
        <Banner storageKey="go-to-github">
            This blog was customized from Nextra v4.{' '}
            <a href="https://github.com/phucbm/nextra-blog-starter" className="x:text-primary-600" target="_blank">
                Check this template →
            </a>
        </Banner>
    )

    return (
        <html lang="en" suppressHydrationWarning>
        <Head backgroundColor={{dark: '#0f172a', light: '#f5f5f5'}}/>
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