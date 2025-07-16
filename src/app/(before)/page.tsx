import Link from "next/link";
import { Sun, Heart, Sparkles, Star } from "lucide-react";
import { CloverIcon } from "@/components/common/CloverIcon";

export default function HomeRootPage() {
  return (
    <>
      {/* Decorative elements */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 animate-float">
        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
      </div>
      <div
        className="absolute top-24 sm:top-32 right-8 sm:right-16 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300" />
      </div>
      <div
        className="absolute bottom-32 sm:bottom-40 left-4 sm:left-8 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300" />
      </div>

      <div
        className="absolute bottom-32 sm:bottom-25 right-10 sm:right-16 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Sun className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
      </div>

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
