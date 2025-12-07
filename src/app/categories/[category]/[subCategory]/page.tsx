// src/app/categories/[category]/[subCategory]/page.tsx
import type { Metadata } from 'next';
import { getCategories, getPostsByCategoryAndSubCategory } from '@/lib/get-categories';
import { Posts } from '@/components/posts';

type SubCategoryPageParams = {
  category: string;
  subCategory: string;
};

type SubCategoryPageProps = {
  params: Promise<SubCategoryPageParams>;
};

export async function generateMetadata(props: SubCategoryPageProps): Promise<Metadata> {
  const params = await props.params;
  const decodedCategory = decodeURIComponent(params.category);
  const decodedSubCategory = decodeURIComponent(params.subCategory);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';
  const canonicalUrl = `${baseUrl}/categories/${params.category}/${params.subCategory}/`;

  return {
    title: `${decodedCategory} > ${decodedSubCategory} - Categories`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams(): Promise<SubCategoryPageParams[]> {
  try {
    const allCategories = await getCategories();
    const params: SubCategoryPageParams[] = [];

    allCategories.forEach(cat => {
      if (cat.subCategories && cat.subCategories.length > 0) {
        cat.subCategories.forEach(subCat => {
          params.push({
            category: cat.slug,
            subCategory: subCat.slug,
          });
        });
      }
    });

    // 디버깅: 생성된 소카테고리 경로 확인
    if (params.length === 0) {
      console.warn('⚠️  generateStaticParams (subCategory): 소카테고리가 없습니다.');
    } else {
      console.log(`📝 generateStaticParams (subCategory): ${params.length}개 소카테고리 생성됨`);
    }

    return params;
  } catch (error) {
    console.error('❌ generateStaticParams (subCategory) 에러:', error);
    return [];
  }
}

export default async function SubCategoryPage(props: SubCategoryPageProps) {
  const params = await props.params;
  const decodedCategory = decodeURIComponent(params.category);
  const decodedSubCategory = decodeURIComponent(params.subCategory);

  // 카테고리 정보 가져오기
  const categories = await getCategories();
  const categoryInfo = categories.find(
    cat => cat.slug === params.category || cat.name === decodedCategory
  );
  const subCategoryInfo = categoryInfo?.subCategories?.find(
    sub => sub.slug === params.subCategory || sub.name === decodedSubCategory
  );

  // 카테고리와 소카테고리별 포스트 가져오기
  const posts = await getPostsByCategoryAndSubCategory(params.category, params.subCategory);

  return (
    <>
      <h1>
        {categoryInfo?.name || decodedCategory} &gt; {subCategoryInfo?.name || decodedSubCategory}
      </h1>
      <Posts posts={posts} showViewAllButton={false} />
    </>
  );
}



