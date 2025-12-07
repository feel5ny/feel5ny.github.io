import React from 'react';

import { getCategories, CategoryItem } from '@/lib/get-categories';
import CategoryMenu from './category-menu';
import { Link } from 'next-view-transitions';

const CustomHeader = async () => {
  const categories = await getCategories();

  return (
    <div className="custom-header flex items-center mb-10 justify-between">
      <Link href="/" title={'feel5ny'} className="no-underline">
        <div className="flex items-center gap-2 mr-18 ">
          <span className="font-bold">✊ 필오의 개발일지</span>
        </div>
      </Link>
      <CategoryMenu categories={categories} />
    </div>
  );
};

export default CustomHeader;
