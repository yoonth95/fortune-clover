"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PartialProfileDataType, ProfileNameSchema } from "@/types/ProfileType";

/**
 * 프로필 정보를 쿠키에서 조회합니다.
 */
export async function getProfileData(): Promise<PartialProfileDataType | null> {
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get("profile-info");

  if (!profileCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(profileCookie.value)) as PartialProfileDataType;
  } catch {
    return null;
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
    const updatedData: PartialProfileDataType = {
      ...existingData,
      name: name.trim(),
    };

    // 쿠키에 저장
    const cookieStore = await cookies();
    cookieStore.set("profile-info", encodeURIComponent(JSON.stringify(updatedData)), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30일
      httpOnly: false, // 클라이언트에서도 접근 가능하도록
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Error saving name:", error);
    throw new Error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
  }

  // 성공적으로 저장된 후 리다이렉트
  redirect("/profile/detail");
}
