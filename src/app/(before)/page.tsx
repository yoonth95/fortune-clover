import Link from "next/link";
import { CloverIcon } from "@/components/common/CloverIcon";

export default function HomeRootPage() {
  return (
    <>
      {/* Main clover illustration */}
      <div className="relative mb-8 sm:mb-12">
        <div className="h-32 w-32 sm:h-40 sm:w-40">
          <CloverIcon size="default" animated className="float" />
        </div>
      </div>

      {/* Welcome text */}
      <div className="mb-8 px-2 text-center sm:mb-12">
        <h2 className="mb-3 text-xl leading-relaxed font-bold text-white sm:mb-4 sm:text-2xl">
          오늘의 행운을 찾아보세요!
        </h2>
        <p className="text-sm text-white/80 sm:text-base">
          행운과 희망이 가득한 하루를 만들어보세요.
        </p>
      </div>

      <Link
        href="/profile/name"
        className="flex w-full items-center justify-center rounded-md bg-[#34A853] px-6 py-2 text-base font-semibold text-white hover:bg-[#2f974a]"
      >
        시작하기
      </Link>
    </>
  );
}
