"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProfileNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요" })
    .min(2, { message: "이름은 최소 2글자 이상이어야 합니다" })
    .max(20, { message: "이름은 20글자를 초과할 수 없습니다" })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: "이름은 한글, 영문, 공백만 사용할 수 있습니다",
    }),
});

export interface ProfileData {
  name?: string;
  birthDate?: string;
  [key: string]: any;
}

/**
 * 프로필 정보를 쿠키에서 조회합니다.
 */
export async function getProfileData(): Promise<ProfileData> {
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get("profile-info");

  if (!profileCookie?.value) {
    return {};
  }

  try {
    return JSON.parse(decodeURIComponent(profileCookie.value)) as ProfileData;
  } catch {
    return {};
  }
}

/**
 * 이름을 프로필 정보에 저장하고 다음 단계로 리다이렉트합니다.
 */
export async function saveProfileName(formData: FormData) {
  const rawName = formData.get("name") as string;

  // Zod 검증
  const validationResult = ProfileNameSchema.safeParse({ name: rawName });

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message);
  }

  const { name } = validationResult.data;

  try {
    // 기존 프로필 데이터 가져오기
    const existingData = await getProfileData();

    // 이름 정보 추가
    const updatedData: ProfileData = {
      ...existingData,
      name: name.trim(),
    };

    // 쿠키에 저장
    const cookieStore = await cookies();
    cookieStore.set("profile-info", encodeURIComponent(JSON.stringify(updatedData)), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일
      httpOnly: false, // 클라이언트에서도 접근 가능하도록
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // 다음 단계로 리다이렉트
    redirect("/profile/detail");
  } catch (error) {
    console.error("Error saving name:", error);
    throw new Error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}
