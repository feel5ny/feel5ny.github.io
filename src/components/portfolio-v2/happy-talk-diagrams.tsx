import styles from './detail-diagrams.module.css';

export function HappyTalkConstraintDiagram() {
  return (
    <figure
      className={styles.figure}
      aria-label="카카오톡 오픈빌더 자동발화 설정에 따른 파라미터 전달 분기"
    >
      <figcaption>
        <strong>같은 API 호출, 설정에 따라 다른 전달 방식</strong>
        <span>카카오톡 오픈빌더 · 2024년 기록</span>
      </figcaption>
      <div className={styles.decisionLayout}>
        <div className={`${styles.node} ${styles.shared}`}>
          <span>확인한 지점</span>
          <strong>API 응답 HTML</strong>
          <small>
            내부 JavaScript의
            <br />
            자동발화 이벤트 조건 확인
          </small>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <div className={styles.branches}>
          <div className={styles.branch}>
            <span>자동발화 이벤트 설정</span>
            <strong>챗봇 실행용 URL로 이동</strong>
            <small>bot·event만 사용 → 전달한 상담 파라미터 무시</small>
          </div>
          <div className={styles.branch}>
            <span>자동발화 이벤트 미설정</span>
            <strong>폼을 POST로 전송</strong>
            <small>전달한 파라미터를 포함해 채팅 연결</small>
          </div>
        </div>
      </div>
      <div className={styles.rules}>
        <span>커스텀 파라미터 20자 제한</span>
        <span>구분 문자 | 또는 %7C 포함 시 유실</span>
      </div>
      <p className={styles.note}>
        레슨런: 요청값뿐 아니라 외부 응답 HTML과 계정 설정도 확인해야 했습니다. 이 확인 방법과
        파라미터 제약을 기록했습니다.
      </p>
    </figure>
  );
}

export function ConsultationIncidentMap() {
  return (
    <figure className={styles.figure} aria-label="상담 장애의 원인 분류와 대응·사후처리 기준">
      <figcaption>
        <strong>문제 유형에 따라 대응 경로를 분리</strong>
        <span>장애 가이드 · 2024.01</span>
      </figcaption>
      <div className={styles.rules}>
        <span>감지: 제휴사 제보 · Sentry</span>
        <span>진단: 전환 지점 · 응답 · 서비스 제약 확인</span>
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
