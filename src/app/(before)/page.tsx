import Link from "next/link";
import { CloverIcon } from "@/components/common/CloverIcon";

export default function HomeRootPage() {
  return (
    <>
      {/* Main clover illustration */}
      <div className="mb-8 sm:mb-12 relative">
        <div className="w-32 h-32 sm:w-40 sm:h-40">
          <CloverIcon size="default" animated className="float" />
        </div>
      </div>

      {/* Welcome text */}
      <div className="text-center mb-8 sm:mb-12 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-relaxed">
          오늘의 행운을 찾아보세요!
        </h2>
        <p className="text-white/80 text-sm sm:text-base">
          행운과 희망이 가득한 하루를 만들어보세요.
        </p>
      </div>

      <Link
        href="/profile/name"
        className="bg-gray-900 hover:bg-gray-800 text-white px-8 sm:px-12 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg w-full max-w-xs flex items-center justify-center"
      >
        시작하기
      </Link>
    </>
  );
}
