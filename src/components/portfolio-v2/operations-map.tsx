import styles from './operations-map.module.css';

export function OperationsMap() {
  return (
    <figure className={styles.diagram} aria-labelledby="operations-map-title">
      <figcaption id="operations-map-title">병목을 줄이기 위한 운영 구조</figcaption>
      <div className={styles.comparison}>
        <div className={styles.before}>
          <div className={styles.heading}>
            <span>AS-IS</span>
            <h3>사람에게 모이는 업무</h3>
          </div>
          <div className={styles.requests}>
            <span>질문</span>
            <span>판단 요청</span>
            <span>실행 요청</span>
          </div>
          <span className={styles.arrow} aria-hidden="true">
            ↓
          </span>
          <div className={styles.bottleneck}>
            <strong>특정인의 맥락과 대응에 의존</strong>
            <span>질문 · 판단 · 실행이 한곳에 집중</span>
          </div>
          <p className={styles.note}>담당 경계가 모호한 업무까지 모이며 병목 발생</p>
        </div>
        <span className={styles.changeArrow} aria-hidden="true">
          →
        </span>
        <div className={styles.after}>
          <div className={styles.heading}>
            <span>TO-BE</span>
            <h3>영역의 맥락을 가진 담당자가 판단</h3>
          </div>
          <ul className={styles.distributed} aria-label="각 문제를 관련 영역으로 나누어 처리">
            {['레포 관리', '라우팅', '관측·모니터링'].map(area => (
              <li key={area}>
                <span className={styles.problem}>{area}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↓
                </span>
                <div className={styles.domain}>
                  <strong>영역 담당자</strong>
                  <span>코드·운영 이력 이해</span>
                  <span className={styles.decision}>판단 · 리뷰</span>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.context}>
            각 영역의 맥락으로 대안을 검토하고, 구현은 제품팀·별도 작업팀과 분담
          </p>
          <div className={styles.sharedContext}>
            <strong>판단 근거는 함께 축적</strong>
            <span>ADR·티켓에 남겨 다음 판단과 인수인계에 활용</span>
          </div>
          <p className={styles.note}>
            전체 10개 중 대표 영역입니다. 영역 간 영향이 있는 결정은 관련 담당자와 협의합니다.
          </p>
        </div>
      </div>
      <p className={styles.status}>
        한 사람에게 판단과 실행을 모으지 않고, 각 영역의 맥락을 더 나은 의사결정에 활용하려는
        구조입니다.
      </p>
    </figure>
  );
}
