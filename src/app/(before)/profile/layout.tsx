export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm min-h-screen justify-between py-25">
      {children}
    </div>
  );
}
