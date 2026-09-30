import type { CaseId } from './case-drawer-state';
import styles from './journey-detail-map.module.css';

type Step = { title: string; detail: string };
type MapContent = {
  title: string;
  note: string;
  lanes: { label: string; steps: Step[] }[];
};

const maps: Partial<Record<CaseId, MapContent>> = {
  acquisition: {
    title: '검색에 발견되기까지, 서로 다른 세 작업',
    note: '제품별 구현 경로 · 색인 요청과 실제 검색 노출은 별개',
    lanes: [
      {
        label: '굿닥 · 시술백과',
        steps: [
          { title: '시술·상품 데이터', detail: '검색할 콘텐츠' },
          { title: 'Gatsby · SSG', detail: '빌드 시 페이지 생성' },
          { title: '검색용 웹', detail: '콘텐츠별 진입 페이지' },
        ],
      },
      {
        label: '뱅크샐러드 · 건강 웹',
        steps: [
          { title: '노출 대상 확인', detail: 'URL·색인 상태 점검' },
          { title: 'sitemap 정비', detail: '검색엔진에 URL 전달' },
          { title: '색인 확인', detail: '검색 노출 상태 점검' },
        ],
      },
      {
        label: '뱅크샐러드 · 콘텐츠 웹',
        steps: [
          { title: '발행·수정 / 전체 재제출', detail: '단건 웹훅·벌크 요청' },
          { title: 'IndexNow 연동', detail: '색인 요청 자동화' },
          { title: '검색엔진에 제출', detail: '변경된 콘텐츠 URL' },
        ],
      },
    ],
  },
  activation: {
    title: '진입한 사용자를 지금 필요한 화면으로',
    note: '유전자검사 2.0 · 상태에 맞는 화면 연결과 전환 확인',
    lanes: [
      {
        label: '사용자 경로',
        steps: [
          { title: '배너 등에서 진입', detail: '다른 도메인의 접점' },
          { title: '상태별 랜딩', detail: '첫 이용 · 검사 중 · 결과 있음' },
          { title: '필요한 화면', detail: '신청 · 진행 확인 · 결과 조회' },
        ],
      },
      {
        label: '개발에서 확인한 것',
        steps: [
          { title: '진입 조건 정리', detail: '검사권·진행 상태' },
          { title: '단위 테스트', detail: '상태별 이동 규칙' },
          { title: 'MSW 시나리오', detail: '화면 연결·다음 단계 전환' },
        ],
      },
    ],
  },
  referral: {
    title: '공유 모듈에서 수신자의 앱 진입까지',
    note: '2022년 SNS 공유 구현·레슨런 기준',
    lanes: [
      {
        label: '보내는 쪽 · 공유 모듈',
        steps: [
          { title: '도메인별 데이터', detail: '제목·내용·이미지·링크' },
          { title: '플랫폼별 객체 생성', detail: '각 공유 인터페이스에 맞게 변환' },
          { title: '공유 UI에 전달', detail: '카카오톡 SDK · SNS · OS 공유' },
        ],
      },
      {
        label: '받는 쪽 · 바우처 선물',
        steps: [
          { title: '카카오톡 콘텐츠', detail: '공유받은 링크 선택' },
          { title: '원링크 → 앱 진입', detail: '바우처 코드 전달' },
          { title: '코드 입력 화면', detail: '전달받은 코드 자동 입력' },
        ],
      },
    ],
  },
  revenue: {
    title: '배포 전 검증, 운영 중 두 속도의 관측',
    note: '오류 알림과 일일 지표 점검은 서로를 보완하는 독립 경로',
    lanes: [
      {
        label: '배포 전 · 변경 확인',
        steps: [
          { title: '완료 이벤트 변경', detail: '보험 연동 여부 추가' },
          { title: '기존 훅 테스트 보강', detail: '전달되는 속성값 검증' },
          { title: '변경 동작 확인', detail: '의도한 이벤트 호출 점검' },
        ],
      },
      {
        label: '운영 중 · 빠른 대응',
        steps: [
          { title: '중요 오류 발생', detail: 'CriticalError로 분류' },
          { title: 'Sentry 알림', detail: 'fatal · 메시지별 그룹화' },
          { title: '우선 확인·대응', detail: '오류의 원인과 영향 파악' },
        ],
      },
      {
        label: '운영 중 · 일일 관측',
        steps: [
          { title: '유입·클릭·완료 이벤트', detail: '매출·지표용 이벤트 활용' },
          { title: '퍼널 대시보드·Agent', detail: '전환 급락·경로 단절 점검' },
          { title: '온콜 확인·대응', detail: '추세·경로를 보고 원인 판단' },
        ],
      },
    ],
  },
};

function RetentionDetailMap() {
  return (
    <div className={styles.retentionCases}>
      <figure className={styles.figure} aria-labelledby="retention-map-title">
        <figcaption id="retention-map-title">
          <span>IMPLEMENTATION · 직접 구현·수정</span>
          <strong>진입 오류 수정</strong>
        </figcaption>
        <div className={styles.lanes}>
          <ol className={styles.steps}>
            <li>
              <strong>푸시·알림톡</strong>
              <span>메시지 링크로 진입</span>
            </li>
            <li>
              <strong>앱·웹뷰 라우팅</strong>
              <span>iOS 딥링크 · Android openView</span>
            </li>
            <li>
              <strong>관련 화면</strong>
              <span>보험 제품의 진입 페이지</span>
            </li>
          </ol>
        </div>
        <p className={styles.fixNote}>
          <strong>수정한 지점</strong>
          <span>이중 인코딩 문제 대응 · openView 미인코딩 처리 · 실험 키 통일</span>
        </p>
      </figure>
      <figure
        className={`${styles.figure} ${styles.analysis}`}
        aria-labelledby="retention-analysis-title"
      >
        <figcaption id="retention-analysis-title">
          <span>PROBLEM ANALYSIS · 문제 분석·제보</span>
          <strong>링크 운영 제약 분석</strong>
        </figcaption>
        <ul className={styles.constraints}>
          <li>
            <strong>생성 복잡도</strong>
            <span>
              중첩 인코딩
              <br />
              사용자·마케팅 파라미터 교체
            </span>
          </li>
          <li>
            <strong>발송 제약</strong>
            <span>
              채널별 링크 길이 제한
              <br />
              검수용·발송용 링크 구분
            </span>
          </li>
          <li>
            <strong>반복되는 운영 비용</strong>
            <span>
              OS·채널별 테스트
              <br />
              PM·마케팅·서버 간 협의
            </span>
          </li>
        </ul>
        <dl className={styles.contribution}>
          <div>
            <dt>내가 한 일</dt>
            <dd>
              페인포인트 문서화·레이즈. 짧은 링크에서도 파라미터를 변경할 수 있어야 한다는 요구조건
              제시
            </dd>
          </div>
          <div>
            <dt>이후 조직의 변화</dt>
            <dd>에어브릿지 전환 진행</dd>
          </div>
        </dl>
      </figure>
    </div>
  );
}

export function JourneyDetailMap({ id }: { id: CaseId }) {
  if (id === 'retention') return <RetentionDetailMap />;
  const content = maps[id];
  if (!content) return null;
  return (
    <figure className={styles.figure} aria-labelledby={`${id}-map-title`}>
      <figcaption id={`${id}-map-title`}>
        <strong>{content.title}</strong>
        <span>{content.note}</span>
      </figcaption>
      <div className={styles.lanes}>
        {content.lanes.map(lane => (
          <div className={styles.lane} key={lane.label}>
            <h4>{lane.label}</h4>
            <ol className={styles.steps}>
              {lane.steps.map(step => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </figure>
  );
}
