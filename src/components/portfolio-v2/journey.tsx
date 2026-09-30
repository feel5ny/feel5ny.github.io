import styles from './journey.module.css';
import { CaseDetailLink } from './case-drawer';
import { JourneyDetails } from './journey-details';
import type { CaseId } from './case-drawer-state';

const experience = [
  {
    letter: 'A',
    label: '유입',
    name: 'Acquisition',
    detail: 'acquisition',
    linkLabel: '유입 작업 보기',
    title: '검색 노출·색인 요청',
    work: '건강 웹 검색 노출·sitemap 정비와 색인 요청 자동화 참여',
  },
  {
    letter: 'A',
    label: '활성화',
    name: 'Activation',
    detail: 'activation',
    linkLabel: '활성화 작업 보기',
    title: '신청 흐름·상태별 랜딩',
    work: '유전자검사 신청·동의·진행·결과 화면 개발 · 상태와 진입 조건에 따른 랜딩 구성',
  },
  {
    letter: 'R',
    label: '유지',
    name: 'Retention',
    detail: 'retention',
    linkLabel: '유지 작업 보기',
    title: '메시지 진입·웹뷰 라우팅',
    work: '보험 제품의 앱 푸시·알림톡 진입 페이지 개발',
  },
  {
    letter: 'R',
    label: '추천',
    name: 'Referral',
    detail: 'referral',
    linkLabel: '추천 작업 보기',
    title: '건강 정보 상세·공유',
    work: '발병률·병원비 미리보기의 상세 화면과 공유 기능 개발',
  },
  {
    letter: 'R',
    label: '수익',
    name: 'Revenue',
    detail: 'revenue',
    linkLabel: '수익 작업 보기',
    title: '상담 연동·전환 구간 관측',
    work: '상담 신청·외부 채팅 연동 개발, Amplitude·Sentry 기반 모니터링',
  },
] satisfies Array<{
  letter: string;
  label: string;
  name: string;
  detail: CaseId;
  linkLabel: string;
  title: string;
  work: string;
}>;

export function EntryJourney() {
  return (
    <>
      <figure className={styles.map} aria-labelledby="experience-map-title">
        <figcaption>
          <strong id="experience-map-title">제품 여정과 연결되는 개발 경험</strong>
          <span>AARRR</span>
        </figcaption>
        <ol className={styles.stages} data-motion-sequence="stagger">
          {experience.map(stage => (
            <li key={stage.name} id={stage.detail}>
              <div className={styles.stage}>
                <span className={styles.letter} aria-hidden="true">
                  {stage.letter}
                </span>
                <div>
                  <strong>{stage.label}</strong>
                  <span className={styles.english}>{stage.name}</span>
                </div>
              </div>
              <div className={styles.experience}>
                <h3>{stage.title}</h3>
                <p>{stage.work}</p>
                <div className={styles.detailLink}>
                  <CaseDetailLink id={stage.detail}>{stage.linkLabel}</CaseDetailLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.note}>
          제품별 개발 경험을 AARRR 관점에서 묶었습니다. 앱 안의 기능과 검색·공유·알림 접점을 함께
          다뤘습니다.
        </p>
      </figure>
      <JourneyDetails />
    </>
  );
}
