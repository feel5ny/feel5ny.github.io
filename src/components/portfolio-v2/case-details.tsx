import styles from './portfolio.module.css';
import { ReviewFlow } from './review-flow';
import { CodeEvidence } from './code-evidence';
import { GeneRoutingDiagram, GeneVerificationMap, WrapUpDocumentMap } from './detail-diagrams';

export function GeneDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <h3>새 화면보다 먼저 풀어야 했던 연결 조건</h3>
        <ul className={styles.bullets}>
          <li>
            신청·검사·결과 화면을 바꾸면서도 이미 검사를 진행 중인 사용자는 이어서 이용해야 했음
          </li>
          <li>
            검사 상태·보유 검사권·외부 URL에 따라 도착할 화면이 달라, 개별 화면만으로는 전체 흐름을
            확인하기 어려웠음
          </li>
        </ul>
      </div>

      <GeneRoutingDiagram />

      <div className={styles.bodySection}>
        <h3>구현. 서버와 클라이언트가 같은 규칙으로 목적지 결정</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>기본 경로:</strong> 서버에서 검사 상태를 조회하고 공통 함수로 목적지를 결정해
            리다이렉트
          </li>
          <li>
            <strong>실패 경로:</strong> 서버 처리 중 예외가 나면 Sentry에 기록하고 클라이언트
            fallback으로 전환. 클라이언트도 같은 함수를 사용
          </li>
          <li>
            <strong>예외 구분:</strong> 검사 진행·동의 처리에 필수인 토큰 누락은 오류로 드러내고,
            정의되지 않은 상태는 소개 화면으로 연결
          </li>
        </ul>
        <CodeEvidence
          title="진입 쿼리보다 목적지의 필수 값을 우선"
          source="get-server-side-props.webview.ts · 코드 발췌"
          code={`const query = { ...ctx.query, ...targetUrl.query };
delete query['slug'];`}
        >
          진입 맥락은 유지하되 <strong>이동할 화면에 필요한 값이 우선하도록</strong> 목적지 쿼리를
          나중에 병합합니다. 경로용 slug는 다음 화면에 전달하지 않습니다.
        </CodeEvidence>
      </div>

      <div className={styles.bodySection}>
        <h3>선택. 화면 구현에 앞서 흐름과 개발 범위부터 합의</h3>
        <ul className={styles.bullets}>
          <li>
            검사 상태·보유 검사권·진입 조건에 따른{' '}
            <strong data-reveal="underline">전체 flow를 개발 전에 정리</strong>
          </li>
          <li>
            기존 화면을 재사용할 구간과 새로 만들 구간을 구분하고, 연결 조건이 미확정인 지점을 먼저
            협의
          </li>
          <li>
            <strong>범위 조정:</strong> 신청 내용을 임시저장해 재진입 시 복원하는 기능은 구현 부담을
            고려해 이번 리뉴얼 범위에서 제외
          </li>
          <li>
            합의한 흐름을 테크스펙·스캐폴딩으로 옮기고, 브릿지·다이나믹 랜딩 개발과 이미지 POC 진행
          </li>
        </ul>
      </div>

      <div className={styles.bodySection}>
        <h3>검증. 유지할 동작을 테스트로 먼저 고정</h3>
        <p>
          기존 신청·반송 흐름을 재사용하면서, 유지할 기능은{' '}
          <strong data-reveal="underline">테스트 코드부터 작성</strong>한 뒤 리팩토링했습니다.
        </p>
        <GeneVerificationMap />
        <p className={styles.caption}>
          테스트에는 신청 기회 유무, 검사 중 토큰 누락, 완료 상태별 동의 여부, 미정의 상태의 목적지
          확인이 포함됩니다. MSW 화면 확인과는 별도로 이동 판단을 검증합니다.
        </p>
      </div>

      <div className={styles.bodySection}>
        <h3>출시 후. 외부 진입 경로와 다음 작업의 맥락까지 정리</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>기존 링크 유지:</strong> 외부에 배포된 실험 진입 URL은 새 랜딩으로 연결하고,
            불필요한 실험 분기 파라미터만 제거
          </li>
          <li>
            <strong>Wrap-up:</strong> 다음 작업에 필요한 전제와 맥락을 정리하고, 의사결정
            기록·동료의 이해·AI 작업 규칙을 구분하는 문서 기준 활용
          </li>
          <li>
            <strong>실험 배포:</strong> Sentry 실험 태그를 기준으로 관련 오류 모니터링
          </li>
        </ul>
        <WrapUpDocumentMap />
      </div>
    </>
  );
}

export function ReviewDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <h3>시작점 — 신·구 컨벤션의 혼란</h3>
        <ul className={styles.bullets}>
          <li>복직 후 현재 적용할 규칙과 기존 코드를 구분하기 어려웠음</li>
          <li>
            코드만으로 현재의 기준을 판단하기 어려워, 리뷰 시 조직의 규칙과 결정 맥락을 함께
            확인하는 방식 선택
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>구축. 맥락과 반복 점검 절차를 분리</h3>
        <ul className={styles.bullets}>
          <li>
            사내 AI 리뷰 수요가 구체화되기 전, 맥락·규칙을 AI 리뷰에 연결하는{' '}
            <strong data-reveal="underline">개인 POC 진행</strong>
          </li>
          <li>
            <strong>AGENTS.md:</strong> 프로젝트의 맥락과 컨벤션을 정리하고, 테크스펙을 코드 옆에
            배치
          </li>
          <li>
            <strong>셀프 리뷰 스킬:</strong> 규칙 확인과 PR 점검 절차를 반복해서 호출할 수 있는
            형태로 구성
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>선택 1. 변경 파일과 위험도에 따라 검토 범위 결정</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>달라진 요구:</strong> 1인 팀·휴가 중 리뷰어 부재·비개발자 기여로 조직 차원의
            검토 수요 발생
          </li>
          <li>
            <strong>라우터:</strong> 변경 파일의 경로·확장자와 상위 AGENTS.md를 기준으로 필요한 리뷰
            레이어 선택. 규칙과 발동 조건은 레이어별 파일에 함께 정의
          </li>
          <li>
            <strong>위험도별 분기:</strong> 보안 민감 경로는 보안 검토, 공통 라이브러리는 사용처
            영향 검토를 연결. 사람 리뷰가 없는 면제 경로는 검토 범위와 모델 티어 상향
          </li>
        </ul>
      </div>
      <ReviewFlow />
      <CodeEvidence
        title="리뷰할 문맥이 없으면 강제 실행에서도 제외"
        source="pre-review-route.sh · 강제 실행 분기 발췌"
        code={`if [[ "$trigger" == "agents-md" && -z "$matched" ]]; then
  reason="전 레이어 강제이지만 상위 경로에 AGENTS.md 없음 — 제외"
else
  fire=1; reason="프로필 전 레이어 강제 (--all 또는 프로필 force_all)"
fi`}
      >
        도메인 리뷰는 <strong>가장 가까운 AGENTS.md 경로를 먼저 수집</strong>합니다. 강제 실행도
        읽을 규칙이 없으면 해당 레이어를 제외하고, 실행·제외 이유를 출력합니다.
      </CodeEvidence>
      <div className={styles.bodySection}>
        <h3>검증. 실행 대상과 실패 조건을 스크립트 테스트로 고정</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>입력 오류:</strong> 존재하지 않는 레이어 이름은 exit 2, 명시적으로 넘긴 빈 파일
            목록이나 실행 대상 0개는 exit 3으로 종료
          </li>
          <li>
            <strong>조건별 실행:</strong> 파일 유형별 레이어 선택, AGENTS.md 유무에 따른 도메인 리뷰
            제외, 사람 리뷰 면제 경로의 프로필·최소 티어 상향 확인
          </li>
          <li>
            <strong>출력 계약:</strong> 호출자가 읽는 LAYERS·TIERS와 변경 규모 신호의 출력 확인
          </li>
        </ul>
        <p className={styles.caption}>
          검증 대상은 라우터의 실행 계약입니다. AI 지적의 정확도는 별도 검증 대상으로 두고 있습니다.
        </p>
      </div>
      <div className={styles.bodySection}>
        <h3>선택 2. 검토 강도와 개발 흐름의 비용을 함께 고려</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>실행 시점:</strong> 일반 PR 생성에는 빠른 정적 점검만 두고, 전체 AI 리뷰는 명시
            실행과 사람 리뷰 면제 경로에 연결하도록 구성
          </li>
          <li>
            <strong>실행 비용:</strong> 패턴·일반 검토는 묶고, 정합성·보안·공유 코드 영향 검토는
            별도로 실행하도록 모델 티어와 실행 단위 구분
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>실사용에서 보완. AI의 지적도 근거부터 검증</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>근거 검증:</strong> 실제 리뷰에서 존재하지 않는 파일·라인을 인용한 사례를
            반영해, 근거의 실재와 레이어 간 모순을 확인하는 검증 절차 추가
          </li>
          <li>
            <strong>읽는 사람의 부담:</strong> 지적은 관련 코드 줄에 배치하고, 낮은 우선순위와 실행
            상세는 접도록 리포트 형식 개선
          </li>
          <li>
            <strong>검증·측정 장치:</strong> 라우터의 발동 조건·프로필·오류 처리를 테스트로
            확인하고, 규칙별 피드백과 검증에서 폐기한 지적을 기록·집계하는 형식 마련
          </li>
        </ul>
      </div>
    </>
  );
}

export function TeamDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <ul className={styles.bullets}>
          <li>
            <strong>목적:</strong> 사람이 바뀌어도 같은 기준과 절차로 업무가 이어지는 운영
            프레임워크
          </li>
          <li>
            <strong>출발점:</strong> 공통 업무가 리드에게 집중되고, 배경 공유 없이 회의에서 판단을
            요청하거나 결정 이유를 다시 찾는 일이 반복
          </li>
          <li>
            <strong>접근:</strong> 제보·판단·실행의 책임을 나누고, 접수부터 의사결정과 인수인계까지
            이어지는 절차 설계
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>다음 사람이 판단하고 작업을 이어갈 수 있도록</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>서면 의사결정:</strong> 다른 영역에 미치는 영향·되돌리기 어려움·선례를 기준으로
            ADR 작성 여부를 판단. 대안을 서면으로 검토하고, 합의되지 않은 쟁점만 Tech Lead 회의로
            연결
          </li>
          <li>
            <strong>실행 단위:</strong> 큰 작업은 테크스펙에서 개별 머지가 가능한 작은 작업으로
            분할. 실행자가 일부 작업을 맡아도 전체 과제의 책임은 담당 DRI가 유지
          </li>
          <li>
            <strong>인수인계:</strong> 중단 시 진행 상황·막힌 지점·다음 할 일을 남기고 착수 가능
            목록으로 복귀하는 기준 마련
          </li>
          <li>
            <strong>보류한 문제:</strong> GitHub Issues에 증상·조사 결과·우회책을 남겨 다음 제보나
            의사결정에서 기존 조사 맥락을 활용하도록 구성
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>절차를 Jira·GitHub·AI 스킬로 연결</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>DRI 보드·Jira 자동화:</strong> 착수 가능한 작업과 대기·진행 상태를 구분하고,
            개별 티켓을 상위 에픽에 연결. 기술부채의 반복 비용·매출 연관·시한을 작업 크기와 비교하는
            우선순위 기준 마련
          </li>
          <li>
            <strong>ADR·CODEOWNERS:</strong> 결정 근거는 문서 PR에, 코드 경로별 리뷰 담당은 저장소
            설정에 남겨 협의·리뷰 대상을 찾을 수 있도록 구성
          </li>
          <li>
            <strong>AI 스킬:</strong> 역할에 맞는 절차 안내부터 담당 그룹 확인, 티켓 초안, 작업 규모
            산정과 ADR 작성까지 연결. AI가 근거와 초안을 준비하고, 처리 여부와 선택할 대안은 사람이
            판단
          </li>
        </ul>
      </div>
      <dl className={styles.operatingNotes}>
        <div>
          <dt>내가 주도한 범위</dt>
          <dd>
            운영 구조와 절차 설계, Tech Lead들과의 책임 범위 협의, 도구·기록 연결. 각 영역의 세부
            기술 판단은 담당자에게 위임
          </dd>
        </div>
        <div>
          <dt>운영 중 조정한 기준</dt>
          <dd>
            팀별 투입시간 비교가 어려워, 서비스 개수와 기존 접점을 기준으로 배분하기로 합의하고
            ADR로 기록. 개수와 실제 업무량은 달라 후속 조정이 필요하다는 제약도 명시
          </dd>
        </div>
      </dl>
    </>
  );
}
