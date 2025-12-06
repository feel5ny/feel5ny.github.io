// src/components/custom-toc.tsx
// 커스텀 목차 컴포넌트 (Hexo의 list 필드용)
'use client';

import * as React from 'react';
import { Link } from 'next-view-transitions';

type CustomTOCItem =
  | {
      title: {
        name: string;
        sub?: string;
        id: string;
        style?: {
          type: string;
          index: string;
        };
      };
      depth1?: Array<{ name: string; id: string }>;
      depth2?: Array<{ name: string; id: string }>;
    }
  | {
      hr: {
        type: 'start' | 'end';
        name?: string;
      };
    };

interface CustomTOCProps {
  list: CustomTOCItem[];
}

export function CustomTOC({ list }: CustomTOCProps) {
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <nav className="custom-toc my-8 border-l-2 border-gray-200 dark:border-gray-700 pl-6">
      <h3 className="text-lg font-semibold mb-4">목차</h3>
      <ul className="space-y-2">
        {list.map((item, index) => {
          // Handle hr (divider) items
          if ('hr' in item) {
            if (item.hr.type === 'start' && item.hr.name) {
              return (
                <li key={index} className="mt-4 mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {item.hr.name}
                  </h4>
                </li>
              );
            }
            return null; // 'end' type doesn't render anything
          }

          // Handle title items
          if ('title' in item) {
            return (
              <li key={index} className="custom-toc-item">
                <Link
                  href={`#${item.title.id}`}
                  className="flex items-start gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title.style?.type === 'number' && (
                    <span className="custom-toc-number shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
                      {item.title.style.index}
                    </span>
                  )}
                  <div className="flex-1">
                    <span className="custom-toc-title font-medium">{item.title.name}</span>
                    {item.title.sub && (
                      <span className="custom-toc-subtitle block text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.title.sub}
                      </span>
                    )}
                  </div>
                </Link>
                {item.depth1 && item.depth1.length > 0 && (
                  <ul className="custom-toc-depth1 ml-8 mt-2 space-y-1">
                    {item.depth1.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={`#${subItem.id}`}
                          className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                        {item.depth2 && item.depth2.length > 0 && (
                          <ul className="custom-toc-depth2 ml-4 mt-1 space-y-1">
                            {item.depth2.map((subSubItem, subSubIndex) => (
                              <li key={subSubIndex}>
                                <Link
                                  href={`#${subSubItem.id}`}
                                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  {subSubItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
}
