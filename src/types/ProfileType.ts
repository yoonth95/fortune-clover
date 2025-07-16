import { z } from "zod";

// profile name
export const ProfileNameSchema = z.object({
  name: z
    .string()
    .min(2, { message: "닉네임은 최소 2글자 이상이어야 합니다" })
    .max(20, { message: "닉네임은 20글자를 초과할 수 없습니다" })
    .regex(/^[가-힣a-zA-Z0-9](?:[가-힣a-zA-Z0-9\s]{1,19})?$/, {
      message: "닉네임은 한글, 영문, 숫자만 사용할 수 있으며, 첫 글자는 공백일 수 없습니다",
    }),
});
export type ProfileNameType = z.infer<typeof ProfileNameSchema>;

// profile detail
export const ProfileDetailSchema = z.object({
  gender: z.enum(["male", "female"]),
  calendarType: z.enum(["solar", "lunar"]),
  birthDate: z.string(),
  birthTime: z.string().optional(),
});
export type ProfileDetailType = z.infer<typeof ProfileDetailSchema>;

// 부분 프로필 타입 (각 단계별로 사용)
export type PartialProfileDataType = Partial<ProfileNameType & ProfileDetailType>;

// 완전한 프로필 타입
export const ProfileSchema = z.intersection(ProfileNameSchema, ProfileDetailSchema);
export type ProfileDataType = z.infer<typeof ProfileSchema>;
