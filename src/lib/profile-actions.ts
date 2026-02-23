"use server";

import { ProfileNameSchema, ProfileDetailSchema, ProfileSchema } from "@/types/ProfileType";
import { updateUserName, updateUserDetail, updateUserProfile } from "./cookie-utils";

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
    // 이름 정보를 쿠키에 저장
    await updateUserName(name);
  } catch (error) {
    console.error("Error saving name:", error);
    throw new Error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}

/**
 * 사용자 상세 정보를 업데이트하고 결과를 반환합니다. (페이지 새로고침용)
 */
export async function updateProfileDetail(data: unknown): Promise<{
  success: boolean;
  error?: string;
}> {
  const validationResult = ProfileDetailSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.flatten().fieldErrors.toString() };
  }

  try {
    await updateUserDetail(validationResult.data);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

/**
 * 상세 정보를 프로필 정보에 저장하고 다음 단계로 리다이렉트합니다.
 */
export async function saveProfileDetail(formData: FormData) {
  const rawData = {
    gender: formData.get("gender") as string,
    calendarType: formData.get("calendarType") as string,
    birthDate: formData.get("birthDate") as string,
    birthHour: formData.get("birthHour") as string,
  };

  // Zod 검증
  const validationResult = ProfileDetailSchema.safeParse(rawData);

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message);
  }

  const detailData = validationResult.data;

  try {
    // 상세 정보를 쿠키에 저장
    await updateUserDetail(detailData);
  } catch (error) {
    console.error("Error saving detail:", error);
    throw new Error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}

/**
 * 프로필 정보 전체 업데이트
 */
export async function updateProfile(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    gender: formData.get("gender") as string,
    calendarType: formData.get("calendarType") as string,
    birthDate: formData.get("birthDate") as string,
    birthHour: formData.get("birthHour") as string,
  };

  const validationResult = ProfileSchema.safeParse(rawData);

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    throw new Error(firstError.message);
  }

  const profileData = validationResult.data;

  try {
    await updateUserProfile(profileData);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("프로필 정보 업데이트 중 오류가 발생했습니다.");
  }
}
