import styles from './insurance-conversion-map.module.css';

const products = [
  { title: '보험 중개 MVP', year: '2023', work: '상담 신청·상담사용 웹뷰 · 해피톡 최초 연동' },
  { title: '보험료 줄이기', year: '2026', work: '내보험탭 모듈 · PM과 적용 스펙 확정' },
  { title: '가족력 완벽대비', year: '2026', work: '입력·동의·결과 · 단계·캐시 정합성 관리' },
];

export function InsuranceConversionMap() {
  return (
    <figure className={styles.figure} aria-labelledby="insurance-conversion-title">
      <figcaption id="insurance-conversion-title">
        <strong>서로 다른 제품 경험을 상담 전환으로 연결</strong>
        <span>여러 프로젝트의 개발·운영 경험 요약</span>
      </figcaption>
      <div className={styles.flow}>
        <ul className={styles.products} aria-label="제품별 담당 개발">
          {products.map(product => (
            <li key={product.title}>
              <div className={styles.productTitle}>
                <strong>{product.title}</strong>
                <span>{product.year}</span>
              </div>
              <span>{product.work}</span>
            </li>
          ))}
        </ul>
        <div className={styles.merge} aria-hidden="true">
          <svg viewBox="0 0 48 240" preserveAspectRatio="none">
            <path d="M0 38H20V202H0 M0 120H46 M40 114L46 120L40 126" />
          </svg>
          <span>↓</span>
        </div>
        <div className={styles.conversion}>
          <span className={styles.label}>상담으로 이어지는 경로</span>
          <ol className={styles.steps}>
            <li>
              <strong>상담 신청</strong>
              <span>신청 정보 전달</span>
            </li>
            <li>
              <strong>외부 채팅 연결</strong>
              <span>상담 채널로 이동</span>
            </li>
          </ol>
        </div>
      </div>
      <div className={styles.monitoring}>
        <div className={styles.monitoringTitle}>
          <strong>전환 구간 관측</strong>
          <span>사용자 단계와 별도로, 출시 이후의 흐름을 점검</span>
        </div>
        <dl className={styles.signals}>
          <div>
            <dt>Sentry · 중요 오류 알림</dt>
            <dd>CriticalError로 분류해 오류 발생 시 우선 대응</dd>
          </div>
          <div>
            <dt>Amplitude · 퍼널 점검</dt>
            <dd>대시보드·Agent로 전환 급락과 경로 단절을 매일 확인</dd>
          </div>
        </dl>
      </div>
    </figure>
  );
}
