'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CategoryItem } from '@/lib/get-categories';

type CategoryMenuProps = {
  categories: CategoryItem[];
};

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (categories.length === 0) {
    return null;
  }

  return (
    <>
      {/* 모바일: 클릭 시 상단에서 슬라이드 다운되는 메뉴 */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="no-underline hover:underline focus:underline cursor-pointer"
        >
          Categories
        </button>
        {isOpen && (
          <>
            {/* 오버레이: 메뉴가 열렸을 때 배경을 어둡게 */}
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50 transition-transform duration-300 ease-in-out translate-y-0">
              <div className="max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-bold">Category</span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl leading-none"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>
                <ul className="py-2">
                  {categories.map(category => (
                    <li key={category.slug}>
                      <Link
                        href={`/categories/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 데스크톱: hover로 드롭다운 */}
      <div className="hidden md:block relative group">
        <button className="no-underline cursor-pointer">Categories</button>
        <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <ul className="py-2">
            {categories.map(category => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryMenu;
