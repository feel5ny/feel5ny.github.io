import styles from './detail-diagrams.module.css';

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      →
    </span>
  );
}

export function GeneRoutingDiagram() {
  return (
    <figure
      className={styles.figure}
      aria-label="2.0 랜딩에서 검사 상태에 맞는 목적지를 결정하는 구조"
    >
      <figcaption>
        <strong>여러 진입점 → 검사 상태 확인 → 해당 페이지</strong>
        <span>2.0 랜딩의 이동 규칙</span>
      </figcaption>
      <p className={styles.note}>
        다른 도메인의 배너 등에서 진입한 사용자를 검사 상태에 맞는 페이지로 연결합니다. 서버와
        클라이언트 fallback은 같은 이동 규칙을 사용합니다.
      </p>
      <div className={styles.routing}>
        <div className={styles.sources}>
          <div className={styles.node}>
            <span>서버 경로</span>
            <strong>리다이렉트 판단</strong>
          </div>
          <div className={styles.node}>
            <span>클라이언트 경로</span>
            <strong>fallback 판단</strong>
          </div>
        </div>
        <svg
          className={styles.merge}
          viewBox="0 0 32 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 32 H10 V70 H30 M0 108 H10 V70 M24 64 L30 70 L24 76" />
        </svg>
        <div className={`${styles.node} ${styles.shared}`}>
          <span>공유 함수</span>
          <strong>상태별 목적지 결정</strong>
          <code>resolve-redirect-url.ts</code>
          <small>검사 상태에 따른 이동 규칙</small>
        </div>
        <Arrow />
        <div className={styles.node}>
          <span>판단 결과</span>
          <strong>이동할 URL</strong>
          <small>각 실행 경로에서 사용</small>
        </div>
      </div>
      <div className={styles.rules}>
        <span>진입 맥락의 쿼리 유지</span>
        <span>목적지 필수 파라미터 우선</span>
      </div>
    </figure>
  );
}

export function GeneVerificationMap() {
  return (
    <figure className={styles.figure} aria-label="단위 테스트와 MSW의 검증 범위 비교">
      <figcaption>
        <strong>이동 판단과 화면 연결을 나눠 검증</strong>
        <span>2.0 랜딩 검증</span>
      </figcaption>
      <table className={styles.comparison}>
        <thead>
          <tr>
            <th scope="col">검증 수단</th>
            <th scope="col">재현하는 조건</th>
            <th scope="col">확인하는 동작</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">단위 테스트</th>
            <td>검사 상태 · 필수 토큰 누락</td>
            <td>이동 목적지 · 예외 조건</td>
          </tr>
          <tr>
            <th scope="row">MSW</th>
            <td>검사권 보유 · 진행 상태 · API 오류</td>
            <td>상태별 화면 · 다음 화면 연결</td>
          </tr>
        </tbody>
      </table>
      <p className={styles.note}>
        로컬·스테이징의 MSW 시나리오는 서버 리다이렉트를 건너뛰고 클라이언트에서 재현합니다.
      </p>
    </figure>
  );
}

export function ThreeDocSystemMap() {
  return (
    <figure
      className={styles.figure}
      aria-label="결정 배경, 동료의 이해, AI 작업 규칙을 나누는 문서 체계"
    >
      <figcaption>
        <strong>Three-doc system · 정보의 목적에 따라 나누기</strong>
        <span>문서별 독자와 역할</span>
      </figcaption>
      <dl className={styles.documentRoles}>
        <div>
          <dt>
            <code>tech-spec</code>
            <span>당시의 의사결정</span>
          </dt>
          <dd>
            <strong>왜, 무엇을 만들기로 했나?</strong>
            <span>계획과 선택의 근거를 당시 기록으로 보존</span>
          </dd>
        </div>
        <div>
          <dt>
            <code>README.md</code>
            <span>동료의 코드 이해</span>
          </dt>
          <dd>
            <strong>무엇이고, 어떻게 실행하나?</strong>
            <span>코드를 처음 보는 사람에게 동작·실행 방법 안내</span>
          </dd>
        </div>
        <div>
          <dt>
            <code>AGENTS.md</code>
            <span>AI의 작업 기준</span>
          </dt>
          <dd>
            <strong>어떤 규칙과 제약을 지켜야 하나?</strong>
            <span>도메인 규칙·외부 제약·금지 사항 전달</span>
          </dd>
        </div>
      </dl>
      <p className={styles.note}>
        의사결정 이력은 tech-spec으로 연결하고, 코드에서 확인할 수 있는 파일 트리·API 목록은
        중복해서 적지 않는 기준입니다.
      </p>
    </figure>
  );
}
