import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Các route cần bảo vệ
    const protectedRoutes = ["/dashboard", "/admin", "/buyer", "/seller"];
    const publicRoutes = ["/login", "/register"];

    const { pathname } = request.nextUrl;
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // Nếu là protected route, sẽ được check bởi layout.tsx của từng route
    // Middleware này chỉ log để tracking
    if (isProtectedRoute) {
        console.log(`[Middleware] Accessing protected route: ${pathname}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
