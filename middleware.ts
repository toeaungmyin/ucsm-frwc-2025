import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import client from "./lib/axios";

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (["/", "/candidates"].some((route) => pathname.startsWith(route))) {
        const code = searchParams.get("code");

        if (!code) {
            console.error("Middleware Error: Code not found in query params");
            return redirectToNotFound(request);
        }

        try {
            const response = await client.get(`/voters/check`, {
                params: { code },
            });

            if (!response?.data) {
                console.error("Middleware Error: Voter not found");
                return redirectToNotFound(request);
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Middleware Error: ", error);
            return redirectToNotFound(request);
        }
    }

    return NextResponse.next();
}

function redirectToNotFound(request: NextRequest) {
    return NextResponse.redirect(new URL("/not_found", request.url));
}

export const config = {
    matcher: ["/", "/candidates/:path*"],
};
