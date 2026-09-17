import type { Metadata } from 'next';
import { PortfolioV2 } from '@/components/portfolio-v2';

export const metadata: Metadata = {
  title: '김나영 — 만드는 일, 함께 일하는 방식',
  description: '프론트엔드 개발자 김나영의 제품 개발, AI 셀프 리뷰, 웹 팀 운영 경험.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/private/portfolio-2026-v2/' },
};

export default function PortfolioPage() {
  return <PortfolioV2 />;
}
