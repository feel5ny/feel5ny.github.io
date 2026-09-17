'use client';

import { useEffect, useRef } from 'react';
import styles from './pointer-glow.module.css';

export function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const light = lightRef.current;
    if (!glow || !light) return;

    const enabled = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    );
    let frame = 0;
    let x = 0;
    let y = 0;

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete glow.dataset.active;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        // Viewport coordinates keep the light beneath the cursor while scrolling.
        light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        glow.dataset.active = 'true';
        frame = 0;
      });
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Tab') hide();
    };
    const detach = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', keyboard);
      hide();
    };
    const sync = () => {
      detach();
      if (!enabled.matches) return;
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('pointerout', leave);
      window.addEventListener('blur', hide);
      window.addEventListener('keydown', keyboard);
    };
    sync();
    enabled.addEventListener('change', sync);
    return () => {
      detach();
      enabled.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div ref={glowRef} className={styles.glow} aria-hidden="true">
      <span ref={lightRef} />
    </div>
  );
}
