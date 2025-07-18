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
사용자의 개인정보를 바탕으로 오늘의 운세를 분석해주세요.
응답은 반드시 JSON 형식으로만 작성해주세요. 마크다운 코드 블록이나 다른 텍스트는 포함하지 마세요.
모든 내용은 한국어로 작성하고, 긍정적이고 건설적인 내용으로 구성해주세요.
  `.trim();

  const userPrompt = `
오늘 날짜: ${today}

사용자 정보:
${profileInfo}

위 정보를 바탕으로 오늘의 운세를 분석해주세요. 
응답은 반드시 아래 JSON 형식으로만 작성해주세요:

{
  "todayDate": "${today}",
  "fortuneTitle": "오늘의 운세 제목 (20자 이내, 긍정적이고 희망적으로)",
  "fortuneContent": "운세 상세 내용 (200-300자, 구체적이고 실용적인 조언 포함)",
  "luckIndex": 숫자 (1-5 사이),
  "luckInfo": {
    "score": 숫자 (1-100 사이),
    "color": "오늘의 행운의 색상 (컬러코드 예시 #000000)",
    "number": 숫자 (1-99 사이),
    "food": "오늘의 행운의 음식 (한글로)"
  },
  "twelveStars": {
    "type": "12운성 종류 (예: 장생, 목욕, 관대, 제왕, 쇠, 병, 사, 묘, 절, 태, 양, 건록)",
    "description": "12운성 설명 (200자 이내)"
  },
  "twelveSinsal": {
    "type": "12신살 종류 (예: 화개살, 홍염살, 백호살, 현침살, 천을귀인, 천덕귀인, 문창귀인 등)",
    "description": "12신살 설명 (200자 이내)"
  },
  "advice": {
    "love": "오늘 연애에 대한 조언 (20자 이내)",
    "work": "오늘 직장/사업에 대한 조언 (20자 이내)",
    "health": "오늘 건강에 대한 조언 (20자 이내)",
    "money": "오늘 금전에 대한 조언 (20자 이내)"
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
