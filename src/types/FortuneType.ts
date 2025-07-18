export interface FortuneResult {
  /** 오늘 날짜 */
  todayDate: string;

  /** 오늘의 운세 타이틀 */
  fortuneTitle: string;

  /** 운세 상세 내용 */
  fortuneContent: string;

  /** 행운지수 (1-5) */
  luckIndex: number;

  /** 행운 정보 */
  luckInfo: {
    /** 점수 (1-100) */
    score: number;
    /** 행운의 색상 */
    color: string;
    /** 행운의 숫자 */
    number: number;
    /** 행운의 음식 */
    food: string;
  };

  /** 오늘의 12운성 */
  twelveStars: {
    /** 12운성 종류 */
    type: string;
    /** 12운성 설명 */
    description: string;
  };

  /** 오늘의 12신살 */
  twelveSinsal: {
    /** 12신살 종류 */
    type: string;
    /** 12신살 설명 */
    description: string;
  };

  /** 오늘의 운세 조언 */
  advice: {
    /** 오늘 연애에 대한 조언 */
    love: string;
    /** 오늘 직장/사업에 대한 조언 */
    work: string;
    /** 오늘 건강에 대한 조언 */
    health: string;
    /** 오늘 금전에 대한 조언 */
    money: string;
  };
}

export interface FortuneLoadingState {
  isLoading: boolean;
  error?: string;
}

/** 운세 캐시 데이터 */
export interface FortuneCacheData {
  /** 캐시된 날짜 (YYYY-MM-DD 형식) */
  cacheDate: string;
  /** 운세 결과 */
  fortune: FortuneResult;
}
