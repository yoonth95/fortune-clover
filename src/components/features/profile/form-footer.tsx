import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface FormFooterProps {
  submitText: string;
  isSubmitting: boolean;
}

const FormFooter = ({ submitText, isSubmitting }: FormFooterProps) => {
  return (
    <div className="mt-auto flex w-full flex-col gap-4">
      <div className="flex items-center gap-3 rounded-md border border-[#BEE3C2] bg-[#DFF5E3] p-3 text-sm text-[#1A3C2C]">
        <Shield className="h-5 w-5 text-[#34A853]" />
        <p className="text-xs break-keep">
          입력하신 정보는 오직 이 기기에서만 저장되며, 외부로 전송되지 않습니다.
        </p>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-[#34A853] px-6 py-5 text-base font-semibold text-white hover:bg-[#2f974a]"
      >
        {isSubmitting ? "저장 중..." : submitText}
      </Button>
    </div>
  );
};

export default FormFooter;
