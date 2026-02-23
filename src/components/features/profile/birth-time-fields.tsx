"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileDetailType, ProfileDataType } from "@/types/ProfileType";

export const TIME_OPTIONS = [
  { label: '모름 (시간을 알 수 없음)', value: '모름' },
  { label: '子 (23:30 ~ 01:29)', value: '자' },
  { label: '丑 (01:30 ~ 03:29)', value: '축' },
  { label: '寅 (03:30 ~ 05:29)', value: '인' },
  { label: '卯 (05:30 ~ 07:29)', value: '묘' },
  { label: '辰 (07:30 ~ 09:29)', value: '진' },
  { label: '巳 (09:30 ~ 11:29)', value: '사' },
  { label: '午 (11:30 ~ 13:29)', value: '오' },
  { label: '未 (13:30 ~ 15:29)', value: '미' },
  { label: '申 (15:30 ~ 17:29)', value: '신' },
  { label: '酉 (17:30 ~ 19:29)', value: '유' },
  { label: '戌 (19:30 ~ 21:29)', value: '술' },
  { label: '亥 (21:30 ~ 23:29)', value: '해' },
];

interface BirthTimeFieldsProps {
  form: UseFormReturn<ProfileDetailType | ProfileDataType>;
}

const BirthTimeFields = ({ form }: BirthTimeFieldsProps) => {
  return (
    <div className="flex w-full gap-3">
      <FormField
        control={form.control}
        name="birthHour"
        render={({ field }) => (
          <FormItem className="w-full">
            <Select
              onValueChange={field.onChange}
              value={typeof field.value === "string" ? field.value : undefined}
            >
              <FormControl>
                <SelectTrigger className="w-full h-auto rounded-md border border-[#BEE3C2] bg-[#F0FAF4] px-4 py-3.5 text-xs text-[#1A3C2C] data-[placeholder]:text-[#7AAE90] sm:text-sm">
                  <SelectValue placeholder="태어난 시간을 선택해주세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TIME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-yellow-300" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BirthTimeFields;
