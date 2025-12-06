// src/components/custom-todo.tsx
// 커스텀 TODO 리스트 컴포넌트 (Hexo의 todo 필드용)
'use client';

import * as React from 'react';
import { IconCheck, IconCircle } from '@tabler/icons-react';

interface CustomTodoItem {
  isDone: boolean;
  title: string;
}

interface CustomTodoProps {
  todo: CustomTodoItem[];
}

export function CustomTodo({ todo }: CustomTodoProps) {
  if (!todo || todo.length === 0) {
    return null;
  }

  return (
    <div className="custom-todo-list my-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
      <h3 className="text-lg font-semibold mb-4">TODO</h3>
      <ul className="space-y-3">
        {todo.map((item, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 ${
              item.isDone
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {item.isDone ? (
                <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <IconCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <span className="flex-1">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
