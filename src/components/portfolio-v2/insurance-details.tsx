import styles from './portfolio.module.css';
import { HappyTalkConstraintDiagram, ConsultationIncidentMap } from './happy-talk-diagrams';
import { CodeEvidence } from './code-evidence';

export function InsuranceDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <h3>과제. 상담 연결을 구현하고 운영 상태까지 확인</h3>
        <ul className={styles.bullets}>
          <li>
            보장분석·보험료 줄이기·가족력 완벽대비라는 서로 다른 맥락에서 사용자가 보험의 가치를
            확인하고 상담으로 이어지는 기능 개발
          </li>
          <li>상담 신청 이후 외부 채팅까지 연결하고, 출시 후에는 전환 지표와 오류를 함께 관찰</li>
        </ul>
      </div>
      <HappyTalkConstraintDiagram />
      <CodeEvidence
        title="외부 응답에서 확인한 두 가지 실행 경로"
        source="2024년 레슨런의 응답 HTML · 식별정보 제거·동작 요약"
        code={`if (automaticUtteranceEvent !== '') {
  navigateToChatbot({ bot: true, event });
} else {
  submitChatFormWithParameters();
}`}
      >
        외부 서비스의 동작을 설명한 <strong>의사코드</strong>입니다. 계정의 자동발화 설정이 있으면
        폼 전송 대신 URL 이동이 일어나므로, 요청한 커스텀 파라미터만 확인해서는 원인을 찾기
        어려웠습니다.
      </CodeEvidence>
      <div className={styles.bodySection}>
        <h3>진단. 요청값에서 응답의 실행 분기까지 추적</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>확인 방법:</strong> Postman으로 연동 API 응답 HTML을 받고, 자동발화 이벤트 값이
            비어 있는지와 실행되는 JavaScript 분기를 확인하는 방법 기록
          </li>
          <li>
            <strong>입력 제약:</strong> 커스텀 필드의 길이 제한뿐 아니라 구분 문자와 인코딩된 구분
            문자에 의한 유실도 구분해 기록
          </li>
          <li>
            <strong>적용 범위:</strong> 카카오톡 오픈빌더 설정에 따른 동작을 해피톡 자체 봇의 설정과
            구분
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>판단. 장애 원인과 커뮤니케이션 경로를 함께 구분</h3>
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
        </ul>
      </div>
      <ConsultationIncidentMap />
      <div className={styles.bodySection}>
        <h3>구현과 운영에서 챙긴 것</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>보험 중개 MVP:</strong> 상담 신청, 외부 채팅 연동, 상담사용 웹뷰 개발
          </li>
          <li>
            <strong>해피톡 연동:</strong> 2023년 프론트엔드 연동 최초 구성
          </li>
          <li>
            <strong>가족력 완벽대비:</strong> 신규 웹뷰의 입력·동의·결과 화면과 보험 상담 연결 개발
          </li>
          <li>
            <strong>진입 맥락:</strong> 앱 푸시·알림톡으로 들어온 사용자가 관련 내용을 확인할 수
            있도록 보험 제품의 진입 페이지 개발
          </li>
          <li>
            <strong>운영 관측:</strong> Amplitude 퍼널·이상 지표 알림과 Sentry 오류 알림·실험 태그로
            전환 흐름과 오류를 확인하고, 각 레이어에 모니터링 추가
          </li>
          <li>
            <strong>인수인계:</strong> 연동 제약과 장애 대응 절차를 문서화하고 이후 팀원에게 이관
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>함께 한 판단. 정책 확인과 개발 범위 조정</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>코드에만 남은 정책:</strong> 내보험탭 보험료 줄이기 모듈 개발 시 기획서와 기존
            코드의 차이를 확인하고, PM과 정책을 확정해 개발에 반영
          </li>
          <li>
            <strong>범위 조정:</strong> 보험 MVP의 사용자 선택에 따른 보험 결과 재조회 기능은 개발
            복잡도 대비 효용을 고려해 범위에서 제외
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
