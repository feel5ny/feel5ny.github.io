import styles from './portfolio.module.css';
import { ConsultationIncidentMap } from './happy-talk-diagrams';
import { CaseDetailLink } from './case-drawer';
import { FunnelHistoryDetails } from './funnel-history-details';

export function InsuranceDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <h3>과제. 새로운 보험 제품을 구현하고 상담 전환 구간을 운영</h3>
        <ul className={styles.bullets}>
          <li>
            보장분석·보험료 줄이기·가족력 완벽대비라는 서로 다른 맥락에서 사용자가 보험의 가치를
            확인하고 상담으로 이어지는 기능 개발
          </li>
          <li>
            매출로 이어지는 상담 신청·외부 채팅 연결이 중요해, 화면 구현뿐 아니라 출시 후 전환
            지표와 오류 관측까지 담당
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>1. 신규 구축 — MVP와 신규 제품의 웹·웹뷰 개발</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>보험 중개 MVP:</strong> 상담 신청, 외부 채팅 연동, 상담사용 웹뷰 개발
          </li>
          <li>
            <strong>가족력 완벽대비:</strong> 입력·동의·결과 화면과 보험 상담 연결 개발
          </li>
          <li>
            <strong>PM과 Spec-out 협의:</strong> 사용자의 추가 선택에 따른 결과 재조회 기능의 구현
            복잡도를 설명하고, 기대 효용과 비교해 MVP 범위에서 제외하기로 협의
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>2. 단계·상태 관리 — 첫 이용부터 결과 재진입까지 연결</h3>
        <p>
          정보를 추가로 연동해야 하는 사용자와 바로 결과를 볼 수 있는 사용자의 경로를 나누고, 흐름을
          마친 뒤의 뒤로가기와 입력 수정 후 재진입도 함께 확인했습니다.
        </p>
      </div>
      <FunnelHistoryDetails />
      <div className={styles.relatedCase}>
        <div>
          <span className={styles.relatedLabel}>별도 기술 사례 · TanStack Query</span>
          <h3>가족력 결과 화면의 재진입 오류 수정</h3>
          <p>방문 이력과는 별개로, 늦은 조회 응답이 최신 캐시를 덮어쓰던 문제</p>
        </div>
        <div className={styles.linkRow}>
          <CaseDetailLink id="family-history">해결 과정 보기</CaseDetailLink>
        </div>
      </div>
      <div className={styles.bodySection}>
        <h3>3. 외부 연동 — 진입 경로와 상담 연결의 제약 처리</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>진입 경로:</strong> 앱 푸시·알림톡으로 들어온 사용자를 관련 내용으로 연결하는
            보험 제품의 진입 페이지 개발
          </li>
          <li>
            <strong>상담 연동:</strong> 2023년 해피톡 프론트엔드 연동 최초 구성
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h4>해피톡 레슨런. 응답을 역분석해 연동 제약 확인</h4>
        <ul className={styles.bullets}>
          <li>
            <strong>응답 역분석:</strong> API 응답 HTML·JavaScript를 확인해, 카카오톡 오픈빌더의
            자동발화 설정에 따라 전달한 상담 파라미터가 무시되는 분기를 파악
          </li>
          <li>
            <strong>제약 기록:</strong> 당시 확인한 커스텀 파라미터 20자 제한과 구분 문자에 의한
            유실을 문서화
          </li>
          <li>
            <strong>레슨런:</strong> 요청값만이 아니라 응답의 실행 분기와 계정 설정까지 확인
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h4>장애 원인에 따라 대응 주체와 연락 경로 구분</h4>
        <ul className={styles.bullets}>
          <li>
            <strong>진단 기준:</strong> 상담 연결·상담사용 웹뷰 문제를 자사 웹 오류, 외부 서버 문제,
            외부 서비스의 스펙 제약으로 나누어 확인
          </li>
          <li>
            <strong>연락 경로:</strong> 직접 계약한 고객사가 아니면 공급사의 대응이 늦어질 수 있다는
            경험을 반영해, 계약 당사자인 제휴사가 공급사와 소통하고 웹 개발자가 기술적으로
            지원하도록 가이드 작성
          </li>
          <li>
            <strong>인수인계:</strong> 연동 제약과 장애 대응 절차를 문서화하고 이후 팀원에게 이관
          </li>
        </ul>
      </div>
      <ConsultationIncidentMap />
      <div className={styles.bodySection}>
        <h3>4. 안정성 — 배포 전 검증과 두 속도의 운영 관측</h3>
        <p>
          배포 전에는 테스트로 변경한 동작을 확인하고, 운영 중에는 중요 오류 알림으로 빠르게
          대응했습니다. 여기에 이벤트 기반 퍼널 점검을 더해, 오류 로그만으로 놓칠 수 있는 전환
          급락·단절도 주기적으로 살폈습니다.
        </p>
        <ul className={styles.bullets}>
          <li>
            <strong>배포 전 · 테스트 보강:</strong> 상담 신청 완료 이벤트에 보험 연동 여부를
            추가하면서, 해당 값이 이벤트에 올바르게 전달되는지 확인하는 기존 훅 테스트 보강
          </li>
          <li>
            <strong>오류 발생 시 · 빠른 대응:</strong> 보험 상담의 중요 오류를 CriticalError
            클래스와 공통 핸들러로 분류·수집. Sentry의 fatal 수준으로 기록하고 메시지별
            fingerprint로 묶어, 중요 오류 알림을 받아 우선 대응
          </li>
          <li>
            <strong>주기적 관측 · 전환 이상 감지:</strong> 매출 대시보드에서 사용하던 이벤트와
            지표용으로 추가한 이벤트를 활용해 Amplitude 퍼널 대시보드 구성. Agent를 연결해
            유입·클릭·완료 지표의 급락과 경로별 전환 단절을 매일 점검하고 알림 수신
          </li>
          <li>
            <strong>판정 기준:</strong> 전일 지표를 최근 추세와 비교. 집계 중인 당일 데이터와 소량
            경로, 종료된 캠페인 등 오탐 가능성이 있는 조건은 제외하도록 지침 설정
          </li>
          <li>
            <strong>역할 구분:</strong> Agent는 관측값·비교 기준·차트 링크를 보고하고, 온콜 담당자는
            원인과 대응 필요성을 판단
          </li>
          <li>
            <strong>실험 관측:</strong> Sentry 실험 태그로 배포한 실험과 관련된 오류 확인
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>별도 기여. 직접 사용해 발견한 보험청구 문제</h3>
        <p className={styles.caption}>2026.05 ~ 06 · 직접 사용·문제 발견·제보</p>
        <ul className={styles.bullets}>
          <li>
            <strong>발견:</strong> 새벽 알림톡 수신 문제와 결제완료 알림톡의 진입 오류를 직접
            경험하고 제보
          </li>
          <li>
            <strong>반영:</strong> PM의 발송 시간 제한 결정 후 배포. 진입 오류는 서버 담당자가 수정
          </li>
        </ul>
      </div>
    </>
  );
}
