import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import client from "./lib/axios";
import { notFound } from "next/navigation";

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (["/", "/candidates"].some((route) => pathname.startsWith(route))) {
        const code = searchParams.get("code");

        if (!code) {
            return notFound();
        }

        try {
            const response = await client.get(`/voters/check`, {
                params: { code },
            });

            if (!response?.data) {
                return notFound();
            }

            const nextResponse = NextResponse.next();

            return nextResponse;
        } catch (error) {
            console.error("Middleware Error: ", error);
            return notFound();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/candidates/:path*"],
};
