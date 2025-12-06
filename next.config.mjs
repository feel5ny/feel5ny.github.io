import nextra from 'nextra'

const withNextra = nextra({
    defaultShowCopyCode: true,
    // readingTime: true
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  // 정적 사이트 생성 (GitHub Pages 배포용)
  output: 'export',
  trailingSlash: true, // 모든 경로에 trailing slash 추가 (index.html 생성)
  // basePath는 루트 경로인 경우 제거 (또는 빈 문자열)
  images: {
    unoptimized: true, // 정적 export 시 이미지 최적화 비활성화
  },
  // rewrites는 정적 export에서 작동하지 않으므로 제거
  // 날짜 기반 URL은 빌드 시 정적 파일로 생성됨
})