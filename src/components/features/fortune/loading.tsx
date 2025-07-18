"use client";

import { CloverIcon } from "@/components/common/CloverIcon";
import { useEffect, useState } from "react";

const FortuneLoading = () => {
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    // 11초 후에 완료 애니메이션 준비
    const timer = setTimeout(() => {
      setIsCompleting(true);
    }, 11000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-auto flex flex-col items-center justify-center p-6">
      {/* 애니메이션 클로버 아이콘들 */}
      <div className="mb-4 flex justify-center gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={{ animationDelay: `${i * 0.3}s` }}>
            <CloverIcon size="sm" animated />
          </div>
        ))}
      </div>

      {/* 메인 메시지 */}
      <h1 className="text-foreground mb-2 text-center text-2xl font-bold break-keep">
        <span className="text-gradient">운세를 불러오고 있어요</span>
      </h1>
      <p className="mb-4 text-sm text-yellow-300">당신만의 특별한 운세를 준비하고 있습니다.</p>

      {/* 로딩 바 */}
      <div className="w-full max-w-xs">
        <div className="h-2 overflow-hidden rounded-full bg-green-100">
          <div
            className={`h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 ${
              isCompleting
                ? "w-full animate-[loadingComplete_1s_ease-out_forwards]"
                : "w-0 animate-[loading_12s_ease-out_forwards]"
            }`}
          />
        </div>
      </div>

      {/* 로딩 텍스트 애니메이션 */}
      <div className="mt-4 text-sm text-green-600">
        <span className="animate-pulse">
          {isCompleting ? "✨ 거의 완료되었어요" : "✨ 운세 데이터 분석 중"}
        </span>
      </div>
    </div>
  );
};

export default FortuneLoading;
