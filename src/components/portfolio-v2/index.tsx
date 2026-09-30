import styles from './portfolio.module.css';
import { MobileBackToTop, MobileMenu, PortfolioNav, PrintButton } from './navigation';
import { EntryJourney } from './journey';
import { ScrollEffects } from './scroll-effects';
import { WorkAccordion } from './work-accordion';
import { PointerGlow } from './pointer-glow';
import { OperationsMap } from './operations-map';
import { CaseDrawer, CaseDetailLink } from './case-drawer';
import { GeneDetails, ReviewDetails, TeamDetails } from './case-details';
import { InsuranceDetails } from './insurance-details';
import { FamilyHistoryDetails } from './family-history-details';
import { GeneProjectMap } from './gene-project-map';

const links = [
  { label: 'GitHub', href: 'https://github.com/feel5ny' },
  { label: '개발 기록', href: 'https://feel5ny.github.io' },
  { label: '발표 자료', href: 'https://speakerdeck.com/feel5ny' },
];

const otherWork = [
  [
    '2026',
    '가족력 완벽대비',
    '신규 웹뷰 개발과 입력 수정 후 정보 연동 단계가 반복 노출되는 캐시 경쟁 상태 수정.',
  ],
  [
    '2026',
    '내보험탭 보험료 줄이기',
    '기존 코드에 남아 있는 정책을 확인하고, PM과 스펙을 확정해 웹 개발에 반영했습니다.',
  ],
  [
    '2025 ~ 2026',
    '건강 웹·콘텐츠 웹 검색 유입 정비',
    '건강 웹의 sitemap을 정비했습니다. 콘텐츠 웹은 네이버 미색인 문제를 조사·수정하고, 전체 콘텐츠의 재색인 요청을 위해 IndexNow 단건·벌크 요청 경로를 구성했습니다.',
  ],
  [
    '2023 ~',
    '보험 상담 연동',
    '상담 신청부터 외부 채팅 연결까지 프론트엔드 연동을 구성하고 운영했습니다. 이후 팀원에게 업무를 이관했습니다.',
  ],
  ['2020', '굿닥 시술백과', '검색 유입용 콘텐츠의 프론트엔드 개발을 담당했습니다.'],
  [
    '2018 ~ 2021',
    '굿닥 후기·굿닥톡',
    '후기 기능과 커뮤니티 웹뷰의 프론트엔드 개발을 담당했습니다.',
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
                  <span>운영 중인 제품의 리뉴얼</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="#insurance">
                  <span className={styles.number}>02</span>
                  <span>신규 제품의 구축과 운영</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="#review">
                  <span className={styles.number}>03</span>
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
                <span>01 · 운영 중인 제품의 리뉴얼</span>
                <span>2026.05 — 07</span>
              </div>
              <h2 id="gene-title">유전자검사 2.0 리뉴얼</h2>
              <p className={`${styles.subtitle} ${styles.companySubtitle}`}>
                <img src="/images/portfolio/banksalad.png" alt="" width={18} height={18} />
                <span>뱅크샐러드 · 기존 동작을 보호하며 새 경험으로 전환</span>
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt>역할</dt>
                  <dd>웹 테크스펙 리드 · 프론트엔드 개발</dd>
                </div>
                <div>
                  <dt>담당</dt>
                  <dd>전체 흐름·스캐폴딩 · 브릿지·상태별 랜딩 개발 · 이미지 POC</dd>
                </div>
              </dl>

              <div className={styles.bodySection}>
                <ul className={styles.bullets}>
                  <li>
                    <strong>과제:</strong> 운영 중인 유전자검사의 신청·진행·결과 경험을 리뉴얼.
                    유지할 기능을 보호하면서 기존 화면과 신규 화면을 연결
                  </li>
                  <li>
                    <strong>개발:</strong> 전체 흐름을 테크스펙·스캐폴딩으로 구체화하고, 브릿지와
                    검사 상태에 따라 목적지를 결정하는 다이나믹 랜딩 구현
                  </li>
                  <li>
                    <strong>변경 검증:</strong> 기존 동작을 테스트로 고정하고, MSW로 상태별 새 흐름
                    확인. FF로 기존·신규 화면 공개를 제어하고, 안정화 후 전환 코드와 문서 정리
                  </li>
                </ul>
              </div>
              <GeneProjectMap />
              <CaseDrawer
                id="gene"
                title="유전자검사 2.0 리뉴얼 · 개발 과정"
                description="재사용과 신규 개발의 구분, PM과의 Spec-out 협의, 회귀 검증과 FF 공개 제어"
              >
                <GeneDetails />
              </CaseDrawer>
            </article>

            <article
              id="insurance"
              className={styles.case}
              aria-labelledby="insurance-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>02 · 신규 제품의 구축과 운영</span>
                <span>2023 — 2026 · 여러 프로젝트</span>
              </div>
              <h2 id="insurance-title">신규 보험 제품의 구축과 운영</h2>
              <p className={`${styles.subtitle} ${styles.companySubtitle}`}>
                <img src="/images/portfolio/banksalad.png" alt="" width={18} height={18} />
                <span>뱅크샐러드 · 보험 중개 MVP, 보험료 줄이기, 가족력 완벽대비</span>
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt>역할</dt>
                  <dd>신규 웹·웹뷰 개발 · 외부 상담 연동 · 출시 후 운영</dd>
                </div>
                <div>
                  <dt>초점</dt>
                  <dd>입력부터 결과·상담까지 구현 · 매출 직결 구간의 안정성 관측</dd>
                </div>
              </dl>
              <div className={styles.bodySection}>
                <ul className={styles.bullets}>
                  <li>
                    <strong>구축:</strong> 보험 중개 MVP와 신규 보험 제품의 웹·웹뷰 개발.
                    입력·동의·결과 확인에서 상담 신청까지 이어지는 기능 구현
                  </li>
                  <li>
                    <strong>흐름·연동:</strong> useFunnel 단계 전환과 방문 이력, 결과 재진입 시 캐시
                    정합성 관리. 외부 채팅 연동과 앱 푸시·알림톡 진입 경로 연결
                  </li>
                  <li>
                    <strong>운영:</strong> 매출로 이어지는 상담 전환 구간을 Amplitude 퍼널·Agent와
                    Sentry로 관측하고, 외부 연동 제약과 장애 대응 절차를 문서화
                  </li>
                </ul>
              </div>
              <div
                className={styles.insuranceJourney}
                aria-label="신규 보험 제품의 구축부터 운영까지"
              >
                <div>
                  <span>신규 구축</span>
                  <strong>입력 · 동의 · 결과 · 상담</strong>
                </div>
                <span aria-hidden="true">→</span>
                <div>
                  <span>흐름 연결</span>
                  <strong>단계·상태 관리 · 외부 연동</strong>
                </div>
                <span aria-hidden="true">→</span>
                <div>
                  <span>안정성 유지</span>
                  <strong>퍼널·오류 관측 · 장애 대응</strong>
                </div>
              </div>
              <CaseDrawer
                id="insurance"
                title="신규 보험 제품의 구축과 운영 · 개발 과정"
                description="MVP·신규 웹뷰 구축, 단계·상태 관리, 외부 연동과 매출 직결 구간의 모니터링"
              >
                <InsuranceDetails />
              </CaseDrawer>
              <div id="family-history" className={styles.relatedCase}>
                <div>
                  <span className={styles.relatedLabel}>관련 기술 사례 · TanStack Query</span>
                  <h3>가족력 결과 화면의 재진입 오류 수정</h3>
                  <p>늦게 도착한 응답이 최신 캐시를 덮어쓰는 원인과 해결 과정</p>
                </div>
                <div className={styles.linkRow}>
                  <CaseDetailLink id="family-history">해결 과정 보기</CaseDetailLink>
                </div>
              </div>
              <CaseDrawer
                id="family-history"
                title="최신 상태를 덮어쓰는 비동기 요청의 경쟁 상태 해결"
                description="가족력 완벽대비 · 2026.07 · 캐시 직접 갱신 이후에도 남은 재진입 문제의 후속 수정"
                showTrigger={false}
              >
                <FamilyHistoryDetails />
              </CaseDrawer>
            </article>

            <article
              id="review"
              className={styles.case}
              aria-labelledby="review-title"
              data-reveal="section"
            >
              <div className={styles.sectionLabel}>
                <span>03 · AI 셀프 리뷰</span>
                <span>2026 —</span>
              </div>
              <h2 id="review-title">
                어떤 컨벤션을 따라야 할까?
                <br />그 질문에서 시작한 AI 셀프 리뷰
              </h2>
              <p className={styles.subtitle}>
                개인 셀프 리뷰에서 변경 파일 기반의 리뷰 레이어로 확장
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt>담당</dt>
                  <dd>문제 인식 · 셀프 리뷰 스킬 구축 · 라우팅형 리뷰 구조 확장</dd>
                </div>
                <div>
                  <dt>현재</dt>
                  <dd>라우팅형 프로토타입 구현 · 적용 범위와 운영 효과 검증 단계</dd>
                </div>
              </dl>
              <div className={styles.bodySection}>
                <ul className={styles.bullets}>
                  <li>
                    <strong>출발점:</strong> 복직 후 현재 적용할 컨벤션을 구분하기 어려워 조직의
                    맥락과 규칙을 연결하는 셀프 리뷰 스킬 구축
                  </li>
                  <li>
                    <strong>확장:</strong> 변경 파일·위험도에 따라 필요한 리뷰 레이어를 선택하는
                    프로토타입 구현
                  </li>
                  <li>
                    <strong>개선:</strong> 실행 비용을 나누고, AI 지적의 근거를 재검증한 뒤 읽기
                    쉬운 리포트로 전달
                  </li>
                </ul>
              </div>
              <CaseDrawer
                id="review"
                title="AI 셀프 리뷰 · pre-review"
                description="변경 파일 라우팅, 병렬 실행과 근거 검증의 구현 구조"
              >
                <ReviewDetails />
              </CaseDrawer>
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
              <dl className={styles.facts}>
                <div>
                  <dt>현재</dt>
                  <dd>
                    운영 체계 적용·정착 단계 · 병목 감소 효과 측정 전 · Tech Lead 자동 알림 준비 중
                  </dd>
                </div>
              </dl>
              <div className={styles.bodySection}>
                <ul className={styles.bullets}>
                  <li>
                    <strong>문제:</strong> 공통 업무의 판단과 실행이 특정 리드에게 집중되고 결정의
                    맥락이 흩어짐
                  </li>
                  <li>
                    <strong>선택:</strong> 공통 영역의 맥락을 유지하고 판단하는 담당자(DRI)를 두고,
                    구현은 팀원과 분담. 실행자가 바뀌어도 이어갈 절차 마련
                  </li>
                  <li>
                    <strong>기여:</strong> Tech Lead들과 책임 범위를 협의하고 ADR·DRI 보드·Jira
                    자동화·CODEOWNERS·AI 스킬을 운영에 연결
                  </li>
                </ul>
              </div>
              <OperationsMap />
              <CaseDrawer
                id="team"
                title="공통 웹 업무 운영 프레임워크"
                description="ADR, 책임 범위, 실행 단위와 인수인계를 연결한 운영 설계"
              >
                <TeamDetails />
              </CaseDrawer>
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
                        {title === '가족력 완벽대비' && (
                          <div className={styles.linkRow}>
                            <CaseDetailLink id="family-history">
                              캐시 경쟁 상태 해결 보기
                            </CaseDetailLink>
                          </div>
                        )}
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
                      <h4 className={`${styles.mentoringTitle} ${styles.companyName}`}>
                        <img
                          src="/images/portfolio/programmers.png"
                          width={20}
                          height={20}
                          alt=""
                        />
                        <span>K-Digital Training 데브코스</span>
                      </h4>
                      <p>프론트엔드 과정의 멘토로 참여했습니다.</p>
                    </div>
                  </div>
                  <div>
                    <span>2024.03 ~ 2025.02</span>
                    <div>
                      <h4 className={`${styles.mentoringTitle} ${styles.companyName}`}>
                        <img src="/images/portfolio/sparta.png" width={20} height={20} alt="" />
                        <span>항해 플러스</span>
                      </h4>
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
