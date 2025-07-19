"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { saveProfileName } from "@/lib/profile-actions";
import { ProfileNameSchema, type ProfileNameType } from "@/types/ProfileType";

const ProfileNameForm = () => {
  const form = useForm<ProfileNameType>({
    resolver: zodResolver(ProfileNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: ProfileNameType) => {
    const formData = new FormData();
    formData.append("name", values.name);
    try {
      await saveProfileName(formData);
    } catch (error) {
      // redirect로 인한 에러는 무시 (정상적인 리다이렉트)
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        return;
      }
      form.setError("name", {
        type: "manual",
        message: error instanceof Error ? error.message : "오류가 발생했습니다",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-grow flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormControl>
                <Input
                  placeholder="이름 또는 닉네임을 입력해주세요."
                  className="w-full rounded-md border border-[#BEE3C2] bg-[#F0FAF4] px-4 py-3 text-center text-sm text-[#1A3C2C] placeholder-[#7AAE90] disabled:opacity-50"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-yellow-300">
                {form.formState.errors.name?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-auto w-full rounded-md bg-[#34A853] px-6 py-5 text-base font-semibold text-white hover:bg-[#2f974a]"
        >
          {form.formState.isSubmitting ? "저장 중..." : "다음"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileNameForm;
