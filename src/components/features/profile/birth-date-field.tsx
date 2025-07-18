"use client";

import { useState } from "react";
import { format, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ProfileDetailType, ProfileDataType } from "@/types/ProfileType";
import { CalendarIcon } from "lucide-react";

interface BirthDateFieldProps {
  form: UseFormReturn<ProfileDetailType | ProfileDataType>;
  buttonClass?: string;
}

const BirthDateField = ({ form, buttonClass }: BirthDateFieldProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(undefined);

  return (
    <FormField
      control={form.control}
      name="birthDate"
      render={({ field }) => (
        <FormItem>
          <Popover
            open={open}
            onOpenChange={(open) => {
              setOpen(open);
              if (open && field.value) {
                setMonth(startOfMonth(new Date(field.value)));
              } else {
                setMonth(undefined);
              }
            }}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full flex-1 justify-center px-4 py-5 text-xs font-normal sm:text-sm",
                    !field.value && "text-muted-foreground",
                    buttonClass,
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {field.value
                    ? format(field.value, "PPP", { locale: ko })
                    : "생년월일을 선택해주세요"}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (date) field.onChange(format(date, "yyyy-MM-dd"));
                  else field.onChange("");
                  setOpen(false);
                }}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                month={month}
                onMonthChange={setMonth}
                captionLayout="dropdown"
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="text-xs text-yellow-300" />
        </FormItem>
      )}
    />
  );
};

export default BirthDateField;
