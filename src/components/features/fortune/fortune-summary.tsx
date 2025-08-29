import { FortuneResult } from "@/types/FortuneType";

interface FortuneSummaryProps {
  fortune: Pick<FortuneResult, "todayDate" | "fortuneTitle" | "fortuneContent">;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

const FortuneSummary = ({ fortune }: FortuneSummaryProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs text-yellow-300">{formatDate(fortune.todayDate)}</p>
      <h1 className="text-foreground my-2 text-center text-xl font-bold break-keep">
        {fortune.fortuneTitle}
      </h1>
      <p className="p-2 text-center text-sm leading-relaxed break-keep text-[#1A3C2C]">
        {fortune.fortuneContent}
      </p>
    </div>
  );
};

export default FortuneSummary;
