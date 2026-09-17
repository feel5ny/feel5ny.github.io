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
            <span>TO-BE · 정착 중</span>
            <h3>기준에 따라 나누는 업무</h3>
          </div>
          <div className={styles.framework}>
            <strong>공통 운영 프레임워크</strong>
            <span>담당 체계 · 역할 경계 · 협의 경로</span>
          </div>
          <span className={styles.arrow} aria-hidden="true">
            ↓
          </span>
          <div className={styles.branches}>
            <div>
              <span>실행할 업무</span>
              <strong>영역 담당자</strong>
            </div>
            <div>
              <span>판단이 필요한 업무</span>
              <strong>협의 · 의사결정</strong>
            </div>
          </div>
          <p className={styles.note}>안내·스펙·결정 기록으로 다음 담당자에게 맥락 연결</p>
        </div>
      </div>
      <p className={styles.status}>
        목표는 담당자가 바뀌어도 이어지는 운영입니다. 역할 배분과 참여 정착은 계속 보완하고
        있습니다.
      </p>
    </figure>
  );
}
