import type { PageMapItem } from 'nextra';
import { normalizePages } from 'nextra/normalize-pages';
import type { FC, ReactNode } from 'react';
import { NavbarLink } from './navbar-link';
import { cn } from '@/lib/utils';

type NavbarProps = {
  children?: ReactNode;
  pageMap: PageMapItem[];
  className?: string;
};

export const Navbar: FC<NavbarProps> = ({ children, pageMap, className }) => {
  const { topLevelNavbarItems } = normalizePages({ list: pageMap, route: '/' });
  // normalizePages는 하위 페이지가 있는 폴더의 display: 'hidden'을 내비 목록에서 걸러 주지 않으므로 직접 제외한다
  const visibleNavbarItems = topLevelNavbarItems.filter(nav => nav.display !== 'hidden');
  return (
    <div className={cn('flex items-center gap-3', className)} data-pagefind-ignore="all">
      {visibleNavbarItems.map(nav => (
        <NavbarLink key={nav.route} href={nav.route}>
          {nav.title}
        </NavbarLink>
      ))}
      {children}

      <NavbarLink href="/rss.xml" target="_blank">
        RSS
      </NavbarLink>
      <NavbarLink
        href="https://www.linkedin.com/in/feel5ny?utm_source=feel5ny.github.io"
        target="_blank"
      >
        Linkedin
      </NavbarLink>
      <NavbarLink href="https://github.com/feel5ny" target="_blank">
        GitHub
      </NavbarLink>
    </div>
  );
};
