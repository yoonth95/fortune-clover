"use server";

import { cookies } from "next/headers";
import { PartialProfileDataType, ProfileDetailType } from "@/types/ProfileType";

/**
 * 쿠키 설정 상수
 */
const COOKIE_CONFIG = {
  name: "profile-info",
  options: {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30일
    httpOnly: false, // 클라이언트에서도 접근 가능하도록
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  },
} as const;

/**
 * 프로필 정보를 쿠키에서 조회합니다.
 */
export async function getUserProfile(): Promise<PartialProfileDataType | null> {
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get(COOKIE_CONFIG.name);

  if (!profileCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(profileCookie.value)) as PartialProfileDataType;
  } catch (error) {
    console.error("Error parsing profile cookie:", error);
    return null;
  }
}

/**
 * 프로필 정보를 쿠키에 저장합니다.
 */
export async function setUserProfile(profileData: PartialProfileDataType): Promise<void> {
  try {
    const cookieStore = await cookies();
    const encodedData = encodeURIComponent(JSON.stringify(profileData));

    cookieStore.set(COOKIE_CONFIG.name, encodedData, COOKIE_CONFIG.options);
  } catch (error) {
    console.error("Error setting profile cookie:", error);
    throw new Error("프로필 정보 저장 중 오류가 발생했습니다.");
  }
}

/**
 * 기존 프로필 정보를 업데이트합니다. (병합)
 */
export async function updateUserProfile(
  updates: PartialProfileDataType,
): Promise<PartialProfileDataType> {
  try {
    const existingData = await getUserProfile();
    const updatedData: PartialProfileDataType = {
      ...existingData,
      ...updates,
    };

    await setUserProfile(updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("프로필 정보 업데이트 중 오류가 발생했습니다.");
  }
}

/**
 * 사용자 이름만 업데이트합니다.
 */
export async function updateUserName(name: string): Promise<PartialProfileDataType> {
  return await updateUserProfile({ name: name.trim() });
}

/**
 * 사용자 상세 정보만 업데이트합니다.
 */
export async function updateUserDetail(detail: ProfileDetailType): Promise<PartialProfileDataType> {
  return await updateUserProfile(detail);
}

/**
 * 프로필 정보를 쿠키에서 삭제합니다.
 */
export async function clearUserProfile(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_CONFIG.name);
  } catch (error) {
    console.error("Error clearing profile cookie:", error);
    throw new Error("프로필 정보 삭제 중 오류가 발생했습니다.");
  }
}
