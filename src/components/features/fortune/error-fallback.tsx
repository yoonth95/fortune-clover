"use client";

import { CloverIcon } from "@/components/common/CloverIcon";

interface ErrorFallbackProps {
  error?: string;
  onRetry?: () => void;
}

const ErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* 에러 아이콘 */}
      <div className="mb-8 flex justify-center gap-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={{ animationDelay: `${i * 0.3}s` }}>
            <CloverIcon size="lg" />
          </div>
        ))}
      </div>

      {/* 에러 메시지 */}
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">
          <span className="text-gradient">잠시 문제가 발생했어요</span>
        </h1>
        <p className="mb-6 text-lg text-yellow-300">
          {error?.includes("overloaded")
            ? "운세 서버가 바쁜 상태입니다. 잠시 후 다시 시도해주세요."
            : "운세를 불러오는 중 문제가 발생했습니다."}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600"
          >
            다시 시도하기
          </button>
        )}
      </div>

      {/* 안내 텍스트 */}
      <div className="mt-8 text-center text-sm text-green-600">
        <p>💡 잠시 후 자동으로 기본 운세를 표시해드릴게요</p>
      </div>
    </div>
  );
};

export default ErrorFallback;
