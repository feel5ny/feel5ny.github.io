import styles from './portfolio.module.css';
import { CacheRaceSequence } from './cache-race-sequence';

export function FamilyHistoryDetails() {
  return (
    <>
      <div className={styles.bodySection}>
        <h3>증상. 입력을 수정했을 뿐인데 처음 이용할 때의 단계가 다시 나타남</h3>
        <ul className={styles.bullets}>
          <li>결과 확인 → 입력 내용 수정 → 다시 제출</li>
          <li>결과로 바로 돌아가야 하지만, 처음 이용할 때의 정보 연동 단계가 다시 나타남</li>
          <li>결과 조회 이력을 서버에 저장하는 것만으로는 재진입 시 로컬 상태가 맞지 않았음</li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>첫 수정. 서버 저장과 함께 로컬 캐시도 갱신</h3>
        <ul className={styles.bullets}>
          <li>
            <code>invalidateQueries</code>로 재조회를 기다리면, 완료 전 재진입 시 여전히 이전 값을
            사용할 수 있어 <code>setQueryData</code>로 즉시 반영
          </li>
          <li>그러나 이미 진행 중이던 background refetch가 새 캐시를 덮어쓰는 문제가 남음</li>
        </ul>
      </div>
      <CacheRaceSequence />
      <div className={styles.bodySection}>
        <h3>선택. 데이터 성격과 요청 순서를 함께 제어</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>새 재조회 방지:</strong> 해당 조회 이력은 ‘미조회 → 조회함’으로 한 번 바뀌는
            플래그. 세션 내 변경은 직접 캐시에 반영하므로 <code>staleTime: Infinity</code> 적용
          </li>
          <li>
            <strong>늦은 응답 방어:</strong> 해당 쿼리의 <code>cancelQueries</code>가 완료된 뒤
            <code>setQueryData</code>를 실행해, 이미 출발한 요청의 덮어쓰기도 차단
          </li>
          <li>
            <strong>적용 경계:</strong> 조회 이력 플래그에만 적용. 캐시가 없는 새 세션은 서버에서
            다시 조회하며, 실제 결과 데이터 전체를 무기한 최신으로 취급하는 정책은 아님
          </li>
        </ul>
      </div>
      <div className={styles.bodySection}>
        <h3>검증과 배운 점</h3>
        <ul className={styles.bullets}>
          <li>
            <strong>PR 검증 기록:</strong> 결과 확인 → 입력 내용 수정 → 다시 제출 시, 정보 연동
            단계를 반복하지 않고 결과로 바로 이동하는 것을 확인. lint·타입 검사 통과, 후속 수정 머지
          </li>
          <li>
            <strong>레슨런:</strong> 캐시에 최신 값을 쓰는 것만으로는 부족함. 그 값을 나중에 덮어쓸
            수 있는 요청과, 화면이 상태를 읽는 시점까지 함께 확인
          </li>
        </ul>
      </div>
    </>
  );
}
