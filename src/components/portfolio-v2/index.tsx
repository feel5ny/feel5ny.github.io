import styles from './portfolio.module.css';
import { MobileBackToTop, MobileMenu, PortfolioNav, PrintButton } from './navigation';
import { EntryJourney } from './journey';
import { ScrollEffects } from './scroll-effects';
import { WorkAccordion } from './work-accordion';
import { PointerGlow } from './pointer-glow';
import { OperationsMap } from './operations-map';

const links = [
  { label: 'GitHub', href: 'https://github.com/feel5ny' },
  { label: '개발 기록', href: 'https://feel5ny.github.io' },
  { label: '발표 자료', href: 'https://speakerdeck.com/feel5ny' },
];

const otherWork = [
  ['2026', '가족력 완벽대비', '신규 웹뷰의 입력·동의·결과 화면과 보험 상담 연결을 개발했습니다.'],
  [
    '2026',
    '내보험탭 보험료 줄이기',
    '기존 코드에 남아 있는 정책을 확인하고, PM과 스펙을 확정해 웹 개발에 반영했습니다.',
  ],
  [
    '2025 ~ 2026',
    '건강 웹 검색 유입 정비',
    '검색 노출 대상과 sitemap을 정비하고, IndexNow 기반 색인 요청 자동화 작업에 참여했습니다.',
  ],
  [
    '2023 ~',
    '보험 상담 연동',
    '상담 신청부터 외부 채팅 연결까지 프론트엔드 연동을 구성하고 운영했습니다. 이후 팀원에게 업무를 이관했습니다.',
  ],
  [
    '2020',
    '굿닥 시술백과',
    '검색 키워드와 시술·상품 데이터를 바탕으로 콘텐츠를 기획하고, Gatsby 기반 검색 유입 페이지를 개발했습니다.',
  ],
  [
    '2018 ~ 2021',
    '굿닥 후기·굿닥톡',
    '후기 등록·조회와 질문 게시판형 커뮤니티의 글쓰기·댓글·좋아요 화면을 개발했습니다.',
  ],
];

export function PortfolioV2() {
  return (
    <div id="portfolio-v2" className={styles.portfolio} data-pagefind-ignore="all">
      <ScrollEffects />
      <PointerGlow />
      <MobileBackToTop />
      <a className={styles.skip} href="#main-content">
        본문으로 건너뛰기
      </a>
      <div className={styles.sheet}>
        <header className={styles.masthead}>
          <MobileMenu />
          <a className={styles.wordmark} href="#intro" aria-label="김나영 포트폴리오 처음으로">
            nayoung kim<span>.</span>
          </a>
          <span className={styles.edition}>PORTFOLIO / 2026</span>
          <PrintButton />
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.identity}>
              <span className={styles.monogram} aria-hidden="true">
                nk.
              </span>
              <p>김나영</p>
              <span>프론트엔드 개발자</span>
            </div>
            <PortfolioNav />
            <p className={styles.sideNote}>
              제품을 만들고,
              <br />
              함께 만드는 방식을
              <br />
              살피고 있습니다.
            </p>
          </aside>

          <main id="main-content" className={styles.main}>
            <section id="intro" className={styles.intro} aria-labelledby="intro-title">
              <p className={styles.eyebrow}>프론트엔드 · 제품 개발 · 팀 운영</p>
              <h1 id="intro-title" tabIndex={-1}>
                만드는 일,
                <br />
                <span>함께 일하는 방식.</span>
              </h1>
              <p className={styles.lead}>
                건강·보험 서비스의 신청부터 결과 조회, 상담 연결까지.
                <br className={styles.desktopBreak} /> 사용자가 거치는 웹·웹뷰를 개발해 온
                김나영입니다.
              </p>
              <div className={styles.introText}>
                <ul className={styles.bullets}>
                  <li>제품 개발과 건강 웹팀 Tech Lead · 웹 Chapter Lead 병행</li>
                  <li>컨벤션 혼란에서 시작한 AI 셀프 리뷰와 공통 업무 운영 프레임워크</li>
                  <li>필요한 것을 구상하고, 직접 만들고, 실제로 굴려보는 일에 관심</li>
                </ul>
              </div>
              <div className={styles.linkRow}>
                {links.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <div className={styles.contents}>
                <p className={styles.caption}>이번 포트폴리오에 담은 작업</p>
                <a href="#gene">
                  <span className={styles.number}>01</span>
                  <span>흐름을 먼저 맞추는 개발</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="#review">
                  <span className={styles.number}>02</span>
                  <span>AI 리뷰의 선제적 시도</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            <article
              id="gene"
              className={styles.case}
              aria-labelledby="gene-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>01 · 제품 리뉴얼</span>
                <span>2026.05 — 07</span>
              </div>
              <h2 id="gene-title">
                합의가 필요한 흐름을 먼저 정리하고,
                <br />
                기존 동작을 지키며 리뉴얼하기
              </h2>
              <p className={styles.subtitle}>뱅크샐러드 · 유전자검사 2.0 리뉴얼</p>
              <dl className={styles.facts}>
                <div>
                  <dt>역할</dt>
                  <dd>웹 테크스펙 리드 · 프론트엔드 개발</dd>
                </div>
                <div>
                  <dt>초점</dt>
                  <dd>흐름 사전 정리 · 기존 기능 회귀 검증 · 배포 후 마무리</dd>
                </div>
              </dl>

              <div className={styles.bodySection}>
                <h3>리뉴얼의 조건</h3>
                <ul className={styles.bullets}>
                  <li>신청·검사·결과 경험을 새롭게 구성하는 리뉴얼</li>
                  <li>진행 중인 검사·복수 검사권·기존 외부 URL을 함께 고려</li>
                  <li>기존 화면의 재사용·변경과 신규 화면의 연결 확인</li>
                </ul>
              </div>

              <div className={styles.bodySection}>
                <h3>커뮤니케이션이 필요한 흐름부터 정리</h3>
                <ul className={styles.bullets}>
                  <li>
                    검사 상태·보유 검사권·진입 조건에 따른{' '}
                    <strong data-reveal="underline">전체 flow를 개발 전에 정리</strong>
                  </li>
                  <li>화면 연결과 미확정 조건을 드러내, 협의가 필요한 지점 먼저 확인</li>
                  <li>테크스펙·스캐폴딩, 브릿지·다이나믹 랜딩 개발과 이미지 POC 진행</li>
                </ul>
              </div>

              <figure className={styles.flowFigure}>
                <figcaption>
                  <span>개발 전부터 배포 후까지의 작업 순서</span>
                  <span>작업 과정 요약</span>
                </figcaption>
                <div className={styles.flow} data-motion-sequence>
                  <div className={styles.flowEntry}>
                    <span className={styles.smallLabel}>개발 전</span>
                    <strong>
                      상태·진입 조건 확인
                      <br />
                      전체 흐름 정리
                    </strong>
                  </div>
                  <span className={styles.flowArrow} aria-hidden="true" />
                  <div className={styles.flowOwned}>
                    <span className={styles.smallLabel}>기존 기능 변경 전</span>
                    <strong>
                      유지할 동작을
                      <br />
                      테스트로 먼저 작성
                    </strong>
                    <small>리팩토링 시 회귀 확인 기준</small>
                  </div>
                  <span className={styles.flowArrow} aria-hidden="true" />
                  <div className={styles.flowDestination}>
                    <span className={styles.smallLabel}>배포 후</span>
                    <strong>
                      기존 코드 정리
                      <br />
                      프로젝트 wrap-up
                    </strong>
                  </div>
                </div>
              </figure>

              <div className={styles.bodySection}>
                <h3>상태별 이동 규칙을 화면에서 분리</h3>
                <ul className={styles.bullets}>
                  <li>
                    검사 상태별 목적지를 결정하는 함수를 분리하고,{' '}
                    <strong>서버 리다이렉트와 클라이언트 fallback에서 같은 규칙 사용</strong>
                  </li>
                  <li>진입 쿼리는 유지하되, 목적지에 필요한 필수 파라미터를 우선 적용</li>
                  <li>
                    기존 신청·반송 흐름을 재사용하고, 신규 다이나믹 랜딩에서 검사 상태에 맞게 연결
                  </li>
                </ul>
              </div>

              <div className={styles.bodySection}>
                <h3>판단 규칙과 화면 흐름을 나누어 검증</h3>
                <ul className={styles.bullets}>
                  <li>
                    유지할 기능은 <strong data-reveal="underline">테스트 코드부터 작성</strong>한 뒤
                    리팩토링
                  </li>
                  <li>
                    <strong>단위 테스트:</strong> 상태별 이동 목적지와 필수 토큰 누락 등 예외 조건
                    검증
                  </li>
                  <li>
                    <strong>MSW 시나리오:</strong> 검사권 보유 여부·검사 진행 상태·API 오류를 재현해
                    화면과 연결 흐름 확인
                  </li>
                  <li>
                    로컬·스테이징에서 MSW 시나리오 선택 시 서버 리다이렉트를 건너뛰고 클라이언트
                    경로로 검증
                  </li>
                </ul>
              </div>

              <div className={styles.bodySection}>
                <h3>배포 이후까지 마무리</h3>
                <ul className={styles.bullets}>
                  <li>
                    <strong>기존 링크 유지:</strong> 외부에 배포된 실험 진입 URL은 새 랜딩으로
                    연결하고, 불필요한 실험 분기 파라미터만 제거
                  </li>
                  <li>
                    <strong>Wrap-up:</strong> pre-condition·AGENTS.md에 프로젝트의 전제와 맥락 정리
                  </li>
                  <li>
                    <strong>실험 배포:</strong> Sentry 실험 태그를 기준으로 관련 오류 모니터링
                  </li>
                </ul>
              </div>
            </article>

            <article
              id="review"
              className={styles.case}
              aria-labelledby="review-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>02 · AI 셀프 리뷰</span>
                <span>2026 — 진행 중</span>
              </div>
              <h2 id="review-title">
                어떤 컨벤션을 따라야 할까?
                <br />그 질문에서 시작한 AI 셀프 리뷰
              </h2>
              <p className={styles.subtitle}>
                개인 셀프 리뷰로 선제적 POC → 사내 리뷰 수요에 맞춘 확장 설계
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt>담당</dt>
                  <dd>문제 인식 · 셀프 리뷰 POC · 리뷰 확장 방향 구상</dd>
                </div>
                <div>
                  <dt>현재</dt>
                  <dd>개인 스킬 구축 / 라우팅 기반 리뷰 구조는 설계 중</dd>
                </div>
              </dl>
              <div className={styles.bodySection}>
                <h3>시작점 — 신·구 컨벤션의 혼란</h3>
                <ul className={styles.bullets}>
                  <li>복직 후 현재 적용할 규칙과 기존 코드를 구분하기 어려웠음</li>
                  <li>규칙 확인과 PR 점검을 위한 개인 AI 셀프 리뷰 스킬 구축</li>
                  <li>AGENTS.md에 맥락, 스킬에 반복 작업 정리 · 테크스펙을 코드 옆으로 이동</li>
                </ul>
              </div>
              <div className={styles.bodySection}>
                <h3>사내 AI 리뷰 방향을 앞서 시도한 POC</h3>
                <ul className={styles.bullets}>
                  <li>
                    조직 수요가 구체화되기 전, 맥락·규칙을 AI 리뷰에 연결하는{' '}
                    <strong data-reveal="underline">개인 POC 진행</strong>
                  </li>
                  <li>이후 1인 팀·휴가 중 리뷰어 부재·비개발자 기여 등 사내 검토 수요 발생</li>
                  <li>필요한 관점만 선택하는 라우팅 구조로 확장 설계 중</li>
                </ul>
              </div>
              <figure className={styles.routingFigure}>
                <figcaption>
                  <span>현재 구상하고 있는 리뷰 흐름</span>
                  <span>설계 중 · 구현 완료 아님</span>
                </figcaption>
                <div className={styles.routing} data-motion-sequence>
                  <div>
                    <span>입력</span>
                    <strong>검토할 작업</strong>
                  </div>
                  <span className={styles.flowArrow} aria-hidden="true" />
                  <div className={styles.routingRule}>
                    <span>초반 라우팅</span>
                    <strong>필요한 맥락·관점 선택</strong>
                  </div>
                  <span className={styles.flowArrow} aria-hidden="true" />
                  <div>
                    <span>검토</span>
                    <strong>선택한 리뷰 레이어</strong>
                  </div>
                </div>
                <p>
                  모든 관점을 매번 적용하는 대신, 작업에 필요한 레이어만 선택하는 것이 의도입니다.
                  입력·선택 기준과 리뷰 누락을 확인할 방법은 구체화가 필요합니다.
                </p>
              </figure>
              <div className={styles.statusColumns}>
                <div>
                  <h3>지금 남아 있는 것</h3>
                  <ul className={styles.bullets}>
                    <li>개인 셀프 리뷰 POC · 규칙·문서</li>
                    <li>조직 검토 수요로 확장하는 설계 방향</li>
                  </ul>
                </div>
                <div>
                  <h3>앞으로 확인할 것</h3>
                  <ul className={styles.bullets}>
                    <li>라우팅 기준 · 레이어 구성 · 리뷰 누락</li>
                    <li>적용 범위 · 사용 빈도 · 대기시간·결함 감소 효과</li>
                  </ul>
                </div>
              </div>
              <p className={styles.note}>
                전사 정착이나 운영 효과를 완료 성과로 제시하는 사례는 아닙니다.
              </p>
            </article>

            <section
              id="perspective"
              className={styles.case}
              aria-labelledby="perspective-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>관심을 두는 경험</span>
                <span>제품 맥락과 웹 개발</span>
              </div>
              <h2 id="perspective-title">
                제품의 흐름을 이해하고,
                <br />
                웹에서 기여할 지점 찾기
              </h2>
              <div className={styles.bodySection}>
                <ul className={styles.bullets}>
                  <li>
                    개별 화면을 넘어, 개발하는 기능이 사용자의 어떤 목적과 제품의 흐름에 연결되는지
                    이해하려고 합니다.
                  </li>
                </ul>
              </div>
              <EntryJourney />
              <p className={styles.note}>
                검색 유입을 다룬 경험은 사내 PM 대상 SEO 교육으로도 공유했습니다.
              </p>
              <aside className={styles.writing} aria-labelledby="writing-title">
                <h3 id="writing-title">제품을 바라보는 관점도, 개인 블로그에 기록합니다</h3>
                <p>
                  개인 기술 블로그를 직접 운영하며 개발 경험과 함께 AARRR·UX를 공부하고 정리한 글을
                  쌓고 있습니다.
                </p>
                <div className={styles.linkRow}>
                  <a
                    href="https://feel5ny.github.io/categories/04-AARRR/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    AARRR 글 모음 <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="https://feel5ny.github.io/categories/01-Web/00-UX/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    UX 글 모음 <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </aside>
            </section>

            <section
              id="team"
              className={styles.case}
              aria-labelledby="team-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>함께 맡은 역할</span>
                <span>2026.04 —</span>
              </div>
              <h2 id="team-title">
                사람이 바뀌어도 업무가 이어지는
                <br />
                운영 프레임워크 만들기
              </h2>
              <p className={styles.subtitle}>
                웹 Chapter Lead · 공통 웹 업무의 운영 프레임워크 설계·정비
              </p>
              <div className={styles.bodySection}>
                <ul className={styles.bullets}>
                  <li>
                    <strong>목적:</strong> 사람이 바뀌어도 같은 기준과 절차로 업무가 이어지는 운영
                    프레임워크
                  </li>
                  <li>
                    <strong>출발점:</strong> 공통 업무의 질문·판단·실행이 특정인에게 집중
                  </li>
                  <li>
                    <strong>접근:</strong> Tech Lead들과 책임 범위 협의, 판단·실행 분리, 협의 경로와
                    결정 기록 정비
                  </li>
                </ul>
              </div>
              <OperationsMap />
              <dl className={styles.operatingNotes}>
                <div>
                  <dt>운영하며 바꾼 것</dt>
                  <dd>담당 범위의 인식 차이와 시간 확보 문제를 확인하고 배분 기준 조정</dd>
                </div>
                <div>
                  <dt>정착을 위해 보완 중</dt>
                  <dd>
                    담당자가 바뀌어도 운영을 이어가기 위한 점검 주기·조치·권한, 인수인계와 참여 정착
                  </dd>
                </div>
              </dl>
            </section>

            <section
              id="background"
              className={styles.case}
              aria-labelledby="background-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>경력과 기록</span>
                <span>2018 — 현재</span>
              </div>
              <h2 id="background-title">경력과 다른 작업들</h2>
              <div className={styles.career}>
                <div>
                  <span>2025 복직 ~ 현재</span>
                  <div>
                    <h3 className={styles.companyName}>
                      <img src="/images/portfolio/banksalad.png" width="20" height="20" alt="" />
                      뱅크샐러드
                    </h3>
                    <p>
                      건강 웹팀 Tech Lead · 제품 개발 병행
                      <br />
                      2026년 4월부터 웹 Chapter Lead 겸임
                    </p>
                  </div>
                </div>
                <div className={styles.leave}>
                  <span>2024.07 ~ 2025.10</span>
                  <div>
                    <h3>육아휴직</h3>
                  </div>
                </div>
                <div>
                  <span>2021.03 ~ 2024.07</span>
                  <div>
                    <h3 className={styles.companyName}>
                      <img src="/images/portfolio/banksalad.png" width="20" height="20" alt="" />
                      뱅크샐러드
                    </h3>
                    <p>건강 웹 개발·리딩</p>
                  </div>
                </div>
                <div>
                  <span>2018.01 ~ 2021.02</span>
                  <div>
                    <h3 className={styles.companyName}>
                      <img src="/images/portfolio/goodoc.png" width="20" height="20" alt="" />
                      굿닥
                    </h3>
                    <p>프론트엔드 개발</p>
                  </div>
                </div>
              </div>
              <WorkAccordion count={otherWork.length}>
                <div>
                  {otherWork.map(([period, title, description]) => (
                    <div className={styles.workRow} key={title}>
                      <span>{period}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </WorkAccordion>
              <div className={styles.bodySection}>
                <h3>멘토링</h3>
                <div className={styles.career}>
                  <div>
                    <span>2022.02 시작</span>
                    <div>
                      <h4 className={styles.mentoringTitle}>K-Digital Training 데브코스</h4>
                      <p>프론트엔드 과정의 멘토로 참여했습니다.</p>
                    </div>
                  </div>
                  <div>
                    <span>2024.03 ~ 2025.02</span>
                    <div>
                      <h4 className={styles.mentoringTitle}>항해 플러스</h4>
                      <p>프론트엔드 주니어 개발자 대상 멘토링을 진행했습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.bodySection}>
                <h3>기록과 공유</h3>
                <ul className={styles.bullets}>
                  <li>기술 블로그 운영 · 개발 경험 발표</li>
                  <li>JavaScript 영상 강의 · 프론트엔드 실무 강의 제작</li>
                  <li>사내 PM 대상 SEO 강의 · AI 도구 활용 강의</li>
                </ul>
                <p className={styles.stack}>
                  React · TypeScript · Next.js · TanStack Query · MSW · Storybook · Nx · GitHub
                  Actions · Sentry · Amplitude
                </p>
              </div>
            </section>

            <footer className={styles.footer}>
              <p>
                김나영<span>프론트엔드 개발자</span>
              </p>
              <div className={styles.linkRow}>
                {links.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <small className={styles.copyright}>© 2026 Nayoung Kim. All rights reserved.</small>
              <a className={styles.backTop} href="#intro">
                처음으로 ↑
              </a>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
