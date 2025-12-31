// 텍스트를 URL-safe slug로 변환
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-가-힣]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

