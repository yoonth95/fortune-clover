"use client";

import { useEffect, useRef, useState } from "react";
import FortuneResult from "./fortune-result";
import FortuneLoading from "./loading";
import ErrorFallback from "./error-fallback";
import { PartialProfileDataType } from "@/types/ProfileType";
import { FortuneResult as FortuneResultType } from "@/types/FortuneType";
import {
  getValidCachedFortune,
  saveFortuneToStorage,
  clearFortuneFromStorage,
} from "@/lib/fortune-storage";

interface FortuneContentProps {
  profile: PartialProfileDataType;
  onProfileUpdate?: () => void;
}

const FortuneContent = ({ profile, onProfileUpdate }: FortuneContentProps) => {
  const [fortune, setFortune] = useState<FortuneResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  // 객체 참조 변경에 의한 불필요한 재실행 방지용 안정적 키
  const profileKey = JSON.stringify(profile);

  useEffect(() => {
    // Strict Mode 등으로 인한 중복 호출 방지
    if (fetchedRef.current) return;

    const fetchFortune = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. 먼저 로컬스토리지에서 유효한 캐시 확인
        const cachedFortune = getValidCachedFortune();
        if (cachedFortune) {
          console.log("캐시된 운세 데이터를 사용합니다:", cachedFortune.todayDate);
          setFortune(cachedFortune);
          setIsLoading(false);
          return;
        }

        fetchedRef.current = true;
        console.log("새로운 운세 데이터를 요청합니다...");

        // 2. 캐시가 없거나 유효하지 않으면 API 호출
        const response = await fetch("/api/fortune", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "운세 생성에 실패했습니다.");
        }

        const data = await response.json();
        const fortuneData = data.fortune as FortuneResultType;

        // 3. 새로운 운세 데이터를 로컬스토리지에 저장
        saveFortuneToStorage(fortuneData);

        setFortune(fortuneData);
      } catch (err) {
        console.error("운세 생성 오류:", err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
        fetchedRef.current = false; // 에러 시 재시도 가능하도록 리셋

        // 에러 발생시 캐시 삭제 (손상된 데이터일 수 있음)
        clearFortuneFromStorage();
      } finally {
        setIsLoading(false);
      }
    };

    if (profile) {
      fetchFortune();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileKey]);

  if (isLoading) {
    return <FortuneLoading />;
  }

  if (error) {
    return <ErrorFallback error={error} onRetry={() => window.location.reload()} />;
  }

  if (!fortune) {
    return (
      <ErrorFallback
        error="운세 데이터를 불러올 수 없습니다."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <FortuneResult fortune={fortune} profile={profile} onProfileUpdate={onProfileUpdate} />;
};

export default FortuneContent;
