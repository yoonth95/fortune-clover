import { Card } from "@/components/ui/card";
import { CloverIcon } from "@/components/common/CloverIcon";
import { FortuneResult } from "@/types/FortuneType";

interface LuckIndexCardProps {
  luckInfo: FortuneResult["luckInfo"];
  luckIndex: FortuneResult["luckIndex"];
  userName?: string;
}

const renderLuckClovers = (index: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <div key={i}>
      <CloverIcon size="md" color={i < index ? "#4ADE80" : "#D1D5DB"} />
    </div>
  ));
};

const LuckIndexCard = ({ luckInfo, luckIndex, userName }: LuckIndexCardProps) => {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="text-center">
        <h2 className="text-lg font-bold text-[#1A3C2C]">
          {userName ? `${userName}님의 ` : ""}행운 지수
        </h2>
        <div className="my-4 flex items-center justify-center gap-2">
          {renderLuckClovers(luckIndex)}
        </div>
      </div>
      <div className="mb-4 border-t border-gray-200"></div>
      <div className="grid grid-cols-4 text-center">
        <div className="flex h-15 flex-col items-center justify-start">
          <p className="mb-2 text-xs text-[#4A7A5A]">점수</p>
          <p className="text-sm font-bold text-[#1A3C2C]">{luckInfo.score}</p>
        </div>
        <div className="flex h-15 flex-col items-center justify-start">
          <p className="mb-2.5 text-xs text-[#4A7A5A]">색상</p>
          <div
            className="h-4 w-4 rounded-full border"
            style={{ backgroundColor: luckInfo.color }}
          />
        </div>
        <div className="flex h-15 flex-col items-center justify-start">
          <p className="mb-2 text-xs text-[#4A7A5A]">숫자</p>
          <p className="text-sm font-bold text-[#1A3C2C]">{luckInfo.number}</p>
        </div>
        <div className="flex h-15 flex-col items-center justify-start">
          <p className="mb-2 text-xs text-[#4A7A5A]">음식</p>
          <p className="text-sm leading-tight font-medium break-keep text-[#1A3C2C]">
            {luckInfo.food}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LuckIndexCard;
