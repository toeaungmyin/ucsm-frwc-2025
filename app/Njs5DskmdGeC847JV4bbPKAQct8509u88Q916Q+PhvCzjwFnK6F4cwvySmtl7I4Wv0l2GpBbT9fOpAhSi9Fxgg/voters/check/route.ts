import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../..";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            { message: "Code is required" },
            { status: 404 }
        );
    }

    const voter = await prisma.voter.findFirst({
        where: {
            id: code,
        },
        include: {
            votes: true,
        },
    });

    if (!voter) {
        return NextResponse.json(
            { message: "Voter not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(voter);
}
