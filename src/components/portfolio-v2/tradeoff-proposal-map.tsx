import styles from './tradeoff-proposal-map.module.css';

const criteria = [
  '분기·조합 증가',
  '변경 영향 범위',
  '테스트 보호',
  '디버깅 난이도',
  '재변경 빈도',
  '향후 기획 제약',
];

const steps = [
  ['제안 초안', '우려 → 옵션 → 추천', '원안·축소안·대안의 공수와 예상 부채 상환 비용 비교'],
  ['팀 검토', '근거와 추천안 확인', '개인별 답변 대신, 검토를 거친 하나의 제안으로 전달'],
  ['PM 판단', '가치와 비용을 함께 비교', '스펙은 PM이 결정 · 실험 방법론 변경은 PM·Tech Lead 검토'],
  [
    '결정 기록',
    '감수한 비용과 이유 보존',
    '부채 장부에 기록 · 영향이 크거나 되돌리기 어려우면 ADR 검토',
  ],
];

export function TradeoffProposalMap() {
  return (
    <figure className={styles.figure} aria-label="공통 문서 기준을 바탕으로 제안하고 결정하는 절차">
      <figcaption className={styles.heading}>
        <strong>같은 기준으로 검토하고, 비교 가능한 제안으로</strong>
        <span>건강 웹팀의 협의 절차 요약</span>
      </figcaption>

      <dl className={styles.documents}>
        <div>
          <dt>개발부채 평가 기준</dt>
          <dd>지금 구현할 비용뿐 아니라, 이후 변경·검증·운영의 부담까지 검토</dd>
        </div>
        <div>
          <dt>실험·스펙 조정 표준안</dt>
          <dd>개발팀의 제안과 PM의 결정을 구분하고, 실험 변경의 리뷰 경로 정의</dd>
        </div>
        <div>
          <dt>팀 컨벤션</dt>
          <dd>기존 패턴에서 구현 대안을 도출하고, 기준 밖의 방식은 팀 검토</dd>
        </div>
      </dl>

      <div className={styles.assessment}>
        <strong>부채를 살피는 6가지 질문</strong>
        <ul className={styles.criteria} aria-label="개발부채 평가 항목">
          {criteria.map(criterion => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ul>
        <p>산정 원칙: 15분 내 등급·근사 비용으로 비교. 정밀 견적보다 판단에 필요한 근거 확보</p>
      </div>
      <div className={styles.bridge}>
        <span aria-hidden="true">↓</span>
        <div>
          <code>make-tradeoff-proposal</code>
          <span>기준을 제안 형식에 연결 · 부족한 정보는 확인 후 작성</span>
        </div>
      </div>

      <ol className={styles.flow}>
        {steps.map(([title, summary, description], index) => (
          <li key={title}>
            <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <span className={styles.summary}>{summary}</span>
            <p>{description}</p>
            {index < steps.length - 1 && (
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
