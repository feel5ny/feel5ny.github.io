import { Head } from 'nextra/components';
import 'nextra-theme-blog/style.css';
import '@/styles/globals.css';
import CustomFooter from '@/components/custom-footer';
import CustomHeader from '@/components/custom-header';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Metadata } from 'next';
import { Layout } from 'nextra-theme-blog';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';

export const metadata: Metadata = {
  title: 'Nextra Blog',
  alternates: {
    canonical: `${baseUrl}/`,
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    locale: 'ko_KR',
  },
  verification: {
    google: 'zZRsiCbEGXFFiO-Q8FDJ8Vi7OIe-uNQ0oOCid1YwSGQ',
  },
};

const bodyFont = Inter({
  subsets: ['latin', 'vietnamese'],
});

export default async function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gaIdV4 = process.env.NEXT_PUBLIC_GA_ID_V4;

  return (
    <html
      // Not required, but good for SEO
      lang="ko"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
      className={bodyFont.className}
    >
      <Head backgroundColor={{ dark: '#15120d', light: '#faf5e9' }} />
      <body className="min-h-screen">
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
                ${gaIdV4 ? `gtag('config', '${gaIdV4}');` : ''}
              `}
            </Script>
          </>
        )}

        <Layout>
          <CustomHeader />

          {children}

          <CustomFooter />
          <ScrollToTopButton />
        </Layout>
      </body>
    </html>
  );
}
