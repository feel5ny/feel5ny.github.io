'use client';

import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Link } from 'next-view-transitions';

type Heading = {
  id: string;
  value: string;
  depth: number;
};

type PostTOCProps = {
  toc: Heading[];
};

export function PostTOC({ toc }: PostTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!toc || toc.length === 0) {
    return null;
  }

  const renderTOCItem = (heading: Heading, index: number) => {
    const depth = heading.depth;
    const indentLevel = depth - 1;

    // 계층별 bullet 스타일
    const bulletStyles = {
      1: '•',
      2: '◦',
      3: '▪',
      4: '▫',
      5: '•',
      6: '◦',
    };
    const bullet = bulletStyles[depth as keyof typeof bulletStyles] || '•';

    const indentStyles = {
      0: 'pl-0',
      1: 'pl-4',
      2: 'pl-8',
      3: 'pl-12',
      4: 'pl-16',
      5: 'pl-20',
    };
    const indentClass = indentStyles[indentLevel as keyof typeof indentStyles] || 'pl-0';

    return (
      <li key={heading.id || index} className={`${indentClass} list-none`}>
        <Link
          href={`#${heading.id}`}
          className="flex items-start gap-2 text-sm hover:text-primary transition-colors no-underline group"
          onClick={e => {
            e.preventDefault();
            const element = document.getElementById(heading.id);
            if (element) {
              const offset = 80; // 헤더 높이 고려
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
              });
            }
          }}
        >
          <span className="text-muted-foreground group-hover:text-primary shrink-0 mt-0.5">
            {bullet}
          </span>
          <span className="flex-1">{heading.value}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-sm">목차</span>
        {isOpen ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <nav className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-0.5">
            {toc.map((heading, index) => renderTOCItem(heading, index))}
          </ul>
        </nav>
      )}
    </div>
  );
}
