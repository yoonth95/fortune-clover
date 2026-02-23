/**
 * Custom Saju (Four Pillars) Calculation Module
 * * [수정 내역]
 * 1. 변수명 전면 수정 (HeavenlyStem -> CheonGan, 등)
 * 2. 천간/지지별 색상 및 동물 매핑 데이터 내장 (황금색 반영)
 * 3. 최종 리턴값을 UI에 뿌리기 좋은 직관적인 Object 형태로 변경
 */

// ===== 1. 기본 매핑 데이터 정의 =====

export type Ohaeng = '목' | '화' | '토' | '금' | '수';

export const CHEON_GAN = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;
export const JI_JI = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;

type CheonGanType = typeof CHEON_GAN[number];
type JiJiType = typeof JI_JI[number];

// 천간 속성 (오행, 색상)
const GAN_PROPS: Record<CheonGanType, { ohaeng: Ohaeng; color: string }> = {
  갑: { ohaeng: '목', color: '푸른' }, 을: { ohaeng: '목', color: '푸른' },
  병: { ohaeng: '화', color: '붉은' }, 정: { ohaeng: '화', color: '붉은' },
  무: { ohaeng: '토', color: '황금' }, 기: { ohaeng: '토', color: '황금' }, // 노란색 -> 황금색으로 매핑
  경: { ohaeng: '금', color: '하얀' }, 신: { ohaeng: '금', color: '하얀' },
  임: { ohaeng: '수', color: '검은' }, 계: { ohaeng: '수', color: '검은' },
};

// 지지 속성 (오행, 동물)
const JI_PROPS: Record<JiJiType, { ohaeng: Ohaeng; animal: string }> = {
  자: { ohaeng: '수', animal: '쥐' }, 축: { ohaeng: '토', animal: '소' },
  인: { ohaeng: '목', animal: '호랑이' }, 묘: { ohaeng: '목', animal: '토끼' },
  진: { ohaeng: '토', animal: '용' }, 사: { ohaeng: '화', animal: '뱀' },
  오: { ohaeng: '화', animal: '말' }, 미: { ohaeng: '토', animal: '양' },
  신: { ohaeng: '금', animal: '원숭이' }, 유: { ohaeng: '금', animal: '닭' },
  술: { ohaeng: '토', animal: '개' }, 해: { ohaeng: '수', animal: '돼지' },
};

// ===== 2. 인터페이스 정의 =====

export interface UserBirthInput {year: number;
  month: number;
  day: number;
  timeJi: JiJiType | '모름'; // 시, 분 대신 지지 글자 1개만 받습니다.
  isLunar?: boolean;
}

interface Pillar {
  gan: CheonGanType;
  ji: JiJiType;
}

// 최종 프론트엔드로 전달될 리턴 포맷
export interface SajuAnalysisResult {
  myeongsik: {
    yearPillar: string;
    monthPillar: string;
    dayPillar: string;
    hourPillar: string;
  };
  ohaengStats: {
    목: number; 화: number; 토: number; 금: number; 수: number;
  };
  ddi: {
    name: string; // ex) "푸른 돼지"
    animal: string;
    color: string;
  };
  gijil: {
    name: string; // ex) "검은 소"
    animal: string;
    color: string;
  };
}

// ===== 3. 천문/달력 데이터 및 로직 (알고리즘 코어) =====
// (절기 및 달력 계산에 필요한 상수 데이터는 원본 유지하되 변수명 단축)

const LUNAR_DB = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0,
  0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0,
  0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50,
  0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0,
  0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0,
  0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260,
  0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558,
  0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
  0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5,
  0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954,
  0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3,
  0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2,
  0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370, 0x049f8, 0x04970,
  0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, 0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0,
  0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
  0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60,
  0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0,
  0x0d150, 0x0f252, 0x0d520,
];

const TERM_BASE = [
  5.4055, 20.12, 3.87, 18.73, 5.63, 20.646, 4.81, 20.1, 5.52, 21.04, 5.678, 21.37, 7.108, 22.83,
  7.5, 23.13, 7.646, 23.042, 8.318, 23.438, 7.438, 22.36, 7.18, 21.94,
];

const getLeapMonth = (year: number) => LUNAR_DB[year - 1900] & 0xf;
const getLeapMonthDays = (year: number) => (getLeapMonth(year) ? (LUNAR_DB[year - 1900] & 0x10000 ? 30 : 29) : 0);
const getLunarMonthDays = (year: number, month: number) => (LUNAR_DB[year - 1900] & (0x10000 >> month) ? 30 : 29);
const getLunarYearDays = (year: number) => {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) sum += LUNAR_DB[year - 1900] & i ? 1 : 0;
  return sum + getLeapMonthDays(year);
};

const convertLunarToSolar = (year: number, month: number, day: number): {y: number, m: number, d: number} => {
  const base = new Date(1900, 0, 31);
  let offset = 0;
  for (let i = 1900; i < year; i++) offset += getLunarYearDays(i);
  const leapMonth = getLeapMonth(year);
  let isLeap = false;
  for (let i = 1; i < month; i++) {
    if (leapMonth > 0 && i === leapMonth && !isLeap) { offset += getLeapMonthDays(year); isLeap = true; i--; } 
    else { offset += getLunarMonthDays(year, i); }
  }
  offset += day - 1;
  const solar = new Date(base.getTime() + offset * 86400000);
  return { y: solar.getFullYear(), m: solar.getMonth() + 1, d: solar.getDate() };
};

const getTermDate = (year: number, termIdx: number) => {
  const century = Math.floor(year / 100);
  const yearInCentury = year % 100;
  const day = Math.floor(TERM_BASE[termIdx] + 0.2422 * yearInCentury + (Math.floor(yearInCentury / 4) - Math.floor(century / 4)));
  return new Date(year, Math.floor(termIdx / 2), day);
};

// ===== 4. 4기둥(사주) 계산 로직 =====

const calcYear = (year: number): Pillar => ({
  gan: CHEON_GAN[(year - 4) % 10],
  ji: JI_JI[(year - 4) % 12],
});

const calcMonth = (year: number, month: number, day: number): Pillar => {
  const date = new Date(year, month - 1, day);
  const adjYear = date < getTermDate(year, 2) ? year - 1 : year;
  let termMonth = 0;
  for (let i = 0; i < 24; i += 2) {
    if (date >= getTermDate(adjYear, i)) termMonth = Math.floor(i / 2) + 1;
    else break;
  }
  const monthJiMap: Record<number, JiJiType> = { 1:'인', 2:'묘', 3:'진', 4:'사', 5:'오', 6:'미', 7:'신', 8:'유', 9:'술', 10:'해', 11:'자', 12:'축' };
  return {
    gan: CHEON_GAN[(((adjYear - 4) % 10 % 5) * 2 + termMonth + 1) % 10],
    ji: monthJiMap[termMonth] || '인',
  };
};

const calcDay = (year: number, month: number, day: number): Pillar => {
  const diff = Math.floor((new Date(year, month - 1, day).getTime() - new Date(1992, 9, 24).getTime()) / 86400000);
  const target = (((9 + diff) % 60) + 60) % 60;
  return { gan: CHEON_GAN[target % 10], ji: JI_JI[target % 12] };
};

const calcHour = (dayGan: CheonGanType, timeJi: JiJiType | '모름'): Pillar | null => {
  if (timeJi === '모름') return null; // 시간을 모르면 시주를 비움

  const timeJiIdx = JI_JI.indexOf(timeJi);
  // 일간(태어난 날의 천간)을 기준으로 시간의 천간을 구하는 공식
  const ganIdx = ((CHEON_GAN.indexOf(dayGan) % 5) * 2 + timeJiIdx) % 10;
  
  return { gan: CHEON_GAN[ganIdx], ji: timeJi };
};

// ===== 5. 메인 추출 함수 =====

export function analyzeUserSaju(input: UserBirthInput): SajuAnalysisResult {
  let { year, month, day } = input;
  
  if (input.isLunar) {
    const solar = convertLunarToSolar(year, month, day);
    year = solar.y; month = solar.m; day = solar.d;
  }

  const yearPillar = calcYear(year);
  const monthPillar = calcMonth(year, month, day);
  const dayPillar = calcDay(year, month, day);
  
  // 드롭다운에서 넘어온 값(timeJi)을 바로 던져줍니다.
  const hourPillar = calcHour(dayPillar.gan, input.timeJi);

  // 오행 통계 계산 (시간을 모를 경우 6글자만, 알면 8글자 모두 카운트)
  const ohaengStats = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  const allChars = [
    yearPillar.gan, yearPillar.ji, 
    monthPillar.gan, monthPillar.ji,
    dayPillar.gan, dayPillar.ji
  ];
  
  // 시주가 존재할 때만 오행 카운트에 추가
  if (hourPillar) {
    allChars.push(hourPillar.gan, hourPillar.ji);
  }

  allChars.forEach(char => {
    if (CHEON_GAN.includes(char as CheonGanType)) {
      ohaengStats[GAN_PROPS[char as CheonGanType].ohaeng]++;
    } else {
      ohaengStats[JI_PROPS[char as JiJiType].ohaeng]++;
    }
  });

  const ddiColor = GAN_PROPS[yearPillar.gan].color;
  const ddiAnimal = JI_PROPS[yearPillar.ji].animal;

  const gijilColor = GAN_PROPS[dayPillar.gan].color;
  const gijilAnimal = JI_PROPS[dayPillar.ji].animal;

  return {
    myeongsik: {
      yearPillar: `${yearPillar.gan}${yearPillar.ji}`,
      monthPillar: `${monthPillar.gan}${monthPillar.ji}`,
      dayPillar: `${dayPillar.gan}${dayPillar.ji}`,
      // 시간을 모를 경우 UI에 '모름' 또는 빈 문자열 처리
      hourPillar: hourPillar ? `${hourPillar.gan}${hourPillar.ji}` : '모름', 
    },
    ohaengStats,
    ddi: {
      name: `${ddiColor} ${ddiAnimal}`,
      color: ddiColor,
      animal: ddiAnimal,
    },
    gijil: {
      name: `${gijilColor} ${gijilAnimal}`,
      color: gijilColor,
      animal: gijilAnimal,
    }
  };
}