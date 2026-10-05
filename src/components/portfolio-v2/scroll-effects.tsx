'use client';

import { useEffect } from 'react';

// Progressive enhancement: content is visible without JS and in reduced-motion mode.
export function ScrollEffects() {
  useEffect(() => {
    const root = document.getElementById('portfolio-v2');
    if (!root) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sequenceChildren: HTMLElement[] = [];
    const staggerGroups = new Map<HTMLElement, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>('[data-motion-sequence]').forEach(sequence => {
      const horizontal = getComputedStyle(sequence).gridTemplateColumns.split(' ').length > 1;
      const stagger = sequence.dataset.motionSequence === 'stagger';
      const children = Array.from(sequence.children) as HTMLElement[];
      if (stagger) staggerGroups.set(sequence, children);
      Array.from(sequence.children).forEach((child, index) => {
        const element = child as HTMLElement;
        element.dataset.reveal = 'step';
        element.style.setProperty(
          '--reveal-delay',
          stagger ? `${index * 90}ms` : horizontal ? `${index * 110}ms` : '0ms'
        );
        sequenceChildren.push(element);
      });
    });
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const groupedChildren = new Set(Array.from(staggerGroups.values()).flat());
    const observedTargets = [
      ...targets.filter(element => !groupedChildren.has(element)),
      ...staggerGroups.keys(),
    ];
    const revealTargets = (element: HTMLElement) => staggerGroups.get(element) ?? [element];
    const setState = (element: HTMLElement, state: 'visible' | 'pending') => {
      revealTargets(element).forEach(target => {
        if (state === 'pending' && target.hasAttribute('data-anchor-reveal')) return;
        target.dataset.revealState = state;
      });
    };
    let anchorTimer: ReturnType<typeof setTimeout> | undefined;
    const clearAnchorReveal = () => {
      clearTimeout(anchorTimer);
      targets.forEach(element => delete element.dataset.anchorReveal);
    };
    const revealAnchor = (hash: string) => {
      let destination: HTMLElement | null;
      try {
        destination = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      if (!destination || !root.contains(destination)) return;
      clearAnchorReveal();
      targets.forEach(element => {
        if (destination.contains(element) || element.contains(destination)) {
          element.dataset.anchorReveal = '';
          element.dataset.revealState = 'visible';
        }
      });
      // Skip reveal delays during the jump, then restore normal scroll/replay behavior.
      anchorTimer = setTimeout(clearAnchorReveal, 1500);
    };
    const onAnchorClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (link) revealAnchor(link.getAttribute('href') ?? '');
    };
    const onHashChange = () => revealAnchor(window.location.hash);
    let observer: IntersectionObserver | undefined;
    let resetObserver: IntersectionObserver | undefined;
    let resizeFrame = 0;
    let printing = false;
    // Start 30% above the bottom, but reset only after leaving the viewport below.
    // Separate boundaries prevent flicker when scrolling around the reveal point.
    const revealPosition = 0.7;
    const disconnect = () => {
      observer?.disconnect();
      resetObserver?.disconnect();
    };
    const showAll = () => {
      disconnect();
      targets.forEach(element => {
        element.dataset.revealState = 'visible';
      });
    };
    const startTracking = () => {
      disconnect();
      if (printing || motionPreference.matches || !('IntersectionObserver' in window)) {
        showAll();
        return;
      }
      observer = new IntersectionObserver(
        entries => {
          if (printing) return;
          entries.forEach(entry => {
            const element = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              setState(element, 'visible');
            }
          });
        },
        // Pixels are deliberate: percentage root margins are relative to viewport width.
        // Zero threshold also works for sections taller than the viewport.
        { rootMargin: `0px 0px -${window.innerHeight * (1 - revealPosition)}px 0px`, threshold: 0 }
      );
      resetObserver = new IntersectionObserver(entries => {
        if (printing) return;
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top >= (entry.rootBounds?.bottom ?? window.innerHeight) &&
            !element.contains(document.activeElement)
          ) {
            setState(element, 'pending');
          }
        });
      });
      observedTargets.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight * revealPosition) {
          setState(element, 'visible');
        } else if (
          revealTargets(element).every(target => target.dataset.revealState !== 'visible')
        ) {
          setState(element, 'pending');
        }
        observer?.observe(element);
        resetObserver?.observe(element);
      });
    };
    startTracking();
    onHashChange();
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(startTracking);
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      targets.forEach(element => {
        if (element.contains(event.target as Node)) element.dataset.revealState = 'visible';
      });
    };
    const beforePrint = () => {
      printing = true;
      showAll();
    };
    const afterPrint = () => {
      printing = false;
      startTracking();
    };
    motionPreference.addEventListener('change', startTracking);
    window.addEventListener('resize', onResize);
    root.addEventListener('focusin', onFocus);
    root.addEventListener('click', onAnchorClick, true);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    return () => {
      disconnect();
      clearAnchorReveal();
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', onResize);
      root.removeEventListener('focusin', onFocus);
      root.removeEventListener('click', onAnchorClick, true);
      window.removeEventListener('hashchange', onHashChange);
      motionPreference.removeEventListener('change', startTracking);
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
      targets.forEach(element => {
        delete element.dataset.revealState;
      });
      sequenceChildren.forEach(element => {
        delete element.dataset.reveal;
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, []);
  return null;
}
