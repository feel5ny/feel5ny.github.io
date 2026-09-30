import styles from './gene-project-map.module.css';

export function GeneProjectMap() {
  return (
    <figure className={styles.figure} aria-labelledby="gene-project-map-title">
      <figcaption id="gene-project-map-title">
        <strong>제품의 전체 흐름 안에서 맡은 개발</strong>
        <span>경험 단계와 개발 범위를 묶은 개념도</span>
      </figcaption>
      <ol className={styles.stages}>
        <li>
          <span className={styles.stage}>01 · 진입과 분기</span>
          <h3>검사 상태에 맞는 시작점</h3>
          <p>브릿지·다이나믹 랜딩 신규 개발</p>
          <small>여러 진입점에서 들어온 사용자를 상태에 맞는 화면으로 연결</small>
        </li>
        <li>
          <span className={styles.stage}>02 · 신청과 검사 진행</span>
          <h3>기존 기능을 새 흐름에 연결</h3>
          <p>신청·진행·반송·구매 화면 재사용</p>
          <small>선착순 시도 화면은 변경하고, 유지할 동작은 회귀 검증</small>
        </li>
        <li>
          <span className={styles.stage}>03 · 결과 확인</span>
          <h3>결과 화면과 리포트 연결</h3>
          <p>전체 결과 화면 변경 · 리포트 개발 위임</p>
          <small>기존 화면의 변경과 신규 화면의 구현 범위를 구분</small>
        </li>
      </ol>
      <p className={styles.foundation}>
        <strong>흐름 전반의 기반 작업</strong>
        전체 flow·테크스펙·스캐폴딩 · 이미지 리소스 POC
      </p>
    </figure>
  );
}
