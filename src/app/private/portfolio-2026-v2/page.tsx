import type { Metadata } from 'next';
import { PortfolioV2 } from '@/components/portfolio-v2';

const title = '김나영 | 프론트엔드 개발자 포트폴리오';
const description =
  '운영 중인 서비스의 리뉴얼부터 신규 제품 구축까지. 사용자와 동료, 다음 작업자를 생각하며 제품과 일하는 방식을 함께 개선합니다.';
const shareImage = '/images/portfolio/portfolio-2026-og-v2.png';
const shareImageAlt = '만드는 일, 함께 일하는 방식. 프론트엔드 개발자 김나영의 포트폴리오';
const portfolioPath = '/private/portfolio-2026-v2/';

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: '김나영' }],
  openGraph: {
    title,
    description,
    url: portfolioPath,
    siteName: '김나영 포트폴리오',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: shareImage,
        width: 1733,
        height: 907,
        type: 'image/png',
        alt: shareImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: shareImage, alt: shareImageAlt }],
  },
  robots: { index: false, follow: false },
  alternates: { canonical: portfolioPath },
};

export default function PortfolioPage() {
  return <PortfolioV2 />;
}
