import { NextRequest, NextResponse } from "next/server";
import { prisma } from "..";

export async function GET() {
    const setting = await prisma.setting.findFirst();
    return NextResponse.json(setting);
}

export async function PUT(request: NextRequest) {
    try {
        const { is_vote_open } = await request.json();
        const data = await prisma.setting.update({
            where: { id: 1 },
            data: { is_vote_open },
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "An error occured", error: error },
            { status: 500 }
        );
    }
}
