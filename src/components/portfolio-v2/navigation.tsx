'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './portfolio.module.css';

const sections = [
  ['intro', '소개', ''],
  ['gene', '기존 동작을 지키는 리뉴얼', '01'],
  ['insurance', '상담 연동과 운영 관측', '02'],
  ['review', 'AI 리뷰의 선제적 시도', '03'],
  ['perspective', '사용자 경험 전체 보기', ''],
  ['team', '지속 가능한 팀 운영', ''],
  ['background', '경력과 공유', ''],
];

function useActiveSection() {
  const [active, setActive] = useState('intro');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = sections
          .filter(([id]) => {
            const element = document.getElementById(id);
            return element && element.getBoundingClientRect().top <= window.innerHeight * 0.32;
          })
          .at(-1);
        setActive(current?.[0] ?? 'intro');
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return active;
}

export function PortfolioNav() {
  const active = useActiveSection();
  return (
    <nav className={styles.navigation} aria-label="포트폴리오 목차">
      {sections.map(([id, label, number]) => (
        <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}>
          <span>{label}</span>
          {number && <small>{number}</small>}
        </a>
      ))}
    </nav>
  );
}

export function MobileMenu() {
  const active = useActiveSection();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 761px)');
    const close = () => dialogRef.current?.close();
    const onResize = () => {
      if (desktop.matches) close();
    };
    desktop.addEventListener('change', onResize);
    window.addEventListener('beforeprint', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', onResize);
      window.removeEventListener('beforeprint', close);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        aria-label="목차 메뉴 열기"
        aria-expanded={open}
        aria-controls="portfolio-mobile-menu"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        id="portfolio-mobile-menu"
        className={styles.mobileDrawer}
        aria-labelledby="mobile-menu-title"
        onClose={() => setOpen(false)}
        onKeyDown={event => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]')
          );
          const first = controls[0];
          const last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            event.currentTarget.close();
        }}
      >
        <div className={styles.drawerHeading}>
          <span id="mobile-menu-title">포트폴리오 목차</span>
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="목차 메뉴 닫기"
            onClick={() => dialogRef.current?.close()}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className={styles.drawerIdentity}>
          <strong>김나영</strong>
          <span>프론트엔드 개발자</span>
        </div>
        <nav className={styles.navigation} aria-label="모바일 포트폴리오 목차">
          {sections.map(([id, label, number]) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => dialogRef.current?.close()}
            >
              <span>{label}</span>
              {number && <small>{number}</small>}
            </a>
          ))}
        </nav>
        <p className={styles.drawerNote}>
          제품을 만들고,
          <br />
          함께 만드는 방식을 살핍니다.
        </p>
      </dialog>
    </>
  );
}

export function MobileBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intro = document.getElementById('intro');
    if (!intro || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 80),
      { rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#intro"
      className={styles.floatingTop}
      data-visible={visible}
      aria-label="페이지 처음으로 이동"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={event => {
        event.preventDefault();
        document.getElementById('intro-title')?.focus({ preventScroll: true });
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        });
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 12 6-6 6 6M12 6v14" />
      </svg>
      <span>처음으로</span>
    </a>
  );
}

export function PrintButton() {
  useEffect(() => {
    let closedDetails: HTMLDetailsElement[] = [];
    const expand = () => {
      closedDetails = Array.from(
        document.querySelectorAll<HTMLDetailsElement>('#main-content details:not([open])')
      );
      closedDetails.forEach(detail => {
        detail.open = true;
      });
    };
    const restore = () => {
      closedDetails.forEach(detail => {
        detail.open = false;
      });
      closedDetails = [];
    };
    window.addEventListener('beforeprint', expand);
    window.addEventListener('afterprint', restore);
    return () => {
      restore();
      window.removeEventListener('beforeprint', expand);
      window.removeEventListener('afterprint', restore);
    };
  }, []);
  return (
    <button type="button" className={styles.printButton} onClick={() => window.print()}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 14h12v8H6zM18 12h.01" />
      </svg>
      인쇄
    </button>
  );
}
