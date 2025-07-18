"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RadioSelectionDrawer, BirthDateField, BirthTimeFields, FormFooter } from ".";
import { saveProfileDetail } from "@/lib/profile-actions";
import { ProfileDetailSchema, type ProfileDetailType } from "@/types/ProfileType";

interface ProfileDetailFormProps {
  defaultValues?: Partial<ProfileDetailType>;
}

const ProfileDetailForm = ({ defaultValues = {} }: ProfileDetailFormProps) => {
  const form = useForm<ProfileDetailType>({
    resolver: zodResolver(ProfileDetailSchema),
    defaultValues: {
      gender: "",
      calendarType: "",
      birthDate: "",
      birthHour: "",
      birthMinute: "",
      unknownTime: false,
      ...defaultValues,
    },
  });

  const onSubmit = async (values: ProfileDetailType) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? "");
    });
    try {
      await saveProfileDetail(formData);
    } catch (error) {
      console.error(error);
      // 에러 처리 (e.g., form.setError)
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-grow flex-col items-center gap-3 text-[#1A3C2C]"
      >
        <RadioSelectionDrawer
          name="gender"
          options={[
            { value: "male", label: "남성" },
            { value: "female", label: "여성" },
          ]}
          form={form}
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
              form={form}
              title="음력/양력"
            />
          </div>
          <div className="w-4/5">
            <BirthDateField form={form} buttonClass="" />
          </div>
        </div>

        <BirthTimeFields form={form} />

        <FormFooter submitText="운세 보기" isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
};

export default ProfileDetailForm;
