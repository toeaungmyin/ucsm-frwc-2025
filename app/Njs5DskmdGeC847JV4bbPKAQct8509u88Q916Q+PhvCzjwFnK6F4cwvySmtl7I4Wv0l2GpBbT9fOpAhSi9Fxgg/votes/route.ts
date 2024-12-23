import { NextRequest, NextResponse } from "next/server";
import { prisma } from "..";

export async function GET() {
    const votes = await prisma.vote.findMany();
    return NextResponse.json(votes);
}

export async function POST(request: NextRequest) {
    try {
        const { code, candidateId, category } = await request.json();

        const setting = await prisma.setting.findFirst();

        if (!setting?.is_vote_open) {
            return NextResponse.json(
                {
                    message:
                        "Voting is currently disabled. It will be enabled soon.",
                },
                { status: 400 }
            );
        }

        const vote = await prisma.vote.create({
            data: {
                voter: {
                    connect: {
                        id: code,
                    },
                },
                candidate: {
                    connect: {
                        id: candidateId,
                    },
                },
                category: category,
            },
        });

        return NextResponse.json(vote);
    } catch (error) {
        return NextResponse.json(
            { message: "An error occured", error: error },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const code = searchParams.get("code") as string;
        const candidateId = searchParams.get("candidateId");

        if (!code || !candidateId) {
            return NextResponse.json(
                { message: "Code and candidateId are required" },
                { status: 400 }
            );
        }

        await prisma.vote.delete({
            where: {
                voterId_candidateId: {
                    voterId: code,
                    candidateId: parseInt(candidateId),
                },
            },
        });

        return NextResponse.json("Vote removed successfully");
    } catch (error) {
        return NextResponse.json(
            { message: "An error occured", error: error },
            { status: 500 }
        );
    }
}
