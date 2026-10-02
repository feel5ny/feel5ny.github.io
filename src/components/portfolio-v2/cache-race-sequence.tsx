import styles from './cache-race-sequence.module.css';

const participants = ['화면 · 조회 훅', '로컬 쿼리 캐시', '서버'];

type Message = {
  from: number;
  to: number;
  label: string;
  note: string;
  problem?: boolean;
};

const before: Message[] = [
  { from: 0, to: 2, label: '조회 이력 요청', note: '기존 값으로 시작한 조회 · 응답 대기' },
  { from: 0, to: 1, label: 'setQueryData', note: '‘조회함’ 즉시 반영' },
  { from: 2, to: 1, label: '늦게 도착한 응답', note: '‘미조회’로 덮어씀', problem: true },
  { from: 1, to: 0, label: '수정 후 재진입 시 읽음', note: '첫 이용 흐름으로 판단' },
];

const after: Message[] = [
  { from: 0, to: 2, label: '이미 시작된 조회', note: '진행 중인 요청이 남아 있는 경우' },
  { from: 0, to: 1, label: 'await cancelQueries', note: '이전 조회의 캐시 반영 취소' },
  { from: 0, to: 1, label: 'setQueryData', note: '취소 완료 후 ‘조회함’ 반영' },
  { from: 1, to: 0, label: '수정 후 재진입 시 읽음', note: '조회 이력에 맞게 결과로 이동' },
];

function Sequence({ messages, label }: { messages: Message[]; label: string }) {
  return (
    <div className={styles.scroll} role="region" aria-label={label} tabIndex={0}>
      <div className={styles.canvas}>
        <div className={styles.participants} aria-hidden="true">
          {participants.map(name => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <div className={styles.timeline}>
          <div className={styles.lifelines} aria-hidden="true">
            {participants.map(name => (
              <span key={name} />
            ))}
          </div>
          <ol className={styles.messages}>
            {messages.map(({ from, to, label: message, note, problem }, index) => (
              <li
                key={`${message}-${index}`}
                aria-label={`${index + 1}. ${participants[from]}에서 ${participants[to]}로: ${message}. ${note}`}
              >
                <span className={styles.order} aria-hidden="true">
                  {index + 1}
                </span>
                <div
                  className={`${styles.message} ${to < from ? styles.reverse : ''} ${problem ? styles.problem : ''}`}
                  style={{
                    left: `${(Math.min(from, to) + 0.5) * (100 / 3)}%`,
                    width: `${Math.abs(to - from) * (100 / 3)}%`,
                  }}
                  aria-hidden="true"
                >
                  <div className={styles.label}>
                    <strong>{message}</strong>
                    <span>{note}</span>
                  </div>
                  <span className={styles.connector} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function CacheRaceSequence() {
  return (
    <figure className={styles.figure} aria-label="캐시 경쟁 상태의 발생 순서와 후속 수정 비교">
      <figcaption>
        <strong>값을 쓰는 시점보다, 나중에 덮어쓸 요청이 문제</strong>
        <span>시간은 위에서 아래로 · 조회 이력 플래그의 캐시 처리만 요약</span>
      </figcaption>
      <p className={styles.hint}>좁은 화면에서는 각 다이어그램을 좌우로 넘겨 볼 수 있습니다.</p>
      <div className={styles.comparison}>
        <section className={styles.panel} aria-label="첫 수정 후 남은 오류">
          <h4>첫 수정 후 · 쓰기만으로는 부족</h4>
          <Sequence messages={before} label="늦은 조회 응답이 새 캐시를 덮어쓰는 순서" />
          <p className={styles.outcome}>
            <strong>결과:</strong> 이미 결과를 봤는데 정보 연동 단계가 다시 노출
          </p>
        </section>
        <section className={styles.panel} aria-label="후속 수정">
          <h4>후속 수정 · 취소 완료 후 쓰기</h4>
          <Sequence messages={after} label="진행 중인 조회를 취소한 뒤 캐시를 쓰는 순서" />
          <p className={styles.outcome}>
            <strong>추가 방어:</strong> <code>staleTime: Infinity</code>로 해당 플래그의 자동 재조회
            억제
          </p>
        </section>
      </div>
      <p className={styles.note}>
        서버의 조회 이력 저장 과정은 생략했습니다. 취소는 이전 조회 결과의 캐시 반영을 막는
        의미이며, 서버에서 요청 처리가 반드시 중단된다는 뜻은 아닙니다.
      </p>
    </figure>
  );
}
