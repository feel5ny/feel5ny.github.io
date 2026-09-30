import { CaseDrawer, CaseDetailLink } from './case-drawer';
import type { CaseId } from './case-drawer-state';
import styles from './portfolio.module.css';

const summaries: Array<{
  id: CaseId;
  title: string;
  description: string;
  work: string[];
  related?: { id: CaseId; label: string };
}> = [
  {
    id: 'acquisition',
    title: '유입 · 건강 웹 검색 노출',
    description: '2025 ~ 2026 · SEO 정비 경험 요약',
    work: [
      '건강 웹의 검색 노출 대상과 색인 상태를 확인하고 sitemap 정비',
      '네이버 검색 개편 이후 콘텐츠 미색인 문제를 진단하고 IndexNow 기반 색인 요청 자동화 작업에 참여',
    ],
  },
  {
    id: 'activation',
    title: '활성화 · 유전자검사 신청과 랜딩',
    description: '유전자검사 · 상태에 맞는 진입 화면 구성',
    work: [
      '검사 상태·보유 검사권·진입 조건에 따른 흐름을 사전에 정리',
      '2.0의 브릿지·다이나믹 랜딩을 개발하고 기존 신청·진행·반송 흐름과 연결',
      '공통 이동 규칙을 단위 테스트로, 화면 연결을 MSW 시나리오로 검증',
    ],
    related: { id: 'gene', label: '유전자 구현·검증 상세 보기' },
  },
  {
    id: 'retention',
    title: '유지 · 메시지에서 제품으로 재진입',
    description: '보험 제품 · 푸시·알림톡 진입과 웹뷰 라우팅',
    work: [
      '보험 제품의 앱 푸시·알림톡 진입 페이지 개발',
      'iOS 딥링크·Android openView의 이중 인코딩 문제에 대응하고, openView 미인코딩 처리와 실험 키 통일 적용',
    ],
  },
  {
    id: 'referral',
    title: '추천 · 발병률·병원비 미리보기 공유',
    description: '건강 정보의 확인과 공유 기능',
    work: [
      '발병률·병원비 미리보기 상세 화면 개발',
      '사용자가 확인한 정보를 다른 사람에게 전달하는 공유 기능 개발',
    ],
  },
  {
    id: 'revenue',
    title: '수익 · 상담 연동과 모니터링',
    description: '보험 중개 MVP · 상담 전환 구간 개발·운영',
    work: [
      '상담 신청·외부 채팅 연동·상담사용 웹뷰 개발',
      'Amplitude 퍼널·이상 지표 알림, Sentry 오류 알림·실험 태그와 각 레이어 모니터링 추가',
      '해피톡의 연동 제약과 장애 대응·사후 매핑 절차 문서화',
    ],
    related: { id: 'insurance', label: '해피톡 분석·대응 정책 상세 보기' },
  },
];

export function JourneyDetails() {
  return (
    <>
      {summaries.map(summary => (
        <CaseDrawer
          key={summary.id}
          id={summary.id}
          title={summary.title}
          description={summary.description}
          showTrigger={false}
        >
          <div className={styles.bodySection}>
            <h3>담당한 작업</h3>
            <ul className={styles.bullets}>
              {summary.work.map(work => (
                <li key={work}>{work}</li>
              ))}
            </ul>
          </div>
          {summary.related && (
            <div className={styles.linkRow}>
              <CaseDetailLink id={summary.related.id}>{summary.related.label}</CaseDetailLink>
            </div>
          )}
        </CaseDrawer>
      ))}
    </>
  );
}
