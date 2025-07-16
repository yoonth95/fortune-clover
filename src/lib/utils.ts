import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * URL.canParse polyfill for older Node.js versions
 * URL.canParse was introduced in Node.js 18.17.0
 */
if (typeof URL !== "undefined" && !URL.canParse) {
  URL.canParse = function (url: string | URL, base?: string | URL): boolean {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}
