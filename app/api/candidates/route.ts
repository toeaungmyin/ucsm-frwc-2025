import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "..";
import { put } from "@vercel/blob"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") as Category;

        if (!category) {
            return NextResponse.json(
                { message: "Category is required" },
                { status: 400 }
            );
        }

        const candidates = await prisma.candidate.findMany({
            where: {
                category: category,
            },
            include: {
                votes: {
                    include: {
                        voter: true,
                    },
                },
            },
        });
        return NextResponse.json(candidates);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract and validate form data
        const formData = await request.formData();
        const candidateName = formData.get("name") as string | null;
        const category = formData.get("category") as Category | null;
        const image = formData.get("image") as Blob | null;
        const nomineeId = formData.get("nomineeId") as string | null;

        if (!candidateName || !category || !nomineeId) {
            return NextResponse.json(
                {
                    message:
                        "All fields are required (name, category, nomineeId).",
                },
                { status: 400 }
            );
        }

        // Upload image if provided
        let blobUrl: string | null = null;
        if (image) {
            const currentTime = Date.now().toString();
            const blob = await put(currentTime, image, { access: "public" });
            blobUrl = blob.url;
        }

        // Save candidate to the database
        const data = await prisma.candidate.create({
            data: {
                name: candidateName,
                category,
                image: blobUrl,
                nomineeId,
            },
            include: {
                votes: true, // Adjust as needed
            },
        });

        return NextResponse.json(data, { status: 201 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error in POST /api/candidate:", error.message || error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}


