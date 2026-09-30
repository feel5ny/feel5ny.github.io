import styles from './gene-transition-map.module.css';

export function GeneTransitionMap() {
  return (
    <figure className={styles.figure} aria-labelledby="gene-transition-title">
      <figcaption id="gene-transition-title">
        <strong>운영 중인 제품을 바꾸는 세 가지 장치</strong>
        <span>기존 동작 보호 → 공개 제어 → 전환 후 정리</span>
      </figcaption>
      <p className={styles.hint}>좁은 화면에서는 좌우로 넘겨 볼 수 있습니다.</p>
      <div
        className={styles.scroll}
        tabIndex={0}
        role="region"
        aria-label="리뉴얼 전환 과정, 좌우 스크롤 가능"
      >
        <ol className={styles.stages}>
          <li className={styles.stage}>
            <span className={styles.phase}>01 · 변경 전</span>
            <h4>유지할 동작을 먼저 고정</h4>
            <div className={styles.node}>
              <strong>기존 신청·반송 흐름</strong>
            </div>
            <span className={styles.down} aria-hidden="true">
              ↓
            </span>
            <div className={styles.node}>
              <strong>테스트 작성 → 리팩토링</strong>
            </div>
            <p>바뀌면 안 되는 동작의 회귀 확인</p>
          </li>
          <li className={styles.stage}>
            <span className={styles.phase}>02 · 전환기</span>
            <h4>배포와 신규 화면 공개를 분리</h4>
            <div className={styles.gate}>
              <strong>Feature Flag</strong>
              <span>웹·웹뷰 진입부</span>
            </div>
            <svg
              className={styles.fork}
              viewBox="0 0 240 32"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M120 0V12 M60 32V12H180V32" />
            </svg>
            <div className={styles.versions}>
              <div className={styles.node}>
                <strong>기존 화면</strong>
              </div>
              <div className={styles.node}>
                <strong>2.0 화면</strong>
              </div>
            </div>
            <p>두 버전과 분기 조건을 함께 유지</p>
          </li>
          <li className={styles.stage}>
            <span className={styles.phase}>03 · 공개·안정화 후</span>
            <h4>2.0을 기본 경로로 전환</h4>
            <div className={styles.node}>
              <strong>2.0 화면</strong>
              <span>기본 진입 경로</span>
            </div>
            <div className={styles.cleanup}>
              <span>정리 대상</span>
              <strong>기존 화면 · FF 분기 · 실험키</strong>
            </div>
            <p>공통 코드·외부 URL 영향 확인</p>
          </li>
        </ol>
      </div>
      <dl className={styles.checks}>
        <div>
          <dt>새 흐름 검증 · MSW</dt>
          <dd>검사권·진행 상태·API 오류를 재현해 화면 전환 확인</dd>
        </div>
        <div>
          <dt>실험 오류 관측 · Sentry</dt>
          <dd>실험 태그를 기준으로 관련 오류 모니터링</dd>
        </div>
      </dl>
    </figure>
  );
}
