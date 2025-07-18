"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ProfileDetailType, ProfileDataType } from "@/types/ProfileType";
import { cn } from "@/lib/utils";

interface RadioSelectionDrawerProps {
  name: "gender" | "calendarType";
  options: { value: string; label: string }[];
  form: UseFormReturn<ProfileDetailType | ProfileDataType>;
  title: string;
  description?: string;
  buttonClass?: string;
  radioClass?: string;
}

const RadioSelectionDrawer = ({
  name,
  options,
  form,
  title,
  description,
  buttonClass,
  radioClass,
}: RadioSelectionDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-center rounded-md border border-[#BEE3C2] bg-[#F0FAF4] px-4 py-5 text-xs text-[#1A3C2C] hover:bg-[#e5f5ea] sm:text-sm",
                  buttonClass,
                )}
              >
                {field.value
                  ? options.find((opt) => opt.value === (field.value as string))?.label
                  : title}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                {description && <DrawerDescription>{description}</DrawerDescription>}
              </DrawerHeader>
              <div className="px-4 pb-4">
                <RadioGroup
                  value={field.value as string}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    setOpen(false);
                  }}
                  className="grid grid-cols-2 gap-3"
                >
                  {options.map(({ value, label }) => (
                    <div key={value}>
                      <RadioGroupItem
                        value={value}
                        id={`drawer-${value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`drawer-${value}`}
                        className={cn(
                          "cursor-pointer rounded-md border border-[#BEE3C2] bg-[#F0FAF4] px-4 py-3 text-center font-medium text-[#1A3C2C] peer-checked:border-[#7fcf96] peer-checked:bg-[#d4f0dd] peer-checked:text-[#10613f] hover:bg-[#e5f5ea]",
                          radioClass,
                        )}
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </DrawerContent>
          </Drawer>
          <FormMessage className="text-xs text-yellow-300" />
        </FormItem>
      )}
    />
  );
};

export default RadioSelectionDrawer;
