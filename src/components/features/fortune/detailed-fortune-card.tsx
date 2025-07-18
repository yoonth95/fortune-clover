import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 12운성 전체 매핑
const twelveStarsColor: Record<string, string> = {
  장생: "bg-green-100 text-green-800",
  목욕: "bg-teal-100 text-teal-800",
  관대: "bg-blue-100 text-blue-800",
  제왕: "bg-purple-100 text-purple-800",
  쇠: "bg-yellow-100 text-yellow-800",
  병: "bg-orange-100 text-orange-800",
  사: "bg-red-100 text-red-800",
  묘: "bg-pink-100 text-pink-800",
  절: "bg-gray-100 text-gray-800",
  태: "bg-indigo-100 text-indigo-800",
  양: "bg-lime-100 text-lime-800",
  건록: "bg-emerald-100 text-emerald-800",
};

// 12신살 전체 매핑
const twelveSinsalColor: Record<string, string> = {
  천을귀인: "bg-green-50  text-green-700",
  천덕귀인: "bg-blue-50   text-blue-700",
  문창귀인: "bg-purple-50 text-purple-700",
  화개살: "bg-red-50    text-red-700",
  홍염살: "bg-orange-50 text-orange-700",
  백호살: "bg-gray-50   text-gray-700",
  현침살: "bg-pink-50   text-pink-700",
  도화살: "bg-rose-50   text-rose-700",
  역마살: "bg-lime-50   text-lime-700",
  액살: "bg-amber-50  text-amber-700",
  재살: "bg-cyan-50   text-cyan-700",
  망신살: "bg-fuchsia-50 text-fuchsia-700",
  고독살: "bg-stone-50  text-stone-700",
  혈겁살: "bg-red-50    text-red-700",
  공망: "bg-gray-50   text-gray-700",
  월살: "bg-sky-50    text-sky-700",
  천살: "bg-violet-50 text-violet-700",
  귀문관살: "bg-indigo-50 text-indigo-700",
};

interface DetailedFortuneCardProps {
  title: string;
  code: string;
  type: string;
  description: string;
}

const DetailedFortuneCard = ({ title, code, type, description }: DetailedFortuneCardProps) => {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex h-6 items-center gap-2">
        <h2 className="text-sm font-bold text-[#1A3C2C]">{title}</h2>
        <Badge
          className={`text-xs ${
            (code === "stars" ? twelveStarsColor[type] : twelveSinsalColor[type]) ??
            "bg-gray-100 text-gray-800"
          }`}
        >
          {type}
        </Badge>
      </div>
      <p className="text-sm leading-relaxed break-keep text-[#2C6243]">{description}</p>
    </Card>
  );
};

export default DetailedFortuneCard;
