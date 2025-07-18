export default function FortuneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full max-w-sm flex-col justify-between gap-4 py-15">
      {children}
    </div>
  );
}
