"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { ProfileDetailFormEdit } from "@/components/features/profile";
import { PartialProfileDataType } from "@/types";
import { clearFortuneFromStorage } from "@/lib/fortune-storage";

interface ProfileSettingProps {
  profile: PartialProfileDataType;
  onProfileUpdate?: () => void;
}

const ProfileSetting = ({ profile, onProfileUpdate }: ProfileSettingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    // 1. 다이얼로그 닫기
    setIsOpen(false);

    // 2. 운세 캐시 초기화
    clearFortuneFromStorage();

    // 3. 상위 컴포넌트에 프로필 업데이트 알림 (새로운 운세 생성 트리거)
    onProfileUpdate?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 cursor-pointer rounded-none hover:bg-transparent"
        >
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        <ProfileDetailFormEdit defaultValues={profile} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetting;
