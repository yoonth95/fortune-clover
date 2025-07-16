"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveProfileName } from "@/lib/profile-actions";
import { cn } from "@/lib/utils";

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
    <form action={formAction} className="flex flex-col flex-grow gap-4 items-center w-full">
      <div className="space-y-2 w-full max-w-xs">
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="이름 또는 닉네임을 입력해주세요."
          className={cn(
            "w-full px-3 py-5 rounded-md bg-white border text-sm border-white/20 text-black text-center placeholder-white/60 transition-all",
          )}
          disabled={pending}
          required
        />
        {state.error && <p className="text-yellow-300 text-xs mt-2">{state.error}</p>}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="mt-auto bg-gray-900 hover:bg-gray-800 text-white h-10 px-8 sm:px-12 py-2 sm:py-3 rounded-md text-base sm:text-lg font-semibold shadow-lg w-full max-w-xs flex items-center justify-center"
      >
        {pending ? "저장 중..." : "다음"}
      </Button>
    </form>
  );
}
