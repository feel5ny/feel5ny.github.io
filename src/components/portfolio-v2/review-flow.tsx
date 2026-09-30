import styles from './review-flow.module.css';

export function ReviewFlow() {
  return (
    <figure className={styles.figure} aria-labelledby="review-flow-title">
      <figcaption id="review-flow-title">
        <strong>필요한 리뷰를 실행하고, 근거가 확인된 결과만 전달</strong>
        <span>pre-review 실행 구조</span>
      </figcaption>
      <p className={styles.scrollHint} id="review-flow-scroll-hint">
        좌우로 스크롤해 전체 흐름을 볼 수 있어요.
      </p>
      <div
        className={styles.scroll}
        role="region"
        aria-label="AI 리뷰 실행 구조도"
        aria-describedby="review-flow-scroll-hint"
        tabIndex={0}
      >
        <div className={styles.graph}>
          <div className={styles.node}>
            <span className={styles.step}>01 · 입력</span>
            <strong>diff</strong>
            <span>변경 파일 목록</span>
          </div>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <div className={styles.node}>
            <span className={styles.step}>02 · 선택</span>
            <strong>라우터</strong>
            <span>
              파일 경로 × 발동 조건
              <br />
              위험도 프로필 적용
            </span>
            <small>bash · LLM 호출 없음</small>
          </div>
          <svg
            className={styles.split}
            viewBox="0 0 32 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M 0 150 L 27 50 M 21 53 L 27 50 L 28 57" />
            <path d="M 0 150 L 27 150 M 22 145 L 27 150 L 22 155" />
            <path className={styles.inactivePath} d="M 0 150 L 27 250 M 21 247 L 27 250 L 28 243" />
          </svg>
          <div className={styles.layers}>
            <div className={styles.node}>
              <span className={styles.step}>03 · 발동 레이어 병렬 실행</span>
              <strong>고위험 검토 · 개별 실행</strong>
              <span>correctness · security · blocker</span>
              <small>로직 오류 · 보안 · 사용처 영향</small>
            </div>
            <div className={styles.node}>
              <span className={styles.step}>low · standard</span>
              <strong>일반 검토 · 한 번에 묶음</strong>
              <span>
                convention · readability · react-core
                <br />
                test · domain
              </span>
            </div>
            <div className={`${styles.node} ${styles.inactive}`}>
              <strong>미발동 레이어</strong>
              <span>실행하지 않음</span>
              <small>추가 LLM 호출 없음</small>
            </div>
          </div>
          <svg
            className={styles.merge}
            viewBox="0 0 32 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M 0 50 L 27 150 M 0 150 L 27 150 M 22 145 L 27 150 L 22 155" />
          </svg>
          <div className={styles.validation}>
            <div className={`${styles.node} ${styles.verified}`}>
              <span className={styles.step}>04 · 결과 재검증</span>
              <strong>검증 패스</strong>
              <span>
                인용 파일·라인·심볼 확인
                <br />
                레이어 간 모순 확인
              </span>
              <small>grep · git show</small>
            </div>
            <div className={styles.discarded}>
              <span aria-hidden="true">↓</span>
              <strong>근거가 없으면 제외</strong>
              <span>건수·사유 기록</span>
            </div>
          </div>
          <div className={styles.accepted} aria-hidden="true">
            <span>통과만</span>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={styles.node}>
            <span className={styles.step}>05 · 전달</span>
            <strong>pN 리포트</strong>
            <span>
              중요 지적은 코드 옆에
              <br />
              낮은 우선순위는 접기
            </span>
            <small>
              맥락 요약 · 검토 SHA
              <br />
              실행 메트릭 기록
            </small>
          </div>
        </div>
      </div>
      <p className={styles.caption}>
        발동한 레이어만 실행하고, 검증을 통과한 발견을 리포트에 싣습니다. 실제 실행 묶음과 모델
        티어는 변경 규모·경로·프로필에 따라 조정합니다.
      </p>
    </figure>
  );
}
