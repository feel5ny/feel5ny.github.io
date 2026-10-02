import type { CaseId } from './case-drawer-state';
import styles from './journey-detail-map.module.css';

type Step = { title: string; detail: string };
type Purpose = {
  label: string;
  title: string;
  note: string;
  kind: 'flow' | 'checks' | 'routing' | 'indexing';
  steps: Step[];
};
type MapContent = {
  title: string;
  lanes: Purpose[];
};

const maps: Partial<Record<CaseId, MapContent>> = {
  acquisition: {
    title: '검색에 발견되기까지, 서로 다른 세 작업',
    lanes: [
      {
        label: '굿닥 · 시술백과',
        title: '검색용 웹 구축',
        note: '콘텐츠를 검색 가능한 개별 페이지로 구성',
        kind: 'flow',
        steps: [
          { title: '시술·상품 데이터', detail: '검색할 콘텐츠' },
          { title: 'Gatsby · SSG', detail: '빌드 시 페이지 생성' },
          { title: '검색용 웹', detail: '콘텐츠별 진입 페이지' },
        ],
      },
      {
        label: '뱅크샐러드 · 건강 웹',
        title: '검색 노출 대상과 색인 상태 점검',
        note: '검색엔진에 전달할 URL과 실제 색인 여부를 각각 확인',
        kind: 'checks',
        steps: [
          { title: '노출 대상 확인', detail: 'URL·색인 상태 점검' },
          { title: 'sitemap 정비', detail: '검색엔진에 URL 전달' },
          { title: '색인 확인', detail: '검색 노출 상태 점검' },
        ],
      },
      {
        label: '뱅크샐러드 · 콘텐츠 웹',
        title: '변경분 요청과 전체 재제출 경로 구성',
        note: 'IndexNow 색인 요청 · 제출이 실제 색인을 보장하지는 않음',
        kind: 'indexing',
        steps: [
          { title: '발행·수정', detail: '웹훅으로 단건 요청' },
          { title: '전체 재제출', detail: '벌크 요청 경로' },
          { title: 'IndexNow 연동', detail: '콘텐츠 URL 색인 요청' },
          { title: '검색엔진에 제출', detail: '대상 콘텐츠 URL' },
        ],
      },
    ],
  },
  activation: {
    title: '진입한 사용자를 지금 필요한 화면으로',
    lanes: [
      {
        label: '화면 연결 · 유전자검사 2.0',
        title: '진입 상태에 따라 필요한 화면으로 분기',
        note: '대표 상태의 개념도 · 실제 이동은 검사권·진입 조건도 함께 고려',
        kind: 'routing',
        steps: [
          { title: '첫 이용', detail: '신청 화면' },
          { title: '검사 진행 중', detail: '진행 확인 화면' },
          { title: '결과 있음', detail: '결과 조회 화면' },
        ],
      },
    ],
  },
  referral: {
    title: '공유 모듈에서 수신자의 앱 진입까지',
    lanes: [
      {
        label: '보내는 쪽 · 공유 모듈',
        title: '공유 데이터를 플랫폼별 형식으로 변환',
        note: '2022년 SNS 공유 구현 · 데이터 변환과 UI 전달',
        kind: 'flow',
        steps: [
          { title: '도메인별 데이터', detail: '제목·내용·이미지·링크' },
          { title: '플랫폼별 객체 생성', detail: '각 공유 인터페이스에 맞게 변환' },
          { title: '공유 UI에 전달', detail: '카카오톡 SDK · SNS · OS 공유' },
        ],
      },
      {
        label: '받는 쪽 · 바우처 선물',
        title: '전달받은 정보를 앱 안의 행동으로 연결',
        note: '링크 선택 이후 바우처 코드가 전달되는 경로',
        kind: 'flow',
        steps: [
          { title: '카카오톡 콘텐츠', detail: '공유받은 링크 선택' },
          { title: '원링크 → 앱 진입', detail: '바우처 코드 전달' },
          { title: '코드 입력 화면', detail: '전달받은 코드 자동 입력' },
        ],
      },
    ],
  },
  revenue: {
    title: '상담 경로를 지키는 두 속도의 관측',
    lanes: [
      {
        label: '운영 중 · 상호 보완하는 관측',
        title: '기술 오류와 전환 단절을 함께 확인',
        note: '오류 알림으로 빠르게 대응하고, 일일 지표 점검으로 빈틈을 보완',
        kind: 'checks',
        steps: [
          { title: '오류 발생 시', detail: 'CriticalError · Sentry 중요 오류 알림' },
          { title: '매일', detail: 'Amplitude 퍼널 · Agent로 전환 급락·단절 점검' },
          { title: '대응 판단', detail: '온콜이 오류·지표의 원인과 영향을 확인' },
        ],
      },
    ],
  },
};

function RetentionDetailMap() {
  return (
    <div className={styles.purposePanels}>
      <figure className={styles.figure} aria-labelledby="retention-medical-title">
        <figcaption id="retention-medical-title">
          <span>정보 확인 · 실손보험 안내</span>
          <strong>메시지를 보고 돌아온 사용자를 상태에 맞는 정보로 연결</strong>
          <span>진입 단계에 따라 보험 연결 여부 확인 또는 연결·보유 상태 확인 흐름 진행</span>
        </figcaption>
        <div className={styles.lanes}>
          <FlowSteps
            steps={[
              { title: '알림톡으로 재방문', detail: '실손보험 관련 내용 확인' },
              { title: '사용자 상태 확인', detail: '보험 연결·실손 보유 여부' },
              { title: '관련 정보로 이동', detail: '내 보험·보험 상세·미보유 안내' },
            ]}
          />
        </div>
      </figure>
      <figure
        className={`${styles.figure} ${styles.analysis}`}
        aria-labelledby="retention-routing-title"
      >
        <figcaption id="retention-routing-title">
          <span>경로 보호 · 직접 수정</span>
          <strong>메시지에서 화면까지, OS별 진입 오류 대응</strong>
        </figcaption>
        <p className={styles.fixNote}>
          <strong>iOS 딥링크 · Android openView</strong>
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

function FlowSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map(step => (
        <li key={step.title}>
          <strong>{step.title}</strong>
          <span>{step.detail}</span>
        </li>
      ))}
    </ol>
  );
}

function PurposeDiagram({ purpose }: { purpose: Purpose }) {
  if (purpose.kind === 'checks') {
    return (
      <dl className={styles.checks}>
        {purpose.steps.map(step => (
          <div key={step.title}>
            <dt>{step.title}</dt>
            <dd>{step.detail}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (purpose.kind === 'routing') {
    return (
      <div className={styles.routing}>
        <div className={styles.routingSource}>
          <span>다른 도메인의 접점</span>
          <strong>배너 등으로 진입</strong>
          <span>상태별 랜딩에서 목적지 판단</span>
        </div>
        <span className={styles.connector} aria-hidden="true">
          →
        </span>
        <dl className={styles.routes}>
          {purpose.steps.map(step => (
            <div key={step.title}>
              <dt>{step.title}</dt>
              <span aria-hidden="true">→</span>
              <dd>{step.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  if (purpose.kind === 'indexing') {
    return (
      <div className={styles.indexing}>
        <ul className={styles.inputs} aria-label="색인 요청을 시작하는 두 경로">
          {purpose.steps.slice(0, 2).map(step => (
            <li className={styles.node} key={step.title}>
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </li>
          ))}
        </ul>
        <span className={styles.connector} aria-hidden="true">
          →
        </span>
        <div className={styles.node}>
          <strong>{purpose.steps[2].title}</strong>
          <span>{purpose.steps[2].detail}</span>
        </div>
        <span className={styles.connector} aria-hidden="true">
          →
        </span>
        <div className={styles.node}>
          <strong>{purpose.steps[3].title}</strong>
          <span>{purpose.steps[3].detail}</span>
        </div>
      </div>
    );
  }
  return <FlowSteps steps={purpose.steps} />;
}

export function JourneyDetailMap({ id }: { id: CaseId }) {
  if (id === 'retention') return <RetentionDetailMap />;
  const content = maps[id];
  if (!content) return null;
  return (
    <div className={styles.purposePanels} role="group" aria-label={content.title}>
      {content.lanes.map((purpose, index) => (
        <figure
          className={`${styles.figure} ${purpose.kind === 'checks' ? styles.analysis : ''}`}
          key={purpose.label}
          aria-labelledby={`${id}-purpose-${index}`}
        >
          <figcaption id={`${id}-purpose-${index}`}>
            <span className={styles.purposeLabel}>{purpose.label}</span>
            <strong>{purpose.title}</strong>
            <span>{purpose.note}</span>
          </figcaption>
          <div className={styles.diagramBody}>
            <PurposeDiagram purpose={purpose} />
          </div>
        </figure>
      ))}
    </div>
  );
}
