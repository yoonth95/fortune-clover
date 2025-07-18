import { z } from "zod";

// profile name
export const ProfileNameSchema = z.object({
  name: z
    .string()
    .min(2, { message: "닉네임은 최소 2글자 이상이어야 합니다" })
    .max(20, { message: "닉네임은 20글자를 초과할 수 없습니다" })
    .regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9](?:[ㄱ-ㅎ가-힣a-zA-Z0-9\s]{1,19})?$/, {
      message: "닉네임은 한글, 영문, 숫자만 사용할 수 있으며, 첫 글자는 공백일 수 없습니다",
    }),
});
export type ProfileNameType = z.infer<typeof ProfileNameSchema>;

// profile detail
const BaseSchema = z.object({
  gender: z.string().min(1, { message: "성별을 선택해주세요." }),
  calendarType: z.string().min(1, { message: "양력/음력을 선택해주세요." }),
  birthDate: z.string().min(1, { message: "생년월일을 선택해주세요" }),
  birthHour: z
    .string()
    .nullable()
    .refine((val) => !val || (parseInt(val) >= 0 && parseInt(val) <= 23), {
      message: "0~23 사이의 시간을 입력해주세요",
    }),
  birthMinute: z
    .string()
    .nullable()
    .refine((val) => !val || (parseInt(val) >= 0 && parseInt(val) <= 59), {
      message: "0~59 사이의 분을 입력해주세요",
    }),
  unknownTime: z.boolean(),
});

export const ProfileDetailSchema = BaseSchema.refine(
  (data) => {
    if (data.unknownTime) {
      return data.birthHour === null && data.birthMinute === null;
    } else {
      return (
        data.birthHour !== null &&
        data.birthMinute !== null &&
        data.birthHour !== "" &&
        data.birthMinute !== ""
      );
    }
  },
  {
    message: "태어난 시간을 모른다면 체크해주세요. 시간을 안다면 시간과 분을 모두 입력해주세요.",
    path: ["unknownTime"],
  },
);

export type ProfileDetailType = z.infer<typeof ProfileDetailSchema>;

// 부분 프로필 타입 (각 단계별로 사용)
export type PartialProfileDataType = Partial<ProfileNameType & ProfileDetailType>;

// 완전한 프로필 타입
export const ProfileSchema = z.intersection(ProfileNameSchema, ProfileDetailSchema);
export type ProfileDataType = z.infer<typeof ProfileSchema>;
