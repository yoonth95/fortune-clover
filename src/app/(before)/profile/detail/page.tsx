import { ProfileHeader, ProfileDetailForm } from "@/components/features/profile";
import { getUserProfile } from "@/lib/cookie-utils";

export default async function ProfileDetailPage() {
  const userProfile = await getUserProfile();

  return (
    <>
      <ProfileHeader
        title={`${userProfile?.name}님, 조금 더 알려주세요!`}
        description="특별한 운세를 만들어드려요"
      />

      <ProfileDetailForm defaultValues={userProfile ?? {}} />
    </>
  );
}
