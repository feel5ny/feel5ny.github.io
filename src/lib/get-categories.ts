// src/lib/get-categories.ts
// 카테고리 관련 유틸리티 함수
import { getPosts } from '@/lib/get-posts';
import { getCategoryDescription } from '@/lib/category-descriptions';

export type CategoryItem = {
  name: string;
  slug: string;
  count: number;
  description?: string;
  subCategories?: CategoryItem[];
};

export type CategoryPost = {
  category: string;
  subCategory?: string;
};

// 포스트의 front matter에서 categories 추출
function extractCategories(post: any): CategoryPost[] {
  const categories: CategoryPost[] = [];

  // frontMatter에서 categories 필드 확인
  const frontMatterCategories = post.frontMatter?.categories;

  if (Array.isArray(frontMatterCategories) && frontMatterCategories.length > 0) {
    // 첫 번째가 대카테고리, 두 번째가 소카테고리
    categories.push({
      category: String(frontMatterCategories[0]).trim(),
      subCategory:
        frontMatterCategories.length > 1 ? String(frontMatterCategories[1]).trim() : undefined,
    });
  }

  return categories;
}

// 카테고리 이름을 URL 슬러그로 변환
// Hexo 스타일: 00_Clean_Code -> 00-Clean-Code (대소문자 유지, 언더스코어를 하이픈으로)
export function slugifyCategory(name: string): string {
  if (!name) return '';

  // Hexo 스타일: 언더스코어를 하이픈으로 변환하되, 대소문자 유지
  let slug = name
    .replace(/_/g, '-') // 언더스코어를 하이픈으로
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/[^\w\-가-힣]/g, '') // 특수문자 제거 (한글, 영문, 숫자, 하이픈 유지)
    .replace(/-+/g, '-') // 연속된 하이픈 제거
    .replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거

  // 소문자 변환하지 않음 (Hexo와 동일하게 유지: 00-Clean-Code)
  return slug;
}

// 모든 카테고리 가져오기 (2 depth 구조)
export async function getCategories(): Promise<CategoryItem[]> {
  const posts = await getPosts();
  const categoryMap = new Map<string, CategoryItem>();

  posts.forEach(post => {
    const categoryPosts = extractCategories(post);

    categoryPosts.forEach(({ category, subCategory }) => {
      if (!category) return;

      const categorySlug = slugifyCategory(category);

      // 대카테고리 추가
      if (!categoryMap.has(categorySlug)) {
        categoryMap.set(categorySlug, {
          name: category,
          slug: categorySlug,
          count: 0,
          description: getCategoryDescription(category),
          subCategories: [],
        });
      }

      const categoryItem = categoryMap.get(categorySlug)!;
      categoryItem.count++;

      // 소카테고리 추가
      if (subCategory) {
        const subCategorySlug = slugifyCategory(subCategory);
        const existingSubCategory = categoryItem.subCategories?.find(
          sub => sub.slug === subCategorySlug
        );

        if (!existingSubCategory) {
          if (!categoryItem.subCategories) {
            categoryItem.subCategories = [];
          }
          categoryItem.subCategories.push({
            name: subCategory,
            slug: subCategorySlug,
            count: 1,
          });
        } else {
          existingSubCategory.count++;
        }
      }
    });
  });

  const result = Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  // 디버깅: 카테고리 개수 확인
  if (result.length === 0) {
    console.warn(
      '⚠️  카테고리가 없습니다. 포스트의 front matter에 categories 필드가 있는지 확인하세요.'
    );
  }

  return result;
}

// 특정 카테고리의 포스트 가져오기
export async function getPostsByCategory(
  categorySlug: string
): Promise<ReturnType<typeof getPosts>> {
  const posts = await getPosts();
  const categoryName = decodeURIComponent(categorySlug);

  return posts.filter(post => {
    const categoryPosts = extractCategories(post);
    return categoryPosts.some(({ category }) => {
      if (!category) return false;

      const postCategorySlug = slugifyCategory(category);
      // 슬러그 매칭 또는 원본 이름 매칭 (대소문자 구분 없이)
      return (
        postCategorySlug === categorySlug ||
        postCategorySlug.toLowerCase() === categorySlug.toLowerCase() ||
        category === categoryName ||
        category.toLowerCase() === categoryName.toLowerCase()
      );
    });
  });
}

// 특정 카테고리와 소카테고리의 포스트 가져오기
export async function getPostsByCategoryAndSubCategory(
  categorySlug: string,
  subCategorySlug: string
): Promise<ReturnType<typeof getPosts>> {
  const posts = await getPosts();
  const categoryName = decodeURIComponent(categorySlug);
  const subCategoryName = decodeURIComponent(subCategorySlug);

  return posts.filter(post => {
    const categoryPosts = extractCategories(post);
    return categoryPosts.some(({ category, subCategory }) => {
      if (!category) return false;

      const postCategorySlug = slugifyCategory(category);
      const postSubCategorySlug = subCategory ? slugifyCategory(subCategory) : '';

      // 카테고리 매칭 (슬러그 또는 원본 이름, 대소문자 구분 없이)
      const categoryMatch =
        postCategorySlug === categorySlug ||
        postCategorySlug.toLowerCase() === categorySlug.toLowerCase() ||
        category === categoryName ||
        category.toLowerCase() === categoryName.toLowerCase();

      // 소카테고리 매칭 (슬러그 또는 원본 이름, 대소문자 구분 없이)
      const subCategoryMatch =
        subCategory &&
        (postSubCategorySlug === subCategorySlug ||
          postSubCategorySlug.toLowerCase() === subCategorySlug.toLowerCase() ||
          subCategory === subCategoryName ||
          subCategory.toLowerCase() === subCategoryName.toLowerCase());

      return categoryMatch && subCategoryMatch;
    });
  });
}
