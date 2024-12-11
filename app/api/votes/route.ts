import { NextResponse } from "next/server";
import { prisma } from "..";

export async function GET() {
    const votes = await prisma.vote.findMany();
    return NextResponse.json(votes);
}
