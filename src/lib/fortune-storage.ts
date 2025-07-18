"use client";

import { FortuneCacheData, FortuneResult } from "@/types/FortuneType";

const FORTUNE_STORAGE_KEY = "fortune-cache";

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환합니다.
 */
function getTodayDate(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
}

/**
 * 로컬스토리지에서 운세 캐시 데이터를 조회합니다.
 */
export function getFortuneFromStorage(): FortuneCacheData | null {
  try {
    if (typeof window === "undefined") {
      return null; // 서버 사이드에서는 null 반환
    }

    const cached = localStorage.getItem(FORTUNE_STORAGE_KEY);
    if (!cached) {
      return null;
    }

    const data = JSON.parse(cached) as FortuneCacheData;
    return data;
  } catch (error) {
    console.error("운세 데이터 읽기 오류:", error);
    // 손상된 데이터 삭제
    clearFortuneFromStorage();
    return null;
  }
}

/**
 * 로컬스토리지에 운세 캐시 데이터를 저장합니다.
 */
export function saveFortuneToStorage(fortune: FortuneResult): void {
  try {
    if (typeof window === "undefined") {
      return; // 서버 사이드에서는 아무것도 하지 않음
    }

    const cacheData: FortuneCacheData = {
      cacheDate: getTodayDate(),
      fortune,
    };

    localStorage.setItem(FORTUNE_STORAGE_KEY, JSON.stringify(cacheData));
    console.log("운세 데이터를 저장했습니다:", cacheData.cacheDate);
  } catch (error) {
    console.error("운세 데이터 저장 오류:", error);
    // 저장 실패해도 에러를 던지지 않음
  }
}

/**
 * 로컬스토리지에서 운세 캐시 데이터를 삭제합니다.
 */
export function clearFortuneFromStorage(): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(FORTUNE_STORAGE_KEY);
    console.log("운세 캐시를 삭제했습니다.");
  } catch (error) {
    console.error("운세 캐시 삭제 오류:", error);
  }
}

/**
 * 캐시된 운세 데이터가 오늘 날짜와 일치하는지 확인합니다.
 */
export function isValidFortuneCache(): boolean {
  const cached = getFortuneFromStorage();
  if (!cached) {
    return false;
  }

  const today = getTodayDate();
  return cached.cacheDate === today;
}

/**
 * 유효한 캐시된 운세가 있으면 반환하고, 없으면 null을 반환합니다.
 */
export function getValidCachedFortune(): FortuneResult | null {
  if (!isValidFortuneCache()) {
    return null;
  }

  const cached = getFortuneFromStorage();
  return cached?.fortune || null;
}
