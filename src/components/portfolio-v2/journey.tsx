import styles from './journey.module.css';
import { CaseDetailLink } from './case-drawer';
import { JourneyDetails } from './journey-details';
import type { CaseId } from './case-drawer-state';

const experience = [
  {
    letter: 'A',
    name: 'Acquisition',
    detail: 'acquisition',
    linkLabel: 'Acquisition 작업 보기',
    title: '검색용 웹 구축·색인 정비',
    work: '굿닥 시술백과 Gatsby 정적 페이지 개발 · 건강 웹 sitemap 정비 · 콘텐츠 웹 IndexNow 색인 요청 연동',
  },
  {
    letter: 'A',
    name: 'Activation',
    detail: 'activation',
    linkLabel: 'Activation 작업 보기',
    title: '첫 이용 흐름 구현',
    work: '신청·동의·결과 확인으로 이어지는 웹 화면과 전환 흐름 개발 · 사용자 상태에 맞는 진입 화면 연결',
  },
  {
    letter: 'R',
    name: 'Retention',
    detail: 'retention',
    linkLabel: 'Retention 작업 보기',
    title: '재진입 경로·딥링크 운영 개선',
    work: '푸시·알림톡 진입 개발과 인코딩 오류 대응 · 다이나믹링크 운영 제약을 분석·제보해 에어브릿지 전환 논의에 기여',
  },
  {
    letter: 'R',
    name: 'Referral',
    detail: 'referral',
    linkLabel: 'Referral 작업 보기',
    title: '공유 모듈·수신자 진입',
    work: '카카오톡 공유 모듈 · 플랫폼별 공유 데이터 변환 · 바우처 링크의 앱 진입·코드 전달 · 건강 정보 공유 개발',
  },
  {
    letter: 'R',
    name: 'Revenue',
    detail: 'revenue',
    linkLabel: 'Revenue 작업 보기',
    title: '상담 연동·전환 구간 관측',
    work: '상담 연동 개발 · Amplitude Agent 일일 지표 점검·알림과 Sentry 오류 모니터링',
  },
] satisfies Array<{
  letter: string;
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
                <strong>{stage.name}</strong>
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
