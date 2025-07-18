"use client";

import { Suspense, useEffect, useState } from "react";
import { FortuneLoading, FortuneContent } from "@/components/features/fortune";
import { PartialProfileDataType } from "@/types/ProfileType";
import { useRouter } from "next/navigation";

// 쿠키에서 특정 값을 안전하게 파싱하는 헬퍼 함수
function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

// 안전한 JSON 파싱 함수 (이중 디코딩 지원)
function safeParseProfileCookie(cookieValue: string): PartialProfileDataType | null {
  try {
    // 첫 번째 시도: 직접 파싱
    return JSON.parse(cookieValue);
  } catch (error) {
    try {
      // 두 번째 시도: 한 번 디코딩 후 파싱
      const decoded = decodeURIComponent(cookieValue);
      return JSON.parse(decoded);
    } catch (error) {
      try {
        // 세 번째 시도: 두 번 디코딩 후 파싱 (이중 인코딩된 경우)
        const doubleDecoded = decodeURIComponent(decodeURIComponent(cookieValue));
        return JSON.parse(doubleDecoded);
      } catch (error) {
        console.error("프로필 쿠키 파싱 실패:", error);
        return null;
      }
    }
  }
}

export default function FortunePage() {
  const [profile, setProfile] = useState<PartialProfileDataType | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  // 프로필 정보를 클라이언트에서 가져오기
  useEffect(() => {
    const getProfile = () => {
      try {
        const profileCookieValue = getCookieValue("profile-info");

        if (!profileCookieValue) {
          router.push("/");
          return;
        }

        const profileData = safeParseProfileCookie(profileCookieValue);

        if (!profileData) {
          console.error("프로필 데이터 파싱 실패");
          router.push("/");
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error("프로필 정보 파싱 오류:", error);
        router.push("/");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    getProfile();
  }, [router]);

  // 프로필 수정 후 운세 새로고침 함수
  const handleProfileUpdate = () => {
    // 프로필 정보 다시 읽기
    try {
      const profileCookieValue = getCookieValue("profile-info");

      if (profileCookieValue) {
        const profileData = safeParseProfileCookie(profileCookieValue);
        if (profileData) {
          setProfile(profileData);
        }
      }
    } catch (error) {
      console.error("프로필 정보 업데이트 오류:", error);
    }

    // FortuneContent 강제 리마운트로 새로운 운세 생성
    setRefreshKey((prev) => prev + 1);
  };

  if (isLoadingProfile) {
    return <FortuneLoading />;
  }

  if (!profile) {
    return null; // 리다이렉트 중
  }

  return (
    <Suspense fallback={<FortuneLoading />}>
      <FortuneContent key={refreshKey} profile={profile} onProfileUpdate={handleProfileUpdate} />
    </Suspense>
  );
}
