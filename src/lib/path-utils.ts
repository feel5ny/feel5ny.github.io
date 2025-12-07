// 정적 파일 경로인지 확인하는 헬퍼 함수
export function isStaticAssetPath(mdxPath: string[]): boolean {
  if (!mdxPath || mdxPath.length === 0) return false;

  const firstSegment = mdxPath[0];
  const staticExtensions = [
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.webp',
    '.css',
    '.js',
    '.json',
    '.xml',
    '.txt',
  ];
  const lastSegment = mdxPath[mdxPath.length - 1];

  // 마지막 세그먼트가 정적 파일 확장자로 끝나는지 확인
  if (staticExtensions.some(ext => lastSegment.toLowerCase().endsWith(ext))) {
    return true;
  }

  // favicon, robots.txt 등 특정 파일명 체크
  if (
    firstSegment === 'favicon.ico' ||
    firstSegment === 'robots.txt' ||
    firstSegment === 'sitemap.xml'
  ) {
    return true;
  }

  return false;
}

// 날짜 기반 경로인지 확인
export function isDateBasedPath(mdxPath: string[]): boolean {
  return (
    mdxPath.length >= 4 &&
    /^\d{4}$/.test(mdxPath[0]) &&
    /^\d{2}$/.test(mdxPath[1]) &&
    /^\d{2}$/.test(mdxPath[2])
  );
}

// 연도만 있는 경로인지 확인
export function isYearOnlyPath(mdxPath: string[]): boolean {
  return mdxPath.length === 1 && /^\d{4}$/.test(mdxPath[0]);
}

// 포스트 페이지인지 확인
export function isPostPage(mdxPath: string[]): boolean {
  if (!mdxPath || mdxPath.length === 0) return false;

  return (
    mdxPath.includes('posts') ||
    (mdxPath.length >= 3 &&
      /^\d{4}$/.test(mdxPath[0]) &&
      /^\d{2}$/.test(mdxPath[1]) &&
      /^\d{2}$/.test(mdxPath[2]))
  );
}

