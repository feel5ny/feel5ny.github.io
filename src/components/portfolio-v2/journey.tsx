import styles from './journey.module.css';
import { CaseDetailLink } from './case-drawer';
import { JourneyDetails } from './journey-details';
import type { CaseId } from './case-drawer-state';

const experience = [
  {
    letter: 'A',
    name: 'Acquisition',
    detail: 'acquisition',
    title: '검색용 웹 구축·색인 정비',
    work: 'Gatsby 정적 웹 구축 · sitemap 정비 · IndexNow 연동',
  },
  {
    letter: 'A',
    name: 'Activation',
    detail: 'activation',
    title: '첫 이용 흐름 구현',
    work: '브릿지·상태별 랜딩으로 기존·신규 화면 연결',
  },
  {
    letter: 'R',
    name: 'Retention',
    detail: 'retention',
    title: '알림톡에서 기대한 보험 정보로 연결',
    work: '실손보험 진입 화면 · OS별 인코딩 대응 · 딥링크 개선 제안',
  },
  {
    letter: 'R',
    name: 'Referral',
    detail: 'referral',
    title: '공유 모듈·수신자 진입',
    work: '카카오톡 공유 모듈 · 플랫폼별 데이터 변환 · 수신자 앱 진입',
  },
  {
    letter: 'R',
    name: 'Revenue',
    detail: 'revenue',
    title: '상담 연동·전환 구간 관측',
    work: '상담 연동 · Sentry 중요 오류 알림 · Amplitude 퍼널·Agent',
  },
] satisfies Array<{
  letter: string;
  name: string;
  detail: CaseId;
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
                <strong>{stage.name}</strong>
              </div>
              <div className={styles.experience}>
                <h3>{stage.title}</h3>
                <p>{stage.work}</p>
              </div>
              <div className={styles.detailLink}>
                <CaseDetailLink id={stage.detail}>
                  <span className={styles.srOnly}>{stage.name} </span>상세 보기
                </CaseDetailLink>
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
