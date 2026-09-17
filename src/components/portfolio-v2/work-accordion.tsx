'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import styles from './portfolio.module.css';

export function WorkAccordion({ children, count }: { children: ReactNode; count: number }) {
  const detailRef = useRef<HTMLDetailsElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const targetOpen = useRef(false);

  useEffect(() => {
    const finish = () => animationRef.current?.finish();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('beforeprint', finish);
    reducedMotion.addEventListener('change', finish);
    return () => {
      animationRef.current?.cancel();
      window.removeEventListener('beforeprint', finish);
      reducedMotion.removeEventListener('change', finish);
    };
  }, []);

  return (
    <details ref={detailRef} className={styles.otherWork}>
      <summary
        onClick={event => {
          const detail = detailRef.current;
          if (!detail) return;
          event.preventDefault();
          const nextOpen = animationRef.current ? !targetOpen.current : !detail.open;
          const startHeight = detail.getBoundingClientRect().height;
          animationRef.current?.cancel();
          animationRef.current = null;
          targetOpen.current = nextOpen;
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            detail.open = nextOpen;
            detail.style.overflow = '';
            return;
          }

          const summaryHeight = event.currentTarget.getBoundingClientRect().height;
          detail.open = true;
          const endHeight = nextOpen ? detail.getBoundingClientRect().height : summaryHeight;
          detail.style.overflow = 'hidden';
          const animation = detail.animate(
            [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
            { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          );
          animationRef.current = animation;
          animation.onfinish = () => {
            detail.open = nextOpen;
            detail.style.overflow = '';
            animationRef.current = null;
          };
        }}
      >
        그 외 제품 개발 경험{' '}
        <span>
          {count}개 · 최신순 <span aria-hidden="true">＋</span>
        </span>
      </summary>
      {children}
    </details>
  );
}
