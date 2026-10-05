import styles from './portfolio.module.css';
import diagram from './funnel-history-details.module.css';

export function FunnelHistoryDetails() {
  return (
    <div className={styles.bodySection}>
      <h3>useFunnel. 조건부 단계를 거쳐도 뒤로가기 동작은 일관되게</h3>
      <p className={styles.caption}>가족력 완벽대비 · 2026.07</p>
      <ul className={styles.bullets}>
        <li>
          <strong>구성:</strong> <code>@use-funnel/next</code>로 입력·정보 연동 단계를 관리. 추가
          연동이 필요한 사용자만 <code>history.push</code>로 연동 단계에 진입
        </li>
        <li>
          <strong>문제:</strong> 연동 후 결과로 이동하면, 뒤로가기 시 웹뷰가 닫히지 않고 입력
          화면으로 돌아감. 연동 퍼널의 첫 단계까지만 되돌려 중간 방문 이력이 남아 있었음
        </li>
        <li>
          <strong>수정:</strong> 정보 연동에 들어가기 전까지 방문 이력을 되돌린 뒤, 현재 페이지를
          결과 화면으로 교체(<code>replace</code>). 전환 중에는 로더를 표시해 입력 화면의 재노출과
          노출 이벤트 중복을 방지
        </li>
      </ul>
      <figure className={diagram.figure} aria-labelledby="funnel-history-title">
        <figcaption id="funnel-history-title">
          <strong>같은 결과 화면, 달랐던 방문 이력</strong>
          <span>정보 연동 완료 후의 웹뷰 내부 이력 · 개념도</span>
        </figcaption>
        <div className={diagram.row}>
          <span className={diagram.label}>수정 전</span>
          <div className={diagram.stack}>
            <span className={diagram.remaining}>입력 이력 잔존</span>
            <span aria-hidden="true">→</span>
            <strong>결과</strong>
          </div>
          <p>뒤로가기 → 입력 화면으로 복귀</p>
        </div>
        <div className={`${diagram.row} ${diagram.fixed}`}>
          <span className={diagram.label}>수정 후</span>
          <div className={diagram.stack}>
            <strong>결과</strong>
          </div>
          <p>뒤로가기 → 웹뷰 닫힘</p>
        </div>
        <p className={diagram.note}>
          연동 단계를 건너뛴 경로와 같은 이력으로 정리. 결과로 가는 중간 화면뿐 아니라, 도착한 뒤의
          뒤로가기 동작까지 맞췄습니다.
        </p>
      </figure>
      <p>
        <strong>레슨런:</strong> useFunnel의 단계 상태와 브라우저 방문 이력은 함께 확인해야 함.
        중첩된 흐름을 빠져나올 때는 되감는 범위와 <code>push / replace</code> 선택까지 고려
      </p>
    </div>
  );
}
