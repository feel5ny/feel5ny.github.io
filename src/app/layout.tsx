import {Head} from 'nextra/components'
import 'nextra-theme-blog/style.css'
import '@/styles/globals.css'
import CustomFooter from "@/components/custom-footer";
import CustomHeader from "@/components/custom-header";
import {Metadata} from "next";
import {Layout} from "nextra-theme-blog";
import {Inconsolata} from 'next/font/google';

export const metadata: Metadata = {
    title: 'Nextra Blog'
}

const inconsolata = Inconsolata({
    subsets: ['latin', 'vietnamese'],
})

export default async function RootLayout({children}) {
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning

            className={inconsolata.className}
        >
        <Head backgroundColor={{dark: '#15120d', light: '#faf5e9'}}/>
        <body className="bg-polka">
        <Layout>
            <CustomHeader/>

            {children}

            <CustomFooter/>
        </Layout>
        </body>
        </html>
    )
}