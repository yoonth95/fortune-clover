import { CloverIcon } from "@/components/common/CloverIcon";
import { ProfileNameForm } from "@/components/profile-name-form";

export default function ProfileNamePage() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="flex justify-center space-x-2 mb-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={{ animationDelay: `${i * 0.3}s` }}>
              <CloverIcon size="sm" animated className="float" />
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          <span className="text-gradient">어떻게 불러드릴까요?</span>
        </h1>
      </div>
      {/* Profile Name Form */}
      <ProfileNameForm />
    </>
  );
}
