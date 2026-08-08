import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface User {
  userId: string;
  role: string;
  email: string;
  fullName: string;
  iat: number;
  exp: number;
}

export default function proxy(request: NextRequest) {
  const loginRoute = new URL("/login", request.url);
  const currentPath = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  if (currentPath === "/login") {
    if (token) {
      try {
        const userInfo = jwtDecode<User>(token);
        if (userInfo?.role === "CUSTOMER") {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(loginRoute);
  }

  try {
    const userInfo = jwtDecode<User>(token);
    const role = userInfo?.role;


    if (role === "CUSTOMER") {
      const customerAllowedRoutes = ["/checkout"];
      const hasAccess = customerAllowedRoutes.some((route) =>
        currentPath.startsWith(route),
      );

      if (!hasAccess) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }

    return NextResponse.redirect(loginRoute);
  } catch {
    const response = NextResponse.redirect(loginRoute);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/login",
    "/checkout/:path*",
  ],
};
