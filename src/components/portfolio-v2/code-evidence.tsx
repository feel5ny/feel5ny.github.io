import type { ReactNode } from 'react';
import styles from './code-evidence.module.css';

export function CodeEvidence({
  title,
  source,
  code,
  children,
}: {
  title: string;
  source: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <figure className={styles.evidence}>
      <figcaption>
        <strong>{title}</strong>
        <span>{source}</span>
      </figcaption>
      <pre tabIndex={0} aria-label={`${title} 코드`}>
        <code>{code}</code>
      </pre>
      <div className={styles.explanation}>{children}</div>
    </figure>
  );
}
