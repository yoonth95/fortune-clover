import { NextRequest, NextResponse } from "next/server";
import { generateDailyFortune } from "@/lib/fortune-service";
import { PartialProfileDataType } from "@/types/ProfileType";

export async function POST(request: NextRequest) {
  try {
    const profile: PartialProfileDataType = await request.json();

    // 프로필 데이터 유효성 검사
    if (!profile.name || !profile.gender || !profile.birthDate || !profile.calendarType) {
      return NextResponse.json({ error: "필수 프로필 정보가 누락되었습니다." }, { status: 400 });
    }

    // 운세 생성 (기존 쿠키 캐싱 로직 제거 - 클라이언트에서 로컬스토리지로 처리)
    const fortune = await generateDailyFortune(profile);

    return NextResponse.json({ fortune });
  } catch (error) {
    console.error("운세 생성 API 오류:", error);
    return NextResponse.json({ error: "운세 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
