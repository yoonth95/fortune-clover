import { CloverIcon } from "@/components/common/CloverIcon";
import { ProfileNameForm } from "@/components/features/profile/profile-name-form";

export default function ProfileNamePage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={{ animationDelay: `${i * 0.3}s` }}>
              <CloverIcon size="sm" animated />
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          <span className="text-gradient">어떻게 불러드릴까요?</span>
        </h1>
      </div>
      <ProfileNameForm />
    </>
  );
}
