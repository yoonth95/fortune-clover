import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const profileCookie = request.cookies.get("profile-info")?.value;

  let profileData = null;
  try {
    profileData = profileCookie ? JSON.parse(profileCookie) : null;
  } catch {
    profileData = null;
  }

  const hasName = profileData?.name;
  const hasDetail = profileData?.detail;

  // 단계별 접근 제어
  // 1단계: 메인 페이지 ("/") - 항상 접근 가능
  if (pathname === "/") {
    // 모든 정보가 있으면 fortune 페이지로 리다이렉트
    if (hasName && hasDetail) {
      return NextResponse.redirect(new URL("/fortune", request.url));
    }
    return NextResponse.next();
  }

  // 2단계: 이름 페이지 ("/profile/name") - 항상 접근 가능 (첫 단계)
  if (pathname === "/profile/name") {
    // 모든 정보가 있으면 fortune 페이지로 리다이렉트
    if (hasName && hasDetail) {
      return NextResponse.redirect(new URL("/fortune", request.url));
    }
    return NextResponse.next();
  }

  // 3단계: 디테일 페이지 ("/profile/detail") - 이름이 있어야 접근 가능
  if (pathname === "/profile/detail") {
    if (!hasName) {
      return NextResponse.redirect(new URL("/profile/name", request.url));
    }
    // 모든 정보가 있으면 fortune 페이지로 리다이렉트
    if (hasDetail) {
      return NextResponse.redirect(new URL("/fortune", request.url));
    }
    return NextResponse.next();
  }

  // 4단계: fortune 페이지 ("/fortune") - 모든 정보가 있어야 접근 가능
  if (pathname === "/fortune") {
    if (!hasName || !hasDetail) {
      // 이름이 없으면 이름 페이지로
      if (!hasName) {
        return NextResponse.redirect(new URL("/profile/name", request.url));
      }
      // 이름은 있지만 디테일이 없으면 디테일 페이지로
      return NextResponse.redirect(new URL("/profile/detail", request.url));
    }
    return NextResponse.next();
  }

  // 기타 경로는 현재 프로그레스에 따라 적절한 페이지로 리다이렉트
  if (!hasName) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!hasDetail) {
    return NextResponse.redirect(new URL("/profile/detail", request.url));
  }

  // 모든 정보가 있으면 fortune 페이지로
  return NextResponse.redirect(new URL("/fortune", request.url));
}

export const config = {
  matcher: [
    // API, 정적 자산 제외한 모든 경로에 미들웨어 적용
    "/((?!api|_next/static|_next/image|favicon.ico|icons/.*|images/.*|sitemap.xml|robots.txt).*)",
  ],
};
