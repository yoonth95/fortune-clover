import { FortuneResult } from "@/types/FortuneType";
import { FortuneSummary, LuckIndexCard, DetailedFortuneCard, AdviceCard, ProfileSetting } from "./";
import { PartialProfileDataType } from "@/types";

interface FortuneResultProps {
  fortune: FortuneResult;
  profile: PartialProfileDataType;
  onProfileUpdate?: () => void;
}

const FortuneResultComponent = ({ fortune, profile, onProfileUpdate }: FortuneResultProps) => {
  const userName = profile.name;

  return (
    <div className="relative mx-auto flex min-h-screen max-w-sm flex-col gap-4">
      <div className="absolute top-[-40px] right-0">
        <ProfileSetting profile={profile} onProfileUpdate={onProfileUpdate} />
      </div>
      <FortuneSummary
        fortune={{
          todayDate: fortune.todayDate,
          fortuneTitle: fortune.fortuneTitle,
          fortuneContent: fortune.fortuneContent,
        }}
      />
      <LuckIndexCard
        luckInfo={fortune.luckInfo}
        luckIndex={fortune.luckIndex}
        userName={userName}
      />
      <DetailedFortuneCard
        title="12운성"
        code="stars"
        type={fortune.twelveStars.type}
        description={fortune.twelveStars.description}
      />
      <DetailedFortuneCard
        title="12신살"
        code="sinsal"
        type={fortune.twelveSinsal.type}
        description={fortune.twelveSinsal.description}
      />
      <AdviceCard advice={fortune.advice} />
    </div>
  );
};

export default FortuneResultComponent;
