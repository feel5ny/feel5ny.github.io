import styles from './operations-domains.module.css';

const groups = [
  {
    title: '개발 환경',
    question: '함께 개발하는 기반',
    domains: [
      ['레포 관리', '저장소 구조·빌드·의존성 배치'],
      ['DX·하네스', '개발 도구·자동화·AI 작업 환경'],
      ['웹 인프라·네트워크', 'HTTP 통신·데이터 요청·API 계약'],
    ],
  },
  {
    title: '운영 안정성',
    question: '사용자 흐름을 지키는 기준',
    domains: [
      ['E2E 테스트', '주요 사용자 흐름의 통합 검증 체계'],
      ['라우팅', '앱 안팎 진입·이동·유입 맥락 전달'],
      ['관측·모니터링', '오류·이벤트 관측과 대응 기준'],
    ],
  },
  {
    title: '공통 기술 품질',
    question: '오래 유지할 공통 코드',
    domains: [
      ['외부 라이브러리', '도입·버전·취약점·대체 판단'],
      ['디자인 시스템 · BDS', '디자인 토큰·공통 컴포넌트 규약'],
      ['내부 라이브러리 거버넌스', '공통 패키지 경계·의존 관계'],
      ['비주얼 자산', '아이콘·이미지·애니메이션 사용 규약'],
    ],
  },
];

export function OperationsDomains() {
  return (
    <figure className={styles.figure} aria-labelledby="operations-domains-title">
      <figcaption id="operations-domains-title">
        <strong>공통 웹 업무를 나눈 10개 담당 영역</strong>
        <span>영역별 맥락을 유지하고, 그 맥락으로 판단</span>
      </figcaption>
      <div className={styles.groups}>
        {groups.map(group => (
          <section key={group.title} className={styles.group}>
            <h4>{group.title}</h4>
            <p>{group.question}</p>
            <dl>
              {group.domains.map(([name, scope]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{scope}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className={styles.note}>
        정·부 담당자를 두는 구조로 설계. 경계가 겹치면 관련 영역과 협의하고, 담당이 모호한 이슈는 웹
        온콜과 Tech Lead 협의체로 연결합니다.
      </p>
    </figure>
  );
}
