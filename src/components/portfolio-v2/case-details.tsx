import styles from './portfolio.module.css';
import { ReviewFlow } from './review-flow';
import { CodeEvidence } from './code-evidence';
import { WrapUpDocumentMap } from './detail-diagrams';
import { OperationsBranches } from './operations-branches';
import { OperationsDomains } from './operations-domains';
import { GeneTransitionMap } from './gene-transition-map';

export function GeneDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <h3>과제. 운영 중인 제품의 기존 동작을 보호하며 리뉴얼</h3>
        <ul className={styles.bullets}>
          <li>
            신청·검사 진행·결과 확인이 이미 운영 중인 상태에서 2.0 경험으로 전환. 유지할 기능의
            회귀와 새 흐름의 동작을 함께 확인해야 하는 작업
          </li>
          <li>
            <strong>맡은 개발:</strong> 전체 flow·테크스펙·스캐폴딩, 브릿지·다이나믹 랜딩 신규
            개발과 이미지 리소스 POC
          </li>
          <li>
            <strong>화면 구성:</strong> 신청·진행 타임라인·반송 신청·구매는 재사용하고, 선착순
            시도·전체 결과 화면은 변경. 신규 리포트 화면 개발은 위임
          </li>
        </ul>
      </div>

      <div className={styles.bodySection}>
        <h3>1. 판단 — 구현 전에 연결 조건과 개발 범위를 합의</h3>
        <ul className={styles.bullets}>
          <li>
            여러 화면을 나누어 개발하므로, 검사 상태·보유 검사권·진입 조건에 따른{' '}
            <strong data-reveal="underline">전체 흐름을 먼저 정리</strong>
          </li>
          <li>
            재사용할 구간과 새로 만들 구간을 구분하고, 연결 조건이 미확정인 지점을 먼저 협의해 구현
            중 오갈 커뮤니케이션을 앞당김
          </li>
          <li>
            <strong>PM과 Spec-out 협의:</strong> 신청 내용의 임시저장·재진입 복원에 필요한 구현
            부담을 공유하고, 사용자 편의와 개발 비용을 함께 검토해 이번 개발 범위에서 제외
          </li>
          <li>합의한 흐름을 테크스펙과 스캐폴딩에 반영하고 개별 화면 구현으로 연결</li>
        </ul>
      </div>

      <div className={styles.bodySection}>
        <h3>2. 개발 — 기존 기능은 활용하고, 새 경험에 필요한 화면을 구현</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>재사용·변경:</strong> 신청·검사 진행·반송·구매 기능을 전부 다시 만들지 않고
            재사용. 선착순 시도·전체 결과 화면은 새 요구사항에 맞게 변경
          </li>
          <li>
            <strong>신규 구현:</strong> 전체 스캐폴딩과 브릿지·다이나믹 랜딩을 개발하고 이미지
            리소스 POC 진행. 리포트 화면 개발은 위임
          </li>
          <li>
            <strong>랜딩의 역할:</strong> 다른 도메인의 배너 등에서 들어온 사용자를 검사 상태에 맞는
            화면으로 연결. 서버 처리와 클라이언트 fallback에서 같은 이동 규칙 사용
          </li>
          <li>
            <strong>재사용에 따른 확인:</strong> 화면을 재사용해도 새 흐름과의 연결이 맞는지는 별도
            문제. 기존 동작의 회귀와 신규 화면 간 전환을 나누어 검증
          </li>
        </ul>
      </div>

      <div className={styles.bodySection}>
        <h3>3. 전환 — 기존 동작 보호부터 공개 제어까지</h3>
        <GeneTransitionMap />
        <ul className={styles.bullets}>
          <li>
            <strong>이동 규칙 검증:</strong> 랜딩의 목적지 판단과 필수 값 누락 등 예외 조건은 단위
            테스트로 확인
          </li>
          <li>
            <strong>분기 기준:</strong> Amplitude Feature Flag(FF) 값으로 기존·신규 화면을 선택. 2.0
            화면 안에서 검사 상태에 따라 목적지를 정하는 랜딩과는 별개의 분기
          </li>
        </ul>
      </div>

      <div className={styles.bodySection}>
        <h3>4. 마무리 — 코드 정리와 함께 다음 작업의 맥락 보존</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>Wrap-up:</strong> 다음 작업에 필요한 전제와 맥락을 정리하고, 의사결정
            기록·동료의 이해·AI 작업 규칙을 구분하는 문서 기준 활용
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
        <h3>설계 1. 변경 파일과 위험도에 따라 리뷰 범위 결정</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>달라진 요구:</strong> 1인 팀·휴가 중 리뷰어 부재·비개발자 기여로 조직 차원의
            검토 수요 발생
          </li>
          <li>
            <strong>라우터:</strong> 변경 파일의 경로·확장자와 상위 AGENTS.md를 기준으로 필요한 리뷰
            레이어 선택. 규칙과 발동 조건은 레이어별 파일에 함께 정의
          </li>
          <li>파일 조건에 맞는 리뷰 선택과 잘못된 입력 처리는 스크립트 테스트로 확인</li>
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
        <h3>설계 2. 검토 강도와 실행 비용 조정</h3>
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
        <h3>DRI: 공통 영역의 맥락을 유지하고 판단하는 담당자</h3>
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
            <strong>접근:</strong> DRI(Directly Responsible Individual)는 담당 영역의 맥락을
            이해하고 의사결정·리뷰를 맡음. 구현은 제품팀이나 별도 작업팀과 나누는 구조
          </li>
        </ul>
      </div>
      <OperationsDomains />
      <OperationsBranches />
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
            분할. 실행자가 바뀌어도 담당 DRI가 판단의 맥락과 과제의 연결을 유지하고, 구현·검증은
            실행 담당과 QA·PR·CI로 진행
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
