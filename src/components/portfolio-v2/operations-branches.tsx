import styles from './operations-branches.module.css';

export function OperationsBranches() {
  return (
    <figure className={styles.figure} aria-labelledby="operations-branches-title">
      <figcaption id="operations-branches-title">
        <strong>논의는 나누고, 결정한 뒤 실행으로 합류</strong>
        <span>공통 업무의 접수부터 반영까지</span>
      </figcaption>
      <p className={styles.hint}>좁은 화면에서는 좌우로 움직여 전체 흐름을 볼 수 있습니다.</p>
      <div
        className={styles.scroll}
        tabIndex={0}
        role="region"
        aria-label="공통 업무 분기 흐름도, 좌우 스크롤 가능"
      >
        <svg
          viewBox="0 0 1200 460"
          role="img"
          aria-labelledby="operations-branch-svg-title operations-branch-svg-desc"
        >
          <title id="operations-branch-svg-title">
            공통 이슈를 판단하고 논의·보류·실행으로 나누는 운영
          </title>
          <desc id="operations-branch-svg-desc">
            문제를 접수하면 해당 영역의 담당자가 맥락을 확인합니다. 영향이 큰 결정은 ADR이라는
            의사결정 문서로 제안하고 관련 영역이 검토합니다. 서면으로 합의하지 못한 쟁점만 Tech Lead
            회의로 연결합니다. 단순한 결정은 티켓에 기록하고 실행으로 넘어갑니다. 보류한 문제는 조사
            기록을 보존합니다. 실행은 작업 크기에 따라 팀원이나 별도 작업팀에 나누고 구현·검증 후
            반영합니다. 선은 업무 흐름이며 실제 Git 브랜치는 아닙니다.
          </desc>
          <g fill="none" strokeWidth="3">
            <path className={styles.mainLine} d="M65 235 H1135" />
            <path
              className={styles.discussion}
              d="M245 235 C285 235 280 130 335 130 H640 C695 130 695 235 750 235"
            />
            <path
              className={styles.escalation}
              d="M475 130 C505 130 495 50 530 50 H575 C610 50 605 130 640 130"
            />
            <path className={styles.deferred} d="M245 235 C290 235 275 370 340 370 H505" />
            <path
              className={styles.execution}
              d="M865 235 C905 235 890 355 935 355 H1045 C1090 355 1085 235 1135 235"
            />
          </g>
          <g className={styles.mainNodes}>
            <circle cx="65" cy="235" r="8" />
            <circle cx="245" cy="235" r="8" />
            <circle cx="750" cy="235" r="8" />
            <circle cx="865" cy="235" r="8" />
            <circle cx="1135" cy="235" r="8" />
          </g>
          <g className={styles.discussionNodes}>
            <circle cx="345" cy="130" r="7" />
            <circle cx="475" cy="130" r="7" />
            <circle cx="640" cy="130" r="7" />
          </g>
          <circle className={styles.escalationNode} cx="555" cy="50" r="7" />
          <circle className={styles.deferredNode} cx="420" cy="370" r="7" />
          <g className={styles.executionNodes}>
            <circle cx="945" cy="355" r="7" />
            <circle cx="1045" cy="355" r="7" />
          </g>
          <g className={styles.label} textAnchor="middle">
            <text x="65" y="201">
              문제 접수
            </text>
            <text x="245" y="201">
              담당 영역 판단
            </text>
            <text x="750" y="201">
              결정 기록
            </text>
            <text x="865" y="201">
              실행 분담
            </text>
            <text x="1135" y="201">
              반영
            </text>
            <text x="345" y="99">
              문서로 제안
            </text>
            <text x="475" y="99">
              관련 영역 검토
            </text>
            <text x="640" y="99">
              보완·승인
            </text>
            <text x="555" y="22">
              Tech Lead 회의
            </text>
            <text x="420" y="342">
              보류 · 조사 기록 보존
            </text>
            <text x="945" y="326">
              작은 작업
            </text>
            <text x="1045" y="326">
              구현·검증
            </text>
          </g>
          <g className={styles.sub} textAnchor="middle">
            <text x="65" y="269">
              티켓 등록
            </text>
            <text x="245" y="269">
              맥락·영향 확인
            </text>
            <text x="345" y="164">
              ADR 작성
            </text>
            <text x="475" y="164">
              질문·대안 비교
            </text>
            <text x="640" y="164">
              담당자 판단
            </text>
            <text x="835" y="56">
              합의하지 못한 쟁점만
            </text>
            <text x="500" y="222">
              단순 결정은 티켓에 기록
            </text>
            <text x="420" y="403">
              다음 제보·재검토에 기존 맥락 활용
            </text>
            <text x="1000" y="391">
              팀원 실행 · PR 리뷰·QA·CI
            </text>
          </g>
        </svg>
      </div>
      <dl className={styles.executionPaths}>
        <div>
          <dt>작은 작업</dt>
          <dd>제품팀이 기술부채 개선 시간에 수행하고, 영역 담당자가 리뷰</dd>
        </div>
        <div>
          <dt>큰 작업</dt>
          <dd>영역 담당자가 전담 작업팀을 요청하고, Tech Lead 협의체가 편성 판단</dd>
        </div>
      </dl>
      <p className={styles.note}>
        선은 업무의 분기·합류를 표현합니다. 결정 근거는 ADR에, 진행 상황은 Jira에 남겨 담당자가
        바뀌어도 이어갈 수 있도록 합니다. 실제 Git 브랜치 구조를 뜻하지는 않습니다.
      </p>
    </figure>
  );
}
