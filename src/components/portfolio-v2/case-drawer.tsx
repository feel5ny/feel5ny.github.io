'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  activeCase,
  caseUrl,
  journeyNavigation,
  switchedDrawerState,
  type CaseId,
} from './case-drawer-state';
import styles from './case-drawer.module.css';

const navigationEvent = 'portfolio-case-change';

export function CaseDetailLink({ id, children }: { id: CaseId; children: ReactNode }) {
  return (
    <a
      href={`?detail=${id}#${id}`}
      aria-haspopup="dialog"
      aria-controls={`case-dialog-${id}`}
      onClick={event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        window.history.pushState(
          { ...window.history.state, portfolioCaseDrawer: id },
          '',
          caseUrl(window.location.href, id)
        );
        window.dispatchEvent(new Event(navigationEvent));
      }}
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function CaseDrawer({
  id,
  title,
  description,
  children,
  showTrigger = true,
}: {
  id: CaseId;
  title: string;
  description: string;
  children: ReactNode;
  showTrigger?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [manualLink, setManualLink] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const outsideStart = useRef(false);
  const releaseRef = useRef<(() => void) | null>(null);
  const stageNavigation = journeyNavigation(id);

  useEffect(() => {
    const sync = () => setOpen(activeCase(window.location.href) === id);
    const beforePrint = () => {
      releaseRef.current?.();
      setOpen(false);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener(navigationEvent, sync);
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(navigationEvent, sync);
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', sync);
    };
  }, [id]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    setCopyStatus('');
    setManualLink('');
    const x = window.scrollX;
    const y = window.scrollY;
    const returnFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.left = `-${x}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
    titleRef.current?.focus({ preventScroll: true });
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      dialog.close();
      Object.assign(body.style, previous);
      window.scrollTo({ left: x, top: y, behavior: 'instant' });
      const target =
        returnFocus?.isConnected && returnFocus !== body ? returnFocus : triggerRef.current;
      target?.focus({ preventScroll: true });
    };
    releaseRef.current = release;
    return release;
  }, [open]);

  const close = () => {
    if (window.history.state?.portfolioCaseDrawer === id) {
      window.history.back();
    } else {
      window.history.replaceState(window.history.state, '', caseUrl(window.location.href, null));
      window.dispatchEvent(new Event(navigationEvent));
    }
  };

  const goToStage = (target: CaseId) => {
    window.history.replaceState(
      switchedDrawerState(window.history.state, id, target),
      '',
      caseUrl(window.location.href, target)
    );
    // Release the previous dialog before the next captures scroll/focus state.
    releaseRef.current?.();
    window.dispatchEvent(new Event(navigationEvent));
  };

  return (
    <>
      {showTrigger && (
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          aria-haspopup="dialog"
          aria-controls={`case-dialog-${id}`}
          aria-expanded={open}
          aria-label={`${title} 개발 상세 보기`}
          onClick={() => {
            setCopyStatus('');
            setManualLink('');
            window.history.pushState(
              { ...window.history.state, portfolioCaseDrawer: id },
              '',
              caseUrl(window.location.href, id)
            );
            window.dispatchEvent(new Event(navigationEvent));
          }}
        >
          개발 상세 보기 <span aria-hidden="true">↗</span>
        </button>
      )}
      <dialog
        ref={dialogRef}
        id={`case-dialog-${id}`}
        className={styles.dialog}
        aria-labelledby={`case-dialog-title-${id}`}
        aria-describedby={`case-dialog-description-${id}`}
        onKeyDown={event => {
          if (
            !open ||
            !stageNavigation ||
            event.defaultPrevented ||
            event.repeat ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
          )
            return;
          const target = event.target;
          if (
            target instanceof HTMLElement &&
            (target.isContentEditable ||
              target.closest(
                'input, textarea, select, [role="textbox"], [role="slider"], [role="combobox"], [role="tablist"]'
              ))
          )
            return;
          event.preventDefault();
          const destination =
            event.key === 'ArrowLeft' ? stageNavigation.previous : stageNavigation.next;
          if (destination) goToStage(destination.id);
        }}
        onCancel={event => {
          event.preventDefault();
          close();
        }}
        onPointerDown={event => {
          outsideStart.current = event.target === event.currentTarget;
        }}
        onClick={event => {
          if (!outsideStart.current || event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }}
      >
        <div className={styles.toolbar} data-journey={Boolean(stageNavigation)}>
          <div className={styles.toolbarMain}>
            <span className={styles.toolbarLabel}>{stageNavigation ? 'AARRR' : '개발 상세'}</span>
            {stageNavigation && (
              <nav className={styles.stageNavigation} aria-label="AARRR 상세 단계 이동">
                <button
                  type="button"
                  disabled={!stageNavigation.previous}
                  aria-label={
                    stageNavigation.previous
                      ? `이전 단계: ${stageNavigation.previous.label}`
                      : '이전 단계 없음'
                  }
                  aria-keyshortcuts="ArrowLeft"
                  title="이전 단계 (← 방향키)"
                  onClick={() => stageNavigation.previous && goToStage(stageNavigation.previous.id)}
                >
                  <span aria-hidden="true">←</span>
                  <span className={styles.buttonText}>이전</span>
                </button>
                <span className={styles.stagePosition}>
                  <small>
                    {stageNavigation.position}/{stageNavigation.total}
                  </small>
                  <strong>{stageNavigation.current.label}</strong>
                </span>
                <button
                  type="button"
                  disabled={!stageNavigation.next}
                  aria-label={
                    stageNavigation.next
                      ? `다음 단계: ${stageNavigation.next.label}`
                      : '다음 단계 없음'
                  }
                  aria-keyshortcuts="ArrowRight"
                  title="다음 단계 (→ 방향키)"
                  onClick={() => stageNavigation.next && goToStage(stageNavigation.next.id)}
                >
                  <span className={styles.buttonText}>다음</span>
                  <span aria-hidden="true">→</span>
                </button>
              </nav>
            )}
          </div>
          <div className={styles.toolbarActions}>
            <button
              type="button"
              aria-label="상세 링크 복사"
              title="상세 링크 복사"
              onClick={async () => {
                const link = new URL(
                  caseUrl(window.location.href, id, true),
                  window.location.origin
                ).href;
                try {
                  await navigator.clipboard.writeText(link);
                  setCopyStatus('링크를 복사했어요.');
                  setManualLink('');
                } catch {
                  setManualLink(link);
                  setCopyStatus('아래 주소를 선택해 복사해 주세요.');
                }
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="m10 13 4-4M8 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0M13 8l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"
                  transform="translate(1 0)"
                />
              </svg>
              <span className={styles.buttonText}>링크 복사</span>
            </button>
            <button type="button" aria-label={`${title} 상세 닫기`} title="닫기" onClick={close}>
              <span className={styles.buttonText}>닫기</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <header className={styles.heading}>
            <h2 ref={titleRef} id={`case-dialog-title-${id}`} tabIndex={-1}>
              {title}
            </h2>
            <p id={`case-dialog-description-${id}`}>{description}</p>
            <p className={styles.copyStatus} role="status">
              {copyStatus}
            </p>
            {manualLink && (
              <input
                className={styles.manualLink}
                aria-label="복사할 상세 주소"
                readOnly
                value={manualLink}
                onFocus={event => event.currentTarget.select()}
              />
            )}
          </header>
          {children}
        </div>
      </dialog>
    </>
  );
}
