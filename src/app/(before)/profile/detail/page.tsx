"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfileDetailPage() {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 쿠키에서 이름 정보 가져오기
    const existingData = document.cookie
      .split("; ")
      .find((row) => row.startsWith("profile-info="))
      ?.split("=")[1];

    try {
      const profileData = existingData ? JSON.parse(decodeURIComponent(existingData)) : {};
      setUserName(profileData.name || "");
    } catch {
      setUserName("");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || !gender) return;

    setIsLoading(true);

    try {
      // 기존 쿠키 데이터 가져오기
      const existingData = document.cookie
        .split("; ")
        .find((row) => row.startsWith("profile-info="))
        ?.split("=")[1];

      let profileData = {};
      try {
        profileData = existingData ? JSON.parse(decodeURIComponent(existingData)) : {};
      } catch {
        profileData = {};
      }

      // 상세 정보 추가
      const updatedData = {
        ...profileData,
        detail: {
          birthDate,
          gender,
          timestamp: new Date().toISOString(),
        },
      };

      // 쿠키에 저장
      document.cookie = `profile-info=${encodeURIComponent(
        JSON.stringify(updatedData),
      )}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일

      // fortune 페이지로 이동
      router.push("/fortune");
    } catch (error) {
      console.error("Error saving detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">추가 정보를 알려주세요</h1>
          <p className="text-white/80 text-sm sm:text-base mb-2">
            {userName && `${userName}님, `}정확한 운세를 위해 필요해요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">생년월일</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent [color-scheme:dark]"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">성별</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`px-4 py-3 rounded-xl border text-center font-medium transition-all ${
                  gender === "male"
                    ? "bg-white/30 border-white/50 text-white"
                    : "bg-white/10 border-white/30 text-white/70 hover:bg-white/20"
                }`}
                disabled={isLoading}
              >
                남성
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`px-4 py-3 rounded-xl border text-center font-medium transition-all ${
                  gender === "female"
                    ? "bg-white/30 border-white/50 text-white"
                    : "bg-white/10 border-white/30 text-white/70 hover:bg-white/20"
                }`}
                disabled={isLoading}
              >
                여성
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!birthDate || !gender || isLoading}
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 py-3 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "저장 중..." : "운세 보기"}
          </Button>
        </form>
      </div>
    </div>
  );
}
