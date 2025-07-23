import OpenAI from "openai";
import { PartialProfileDataType } from "@/types/ProfileType";
import { FortuneResult } from "@/types/FortuneType";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDailyFortune(
  profile: PartialProfileDataType,
): Promise<FortuneResult> {
  console.log("새로운 운세 데이터를 생성합니다...");

  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }); // YYYY-MM-DD

  const profileInfo = `
이름: ${profile.name || "미정"}
성별: ${profile.gender || "미정"}
생년월일: ${profile.birthDate || "미정"}
달력 유형: ${profile.calendarType || "미정"}
출생 시간: ${profile.unknownTime ? "모름" : `${profile.birthHour || "미정"}시 ${profile.birthMinute || "미정"}분`}
  `.trim();

  const systemPrompt = `
  당신은 전문적인 사주명리학 운세 전문가입니다.
  사용자의 생년월일, 출생 시간 등의 정보를 바탕으로 오늘의 운세를 분석해주세요.
  
  운세는 긍정적인 요소뿐 아니라 주의가 필요한 점도 함께 포함하여 균형 있게 작성해주세요.  
  추상적인 위로나 막연한 희망보다는, 사용자가 실제 하루를 계획하고 행동할 수 있도록 구체적이고 실용적인 조언을 포함해주세요.
  
  오늘의 행운 지수나 행운 점수는 항상 높게 나오지 않도록 주의하며, 실제 해석 결과에 따라 적절하게 분포되도록 해주세요.  
  운이 나쁘거나 주의가 필요한 날에는, 현실적인 경고와 함께 어떻게 대응하면 좋을지 조언도 함께 제공해주세요.
  
  응답은 반드시 JSON 형식으로만 작성하고, 마크다운 코드 블록이나 기타 설명은 절대 포함하지 마세요.  
  모든 내용은 한국어로 작성해주세요.
  `.trim();

  const userPrompt = `
오늘 날짜: ${today}

사용자 정보:
${profileInfo}

위 정보를 바탕으로 오늘의 운세를 분석해주세요. 
응답은 반드시 아래 JSON 형식으로만 작성해주세요:

{
  "todayDate": "${today}",
  "fortuneTitle": "오늘의 운세 제목 (20자 이내, 긍정적이거나 중립적인 어조)",
  "fortuneContent": "운세 상세 내용 (200-300자, 구체적이고 실용적인 조언 포함. 너무 추상적이거나 긍정적인 말만 반복하지 마세요)",
  "luckIndex": "오늘의 행운의 지수 (1-5 사이, 해석 결과에 따라 균형 있게 부여)",
  "luckInfo": {
    "score": "오늘의 행운의 점수 (1-100 사이, 해석에 따라 조정)",
    "color": "오늘의 행운의 색상 (컬러코드 예시 #000000)",
    "number": "오늘의 행운의 숫자 (1-99 사이)",
    "food": "오늘의 행운의 음식 (한글로)"
  },
  "twelveStars": {
    "type": "12운성 종류 (예: 장생, 목욕, 관대, 제왕, 쇠, 병, 사, 묘, 절, 태, 양, 건록)",
    "description": "12운성 해석에 기반한 오늘의 조언 또는 경고 (200자 이내)"
  },
  "twelveSinsal": {
    "type": "12신살 종류 (예: 천을귀인, 천덕귀인, 문창귀인, 화개살, 홍염살, 백호살, 현침살, 도화살, 역마살, 액살, 재살, 망신살, 고독살, 혈겁살, 공망, 월살, 천살, 귀문관살)",
    "description": "12신살 해석에 기반한 오늘의 조언 또는 경고 (200자 이내)"
  },
  "advice": {
    "love": "오늘 연애에 대한 조언 (15자 이내, 조심할 점이 있다면 언급)",
    "work": "오늘 직장/사업에 대한 조언 (15자 이내, 유익한 힌트 포함)",
    "health": "오늘 건강에 대한 조언 (15자 이내, 피해야 할 것 언급 가능)",
    "money": "오늘 금전에 대한 조언 (15자 이내, 주의점 언급 가능)"
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
