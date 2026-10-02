import { CaseDrawer, CaseDetailLink } from './case-drawer';
import type { CaseId } from './case-drawer-state';
import styles from './portfolio.module.css';
import { JourneyDetailMap } from './journey-detail-map';

const summaries: Array<{
  id: CaseId;
  title: string;
  description: string;
  perspective: string;
  work: string[];
  related?: { id: CaseId; label: string };
}> = [
  {
    id: 'acquisition',
    title: 'Acquisition · 검색용 웹 구축과 색인 정비',
    description: '굿닥 · 2020 / 뱅크샐러드 · 2025 ~ 2026',
    perspective:
      '서비스를 아직 모르는 사용자에게는 검색·공유 링크가 첫 접점이 됩니다. 웹 개발자는 콘텐츠를 검색엔진이 읽고 색인할 수 있게 만들고, 사용자가 발견한 내용에 실제로 도착할 수 있는 경로를 챙길 수 있다고 봅니다.',
    work: [
      '굿닥 시술백과: 시술·상품 데이터를 활용한 검색 유입용 웹 개발. Gatsby로 여러 콘텐츠 페이지를 빌드 시 미리 생성하는 정적 생성(SSG) 방식 활용',
      '뱅크샐러드 건강 웹: 검색 노출 대상과 색인 상태를 확인하고 sitemap 정비',
      '뱅크샐러드 콘텐츠 웹: 네이버 미색인 문제를 조사·수정한 뒤 전체 콘텐츠의 색인 요청이 필요해져, CI에서의 자동화를 염두에 두고 IndexNow 연동 추진',
      '구현: 콘텐츠 발행·수정 시 웹훅으로 단건 색인을 요청하고, 전체 콘텐츠를 다시 제출할 수 있는 벌크 요청 경로 구성',
      '가이드: SEO 적용·검증 방향을 제시하고, 메타·SSR 폴백·사이트맵·색인 확인 절차가 재사용 가능한 스킬과 운영 가이드로 정리되도록 이끔',
    ],
  },
  {
    id: 'activation',
    title: 'Activation · 첫 이용 흐름 구현',
    description: '유전자검사 2.0 · 기존 화면과 신규 진입 화면의 연결',
    perspective:
      '중요한 것은 화면의 단계를 완료하는 것보다, 사용자가 서비스를 찾은 목적을 달성하고 제품의 핵심 가치를 체감하는 것입니다. 웹 개발자로서 이 ‘아하 모먼트(Aha Moment)’에 도달하는 흐름을 연결하고, 상태 분기와 오류가 사용자의 목적 달성을 막지 않도록 살펴봅니다.',
    work: [
      '기여: 기존 신청·진행 화면과 변경된 결과 화면에 신규 브릿지·상태별 랜딩을 연결. 사용자가 현재 상태에 맞는 단계로 이어지도록 구현',
    ],
    related: { id: 'gene', label: '유전자 구현·검증 상세 보기' },
  },
  {
    id: 'retention',
    title: 'Retention · 알림톡에서 기대한 보험 정보로 연결',
    description: '보험 제품 · 실손보험 안내(actual-medical) · 재진입 경로 보호',
    perspective:
      '알림을 보내는 것만으로 재방문 경험이 완성되지는 않습니다. 자신의 보험 정보를 확인하려고 돌아온 사용자가 메시지에서 기대한 내용을 찾을 수 있도록, 보험 연결·보유 상태에 맞는 화면으로 이어지는 웹뷰를 개발했습니다.',
    work: [
      '실손보험 안내: 보험 연결·보유 상태에 따라 관련 정보로 이어지는 진입 화면 개발',
      '경로 보호: 푸시·알림톡 진입 시 OS별 인코딩 문제 대응',
      '분석·제보: 링크 생성부터 발송·검증까지 반복되는 기술·협의 비용을 문서화하고, 대안 솔루션 검토의 근거 제공',
    ],
  },
  {
    id: 'referral',
    title: 'Referral · 공유 모듈과 수신자의 진입 흐름',
    description: '뱅크샐러드 · 2022년 SNS 공유 모듈 / 건강 정보 공유 개발',
    perspective:
      '추천은 공유 버튼을 누르는 데서 끝나지 않습니다. 전달할 정보가 분명하고, 받는 사람도 그 내용을 이해하고 확인할 수 있어야 합니다. 웹 개발자로서 정보의 표현과 공유 동선을 함께 살펴봅니다.',
    work: [
      '카카오톡 공유 모듈: SDK 연동과 함께 도메인별 공유 데이터를 플랫폼별 데이터 객체로 변환해 UI에 전달하는 구조 구현',
      '수신자 진입: 바우처 선물 링크에서 원링크로 앱에 진입하고, 코드 입력 화면에 전달받은 코드가 자동 입력되는 흐름 구현',
      '레슨런: 플랫폼마다 다른 공유 인터페이스·데이터 형식, 원링크 파라미터 전달과 길이 제약을 정리해 사내 테크톡으로 공유',
    ],
  },
  {
    id: 'revenue',
    title: 'Revenue · 상담 연동과 모니터링',
    description: '보험 중개 MVP · 상담 전환 구간 개발·운영',
    perspective:
      '매출과 연결된 전환 구간은 기능을 출시한 뒤에도 계속 살펴야 합니다. 신청부터 외부 서비스 연결까지 흐름이 동작하는지 구현하고, 전환 지표와 기술 오류를 함께 관측해 이상을 알아챌 수 있게 만드는 것이 웹 개발자의 기여라고 봅니다.',
    work: [
      '기여: 상담 신청·외부 채팅 연결을 구현하고, 오류 알림과 전환 지표 점검으로 출시 이후의 상담 경로도 관측',
      '관측 기준: 기술 오류와 사용자 행동의 단절을 함께 확인. 원인과 대응 필요성은 온콜이 판단',
    ],
    related: { id: 'insurance', label: '보험 제품 구축·운영 상세 보기' },
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
            <h3>웹 개발자로서 보는 지점</h3>
            <p>{summary.perspective}</p>
          </div>
          <JourneyDetailMap id={summary.id} />
          <div className={styles.bodySection}>
            <h3>관련해서 담당한 작업</h3>
            <ul className={styles.bullets}>
              {summary.work.map(work => {
                const separator = work.indexOf(': ');
                return (
                  <li key={work}>
                    {separator === -1 ? (
                      work
                    ) : (
                      <>
                        <strong>{work.slice(0, separator + 1)}</strong>
                        {work.slice(separator + 1)}
                      </>
                    )}
                  </li>
                );
              })}
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
