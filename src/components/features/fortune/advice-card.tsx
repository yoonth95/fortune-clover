import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloverIcon } from "@/components/common/CloverIcon";
import { FortuneResult } from "@/types/FortuneType";

interface AdviceCardProps {
  advice: FortuneResult["advice"];
}

const adviceItems = [
  { key: "love", label: "❤️ 연애" },
  { key: "work", label: "💼 직장" },
  { key: "health", label: "🏥 건강" },
  { key: "money", label: "💰 금전" },
] as const;

const AdviceCard = ({ advice }: AdviceCardProps) => {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2">
        <CloverIcon size="sm" />
        <h3 className="text-sm font-bold text-[#1A3C2C]">네잎클로버의 조언</h3>
      </div>
      <div className="flex flex-col gap-3">
        {adviceItems.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <Badge variant="outline" className="h-6 shrink-0 text-xs">
              {label}
            </Badge>
            <p className="flex-1 text-sm text-[#4A7A5A]">{advice[key]}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AdviceCard;
