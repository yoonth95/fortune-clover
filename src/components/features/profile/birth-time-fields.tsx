"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ProfileDetailType, ProfileDataType } from "@/types/ProfileType";

interface BirthTimeFieldsProps {
  form: UseFormReturn<ProfileDetailType | ProfileDataType>;
}

const BirthTimeFields = ({ form }: BirthTimeFieldsProps) => {
  const unknownTime = form.watch("unknownTime");

  return (
    <>
      <div className="flex w-full gap-3">
        <FormField
          control={form.control}
          name="birthHour"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="number"
                  placeholder="태어난 시간"
                  min="0"
                  max="23"
                  disabled={unknownTime}
                  className="w-full rounded-md border border-[#BEE3C2] bg-[#F0FAF4] px-4 py-5 text-center text-xs text-[#1A3C2C] placeholder-[#7AAE90] disabled:opacity-50 sm:text-sm"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-xs text-yellow-300" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthMinute"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="number"
                  placeholder="태어난 분"
                  min="0"
                  max="59"
                  disabled={unknownTime}
                  className="w-full rounded-md border border-[#BEE3C2] bg-[#F0FAF4] px-4 py-5 text-center text-xs text-[#1A3C2C] placeholder-[#7AAE90] disabled:opacity-50 sm:text-sm"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-xs text-yellow-300" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="unknownTime"
        render={({ field }) => (
          <FormItem className="ml-1 flex w-full flex-col items-start">
            <div className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  id="unknown-time"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      form.setValue("birthHour", "");
                      form.setValue("birthMinute", "");
                    }
                  }}
                  className="border-[#34A853] data-[state=checked]:border-[#2f974a] data-[state=checked]:bg-[#34A853]"
                />
              </FormControl>
              <Label
                htmlFor="unknown-time"
                className="cursor-pointer text-xs font-medium text-[#1A3C2C] sm:text-sm"
              >
                태어난 시간을 몰라요
              </Label>
            </div>
            <FormMessage className="text-xs text-yellow-300" />
          </FormItem>
        )}
      />
    </>
  );
};

export default BirthTimeFields;
