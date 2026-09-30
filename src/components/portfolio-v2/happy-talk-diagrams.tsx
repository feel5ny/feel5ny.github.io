import styles from './detail-diagrams.module.css';

export function ConsultationIncidentMap() {
  return (
    <figure
      className={`${styles.figure} ${styles.compactIncident}`}
      aria-label="상담 장애의 원인 분류와 대응·사후처리 기준"
    >
      <figcaption>
        <strong>문제 유형에 따라 대응 경로를 분리</strong>
        <span>장애 가이드 · 2024.01</span>
      </figcaption>
      <div className={styles.rules}>
        <span>
          <strong>감지:</strong> 제휴사 제보 · Sentry
        </span>
        <span>
          <strong>진단:</strong> 전환 지점 · 응답 · 서비스 제약 확인
        </span>
      </div>
      <dl className={`${styles.lanes} ${styles.policyLanes}`}>
        <div>
          <dt>
            <span>자사 웹 문제</span>
            <strong>직접 수정·배포</strong>
          </dt>
          <dd>
            <strong>보험팀에 상황 공유</strong>
            <span>수정 배포 후 공지 · 사후처리</span>
          </dd>
        </div>
        <div>
          <dt>
            <span>외부 서비스 문제</span>
            <strong>제휴사를 통한 연락</strong>
          </dt>
          <dd>
            <strong>계약 당사자를 통해 공급사에 전달</strong>
            <span>보험팀·제휴사에 상황 공유 · 기술 지원 준비</span>
          </dd>
        </div>
      </dl>
      <div className={styles.recovery}>
        <span>공통 사후처리</span>
        <strong>신청 기록과 채팅 기록을 대조해 상담 지원</strong>
        <p>
          상담 신청 수와 채팅 전환 수가 다를 수 있어, 공통 식별자를 기준으로 상담사가 수동 매핑하는
          절차를 정리했습니다.
        </p>
      </div>
    </figure>
  );
}
