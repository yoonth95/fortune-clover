import OpenAI from "openai";
import { PartialProfileDataType } from "@/types/ProfileType";
import { FortuneResult } from "@/types/FortuneType";
import { analyzeUserSaju, UserBirthInput, JI_JI } from "./SajuAnalyzer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDailyFortune(
  profile: PartialProfileDataType,
): Promise<FortuneResult> {
  console.log("새로운 운세 데이터를 생성합니다...");

  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }); // YYYY-MM-DD

  // birthDate 파싱 (YYYY-MM-DD 형식)
  const [yearStr, monthStr, dayStr] = (profile.birthDate || "").split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // birthHour는 이제 지지 값('자','축','인',...,'해') 또는 '모름'
  const timeJi = (profile.birthHour as UserBirthInput["timeJi"]) || "모름";
  const isLunar = profile.calendarType === "음력";

  // SajuAnalyzer를 사용하여 사주 사전 계산
  let sajuInfo = "";
  if (year && month && day) {
    const sajuInput: UserBirthInput = { year, month, day, timeJi, isLunar };
    const sajuResult = analyzeUserSaju(sajuInput);

    sajuInfo = `
[사전 계산된 사주 명식]
연주(年柱): ${sajuResult.myeongsik.yearPillar}
월주(月柱): ${sajuResult.myeongsik.monthPillar}
일주(日柱): ${sajuResult.myeongsik.dayPillar}
시주(時柱): ${sajuResult.myeongsik.hourPillar}

오행 분포: 목(${sajuResult.ohaengStats.목}) 화(${sajuResult.ohaengStats.화}) 토(${sajuResult.ohaengStats.토}) 금(${sajuResult.ohaengStats.금}) 수(${sajuResult.ohaengStats.수})

띠: ${sajuResult.ddi.name} (${sajuResult.ddi.animal})
기질: ${sajuResult.gijil.name} (${sajuResult.gijil.animal})
    `.trim();
  }

  const profileInfo = `
이름: ${profile.name || "미정"}
성별: ${profile.gender || "미정"}
생년월일: ${profile.birthDate || "미정"}
달력 유형: ${profile.calendarType || "미정"}
출생 시간: ${timeJi === "모름" ? "모름" : `${timeJi}시 (${JI_JI.indexOf(timeJi as typeof JI_JI[number]) !== -1 ? timeJi : "미정"})`}
  `.trim();

  const systemPrompt = `
  당신은 20년 이상 경력의 전문 운세 상담가입니다.
  사용자의 생년월일 정보를 분석하여 오늘의 운세를 따뜻하고 친근하게 전달해주세요.

  [핵심 원칙: 쉽고 친근한 표현]
  - 사주/오행/천간/지지 등의 전문 용어를 절대 사용하지 마세요.
  - "목", "화", "토", "금", "수", "상생", "상극", "오행의 균형" 같은 표현을 쓰지 마세요.
  - "갑", "을", "병", "정" 같은 천간 표현을 쓰지 마세요.
  - "자", "축", "인", "묘" 같은 지지 표현을 쓰지 마세요.
  - "십신", "비견", "겁재", "식신" 같은 전문 용어를 쓰지 마세요.
  - 대신 일상적인 언어로 자연스럽게 풀어서 설명하세요.
  - 예시 (잘못된 표현): "오늘은 목과 토의 기운이 충돌하여 갈등이 예상됩니다"
  - 예시 (올바른 표현): "오늘은 마음이 급해질 수 있는 날이에요. 한 발짝 물러서서 상황을 바라보면 좋겠어요"

  [분석 방법 - 내부적으로만 활용하고 결과에는 드러내지 마세요]
  - 제공된 사주 명식(연주, 월주, 일주, 시주)을 기반으로 분석하되, 결과에는 전문 용어를 쓰지 마세요.
  - 오행의 균형 상태, 상생상극 관계를 내부적으로 판단하되, 이를 일상적인 조언으로 변환하세요.

  [운세 다양성 원칙]
  - 분석 결과에 따라 운세를 3가지 유형으로 분류:
    * 좋은 날: 에너지가 조화로운 날 (행운지수 4-5, 점수 70-100)
    * 보통 날: 평범하지만 주의가 필요한 날 (행운지수 2-3, 점수 40-70)
    * 조심할 날: 신중함이 필요한 날 (행운지수 1-2, 점수 1-40)
  - 매일 다른 운세 결과를 만들되, 같은 날짜라도 다른 생년월일이면 다른 결과가 나와야 합니다.

  [작성 톤앤매너]
  - 친한 언니/오빠가 조언해주는 듯한 따뜻하고 친근한 말투
  - 구체적인 상황 예시를 들어 설명 (예: "점심때 동료와의 대화에서 좋은 기회가 생길 수 있어요")
  - 부정적인 내용도 긍정적인 해결 방법과 함께 제시
  - 추상적인 표현 대신 실생활에 바로 적용할 수 있는 조언을 제시

  응답은 반드시 JSON 형식으로만 작성하고, 마크다운 코드 블록이나 기타 설명은 절대 포함하지 마세요.
  모든 내용은 한국어로 작성해주세요.
  `.trim();

  const userPrompt = `
오늘 날짜: ${today}

사용자 기본 정보:
${profileInfo}

${sajuInfo}

[분석 요청]
1. 위에 제공된 사주 데이터를 내부적으로 분석하되, 결과에는 전문 용어를 절대 사용하지 마세요.
2. 오늘 날짜(${today})를 기준으로 사용자에게 맞는 구체적인 운세를 작성하세요.
3. 같은 날이라도 생년월일이 다르면 운세가 달라져야 합니다.

[중요] 아래 표현을 절대 사용하지 마세요:
- "목", "화", "토", "금", "수" (오행 용어)
- "상생", "상극", "오행의 균형/조화"
- "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계" (천간)
- "자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해" (지지)
- "연주", "월주", "일주", "시주"
- "십신", "비견", "겁재" 등 모든 사주 전문 용어

대신 이렇게 표현하세요:
- "오늘은 새로운 도전이 잘 풀리는 날이에요"
- "사람들과의 관계에서 따뜻한 에너지가 느껴지는 하루예요"
- "오후에 예상치 못한 좋은 소식이 찾아올 수 있어요"

응답은 반드시 아래 JSON 형식으로만 작성해주세요:

{
  "todayDate": "${today}",
  "fortuneTitle": "친근하고 공감 가는 운세 제목 (20자 이내, 예: '작은 행운이 찾아오는 하루')",
  "fortuneContent": "오늘의 운세 (200-300자, 전문 용어 없이 일상적인 언어로 작성. 구체적인 상황 예시와 실용적인 조언 포함. 마치 친한 친구가 조언해주듯 따뜻하게 작성)",
  "luckIndex": "행운 지수 (1-5 사이 숫자)",
  "luckInfo": {
    "score": "행운 점수 (1-100 사이 숫자)",
    "color": "오늘의 행운 색상 (컬러코드, 예: #FF6B6B)",
    "number": "오늘의 행운 숫자",
    "food": "오늘의 행운 음식 (10자 이내)"
  },
  "twelveStars": {
    "type": "12운성 중 하나 (예: 장생, 목욕, 관대, 제왕, 쇠, 병, 사, 묘, 절, 태, 양, 건록)",
    "description": "쉽고 친근한 오늘의 조언 (200자 이내, 전문 용어 없이 일상 언어로)"
  },
  "twelveSinsal": {
    "type": "12신살 중 하나 (예: 천을귀인, 천덕귀인, 문창귀인, 화개살, 홍염살, 백호살, 현침살, 도화살, 역마살, 액살, 재살, 망신살, 고독살, 혈겁살, 공망, 월살, 천살, 귀문관살)",
    "description": "쉽고 친근한 오늘의 조언 또는 주의사항 (200자 이내, 전문 용어 없이 일상 언어로)"
  },
  "advice": {
    "love": "연애운 한 줄 조언 (15자 이내, 전문 용어 금지)",
    "work": "직장/사업운 한 줄 조언 (15자 이내, 전문 용어 금지)",
    "health": "건강운 한 줄 조언 (15자 이내, 전문 용어 금지)",
    "money": "금전운 한 줄 조언 (15자 이내, 전문 용어 금지)"
  }
}
  `.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    store: false,
  });

  // JSON 문자열을 파싱해서 반환 (null 체크 추가)
  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("OpenAI API 응답이 비어있습니다.");
  }

  const fortuneResult: FortuneResult = JSON.parse(content);
  return fortuneResult;
}
