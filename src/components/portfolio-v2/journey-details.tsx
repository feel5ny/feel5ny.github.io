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
    ],
  },
  {
    id: 'activation',
    title: 'Activation · 첫 이용 흐름 구현',
    description: '유전자검사 · 신청부터 결과 확인까지 이어지는 화면·상태 전환 개발',
    perspective:
      '중요한 것은 화면의 단계를 완료하는 것보다, 사용자가 서비스를 찾은 목적을 달성하고 제품의 핵심 가치를 체감하는 것입니다. 웹 개발자로서 이 ‘아하 모먼트(Aha Moment)’에 도달하는 흐름을 연결하고, 상태 분기와 오류가 사용자의 목적 달성을 막지 않도록 살펴봅니다.',
    work: [
      '화면 개발: 유전자검사 출시·운영 과정에서 신청·동의·결과 확인에 필요한 웹 화면과 전환 흐름 구현',
      '상태별 연결: 2.0의 브릿지·다이나믹 랜딩 개발. 다른 도메인의 배너 등에서 진입해도 첫 이용·검사 진행·결과 확인 상태에 맞는 화면으로 연결',
      '검증: 단위 테스트로 상태별 이동 규칙을 확인하고, MSW로 여러 상태의 화면 연결과 다음 단계 전환을 점검',
    ],
    related: { id: 'gene', label: '유전자 구현·검증 상세 보기' },
  },
  {
    id: 'retention',
    title: 'Retention · 재진입 경로의 구현과 운영 제약 개선',
    description: '보험 제품 · 진입 오류 대응 / 딥링크 운영 문제 분석·전환 필요성 제기',
    perspective:
      '재방문할 이유는 제품이 만들지만, 그 이유를 확인하러 온 사용자의 경로는 개발에서도 지켜야 합니다. 알림에서 기대한 내용으로 도착하고, 앱·웹뷰를 오가도 진입 맥락이 끊기지 않는지 살펴봅니다.',
    work: [
      '보험 제품의 앱 푸시·알림톡 진입 페이지 개발',
      'iOS 딥링크·Android openView의 이중 인코딩 문제에 대응하고, openView 미인코딩 처리와 실험 키 통일 적용',
      '운영 문제 분석: 웹 URL → 딥링크 → 다이나믹링크 → 알림톡 검수까지의 작업을 정리. 중첩 인코딩, 사용자별 파라미터 교체, 발송 채널의 길이 제한과 OS·채널별 테스트 비용을 가시화',
      '개선 요구 제시: PM·마케팅·서버와 반복해서 맞춰야 하는 정보와 개발자 개입 지점을 정리하고, 짧은 링크에서도 파라미터를 변경할 수 있어야 한다는 대안 솔루션의 요구조건 제시',
      '전환 논의에 기여: 페인포인트를 문서화해 레이즈했고, 이후 에어브릿지 전환이 진행됨. 문제 제보와 검토 근거 제공을 담당',
    ],
  },
  {
    id: 'referral',
    title: 'Referral · 공유 모듈과 수신자의 진입 흐름',
    description: '뱅크샐러드 · 2022년 SNS 공유 모듈 / 건강 정보 공유 개발',
    perspective:
      '추천은 공유 버튼을 누르는 데서 끝나지 않습니다. 전달할 정보가 분명하고, 받는 사람도 그 내용을 이해하고 확인할 수 있어야 합니다. 웹 개발자로서 정보의 표현과 공유 동선을 함께 살펴봅니다.',
    work: [
      '사용자가 확인한 정보를 다른 사람에게 전달하는 공유 기능 개발',
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
      '상담 신청·외부 채팅 연동·상담사용 웹뷰 개발',
      '배포 전 확인: 상담 신청 완료 이벤트에 보험 연동 여부가 올바르게 전달되는지 검증하도록 기존 테스트 보강',
      '빠른 오류 대응: 보험 상담의 중요 오류를 CriticalError 클래스와 공통 핸들러로 분류·수집하고, Sentry 알림을 받아 우선 대응',
      '전환 이상 감지: 매출 대시보드의 이벤트와 지표용으로 추가한 이벤트를 활용해 Amplitude 퍼널 구성. Agent의 일일 점검·알림으로 전환 급락과 경로 단절을 확인하는 관측 층을 추가',
      '해피톡의 연동 제약과 장애 대응·사후 매핑 절차 문서화',
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
