"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveProfileName } from "@/lib/profile-actions";

interface FormState {
  error?: string;
}

export function ProfileNameForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      try {
        await saveProfileName(formData);
        return { error: undefined };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "오류가 발생했습니다",
        };
      }
    },
    { error: undefined },
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          className="w-full px-4 py-6 rounded-xl bg-white border border-white/20 text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          disabled={pending}
          required
        />
        {state.error && <p className="text-red-300 text-sm mt-2">{state.error}</p>}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 py-3 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:border-shadow-gold hover:shadow-lg"
      >
        {pending ? "저장 중..." : "다음"}
      </Button>
    </form>
  );
}
