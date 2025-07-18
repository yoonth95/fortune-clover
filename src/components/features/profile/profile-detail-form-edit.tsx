"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormMessage, FormItem, FormControl, FormField } from "@/components/ui/form";
import { RadioSelectionDrawer, BirthDateField, BirthTimeFields, FormFooter } from ".";
import { updateProfile } from "@/lib/profile-actions";
import { ProfileDetailType, ProfileSchema, type ProfileDataType } from "@/types/ProfileType";

interface ProfileDetailFormProps {
  defaultValues?: Partial<ProfileDataType>;
  onSuccess?: () => void;
}

const ProfileDetailFormEdit = ({ defaultValues = {}, onSuccess }: ProfileDetailFormProps) => {
  const form = useForm<ProfileDataType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      gender: "",
      calendarType: "",
      birthDate: "",
      birthHour: "",
      birthMinute: "",
      unknownTime: false,
      ...defaultValues,
    },
  });

  const onSubmit = async (values: ProfileDataType) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? "");
    });
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error(error);
      // 에러 처리 (e.g., form.setError)
    } finally {
      onSuccess?.();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-grow flex-col items-center gap-3 text-[#1A3C2C]"
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
        <RadioSelectionDrawer
          name="gender"
          options={[
            { value: "male", label: "남성" },
            { value: "female", label: "여성" },
          ]}
          form={form as UseFormReturn<ProfileDetailType | ProfileDataType>}
          title="성별"
          description="정확한 운세를 위해 성별을 선택해주세요."
        />

        <div className="flex w-full gap-3">
          <div className="w-2/5">
            <RadioSelectionDrawer
              name="calendarType"
              options={[
                { value: "solar", label: "양력" },
                { value: "lunar", label: "음력" },
              ]}
              form={form as UseFormReturn<ProfileDetailType | ProfileDataType>}
              title="음력/양력"
            />
          </div>
          <div className="w-4/5">
            <BirthDateField
              form={form as UseFormReturn<ProfileDetailType | ProfileDataType>}
              buttonClass=""
            />
          </div>
        </div>

        <BirthTimeFields form={form as UseFormReturn<ProfileDetailType | ProfileDataType>} />

        <FormFooter submitText="수정하기" isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
};

export default ProfileDetailFormEdit;
