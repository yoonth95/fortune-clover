import * as React from "react";
import { isMobile as isMobileDevice } from "react-device-detect";

const MOBILE_BREAKPOINT = 768; // 태블릿까지 포함하는 모바일 상한선

export function useMobile({ breakpoint = MOBILE_BREAKPOINT }: { breakpoint?: number } = {}) {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const determineIsMobile = () => {
      const widthBasedMobile = window.innerWidth <= breakpoint;
      return isMobileDevice || widthBasedMobile;
    };

    const onChange = () => setIsMobile(determineIsMobile());
    setIsMobile(determineIsMobile());

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
