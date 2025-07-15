import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasProfile = Boolean(request.cookies.get("profile-info")?.value);

  const publicPaths = ["/", "/profile"];

  // 프로필 없으면 before 그룹 외 모든 경로 접근 금지 → "/"로 리다이렉트
  if (!hasProfile) {
    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 프로필 있으면 before 그룹 루트("/")로 접근 시 after 그룹 메인("/fortune")으로 재작성
  else {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/fortune", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // API, 정적 자산 제외한 모든 경로에 미들웨어 적용
    "/((?!api|_next/static|_next/image|favicon.ico|icons/.*|images/.*|sitemap.xml|robots.txt).*)",
  ],
};
