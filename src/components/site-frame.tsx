'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from 'nextra-theme-blog';

// Keep the existing blog shell everywhere except the standalone portfolio.
export function SiteFrame({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.replace(/\/$/, '') === '/private/portfolio-2026-v2') {
    return children;
  }
  return (
    <Layout>
      {header}
      {children}
      {footer}
    </Layout>
  );
}
