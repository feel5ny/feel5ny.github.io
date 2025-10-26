import {Head} from 'nextra/components'
import 'nextra-theme-blog/style.css'
import '@/styles/globals.css'
import CustomFooter from "@/components/custom-footer";
import CustomHeader from "@/components/custom-header";
import {Metadata} from "next";
import {Layout} from "nextra-theme-blog";

export const metadata: Metadata = {
    title: 'Nextra Blog'
}

export default async function RootLayout({children}) {
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
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