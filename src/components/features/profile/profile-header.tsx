import { CloverIcon } from "@/components/common/CloverIcon";

interface ProfileHeaderProps {
  title: string;
  description?: string;
}

const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex justify-center gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={{ animationDelay: `${i * 0.3}s` }}>
            <CloverIcon size="sm" animated />
          </div>
        ))}
      </div>
      <h1 className="text-foreground mb-2 text-center text-2xl font-bold break-keep">
        <span className="text-gradient">{title}</span>
      </h1>
      {description && <p className="mb-4 text-sm text-yellow-300">{description}</p>}
    </div>
  );
};

export default ProfileHeader;
