import styles from './journey.module.css';

const experience = [
  {
    letter: 'A',
    label: '유입',
    name: 'Acquisition',
    title: '검색에서 서비스를 발견하도록',
    work: '건강 웹 검색 노출·sitemap 정비와 색인 요청 자동화 참여',
  },
  {
    letter: 'A',
    label: '활성화',
    name: 'Activation',
    title: '신청부터 검사 경험으로 이어지도록',
    work: '유전자검사 신청·동의·진행·결과 화면 개발 · 상태와 진입 조건에 따른 랜딩 구성',
  },
  {
    letter: 'R',
    label: '유지',
    name: 'Retention',
    title: '알림을 통해 제품으로 다시 들어오도록',
    work: '보험 제품의 앱 푸시·알림톡 진입 페이지 개발',
  },
  {
    letter: 'R',
    label: '추천',
    name: 'Referral',
    title: '내가 확인한 정보를 다른 사람에게 공유하도록',
    work: '발병률·병원비 미리보기의 상세 화면과 공유 기능 개발',
  },
  {
    letter: 'R',
    label: '수익',
    name: 'Revenue',
    title: '상담 전환을 구현하고, 이상 신호까지 살피도록',
    work: '보험 중개 MVP의 상담 신청 · 외부 채팅 연동 · 상담사용 웹뷰 개발',
    monitoring: [
      'Amplitude 퍼널 차트로 전환 흐름 확인 · 이상 지표 알림 추가',
      'Sentry 알림 추가로 오류 감지',
      '각 레이어별 모니터링 기능 추가',
    ],
  },
];

export function EntryJourney() {
  return (
    <figure className={styles.map} aria-labelledby="experience-map-title">
      <figcaption>
        <strong id="experience-map-title">제품 여정과 연결되는 개발 경험</strong>
        <span>AARRR</span>
      </figcaption>
      <ol className={styles.stages} data-motion-sequence="stagger">
        {experience.map(stage => (
          <li key={stage.name}>
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
              {stage.monitoring && (
                <ul className={styles.monitoring}>
                  {stage.monitoring.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className={styles.note}>
        모바일 앱 중심의 경험을 만들면서, 검색·공유·알림 등 앱 밖의 접점도 함께 고려했습니다.
      </p>
    </figure>
  );
}
