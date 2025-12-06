// src/app/categories/[category]/page.tsx
import type { Metadata } from 'next';
import { getCategories, getPostsByCategory } from '@/lib/get-categories';
import { Posts } from '@/components/posts';
import { getPosts } from '@/lib/get-posts';

type CategoryPageParams = {
  category: string;
};

type CategoryPageProps = {
  params: Promise<CategoryPageParams>;
};

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params;
  const decodedCategory = decodeURIComponent(params.category);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feel5ny.github.io';
  const canonicalUrl = `${baseUrl}/categories/${params.category}/`;

  return {
    title: `${decodedCategory} - Categories`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams(): Promise<CategoryPageParams[]> {
  try {
    const allCategories = await getCategories();
    const params = allCategories.map(cat => ({ category: cat.slug }));

    // 디버깅: 생성된 카테고리 경로 확인
    if (params.length === 0) {
      console.warn('⚠️  generateStaticParams: 카테고리가 없습니다.');
    } else {
      console.log(`📝 generateStaticParams: ${params.length}개 카테고리 생성됨`);
    }

    return params;
  } catch (error) {
    console.error('❌ generateStaticParams 에러:', error);
    return [];
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const decodedCategory = decodeURIComponent(params.category);

  // 카테고리 정보 가져오기
  const categories = await getCategories();
  const categoryInfo = categories.find(
    cat => cat.slug === params.category || cat.name === decodedCategory
  );

  // 카테고리별 포스트 가져오기
  const posts = await getPostsByCategory(params.category);

  return (
    <>
      <h1>{categoryInfo?.name || decodedCategory}</h1>
      {categoryInfo?.subCategories && categoryInfo.subCategories.length > 0 && (
        <div className="mb-6">
          <h2>소카테고리</h2>
          <ul className="list-disc list-inside">
            {categoryInfo.subCategories.map(subCat => (
              <li key={subCat.slug}>
                <a href={`/categories/${params.category}/${subCat.slug}`}>
                  {subCat.name} ({subCat.count})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Posts posts={posts} showViewAllButton={false} />
    </>
  );
}
