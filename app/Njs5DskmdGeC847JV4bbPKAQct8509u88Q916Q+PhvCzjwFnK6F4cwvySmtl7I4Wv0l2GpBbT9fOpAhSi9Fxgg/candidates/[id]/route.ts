import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../..";
import { del } from "@vercel/blob";

export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        if (!id) {
            return NextResponse.json({message: "ID is required",}, {status: 403})
        }

        const candidate = await prisma.candidate.findFirst({
            where: {
                id: parseInt(id),
            }
        })

        if (candidate?.image) {
            await del(candidate.image);
        }

        await prisma.candidate.delete({
            where: {
                id: parseInt(id),
            }
        });

        return NextResponse.json({ message: "Candidate deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occured", error: error },
            { status: 500 }
        );
    }
}
