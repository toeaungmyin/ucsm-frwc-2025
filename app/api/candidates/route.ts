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
                votes: true, 
            }
        });
        return NextResponse.json(candidates);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    
}



export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const candidateName = formData.get("name") as string;
        const category = formData.get("category") as Category;
        const image = formData.get("image") as Blob;
        const nomineeId = formData.get("nomineeId") as string;

        if (!candidateName || !category || !image) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        let blob = null;
        if (image) {
            const currentTime = new Date().getTime();
            blob = await put(currentTime.toString(), image, {
            access: "public",
        });
        }

        const data = await prisma.candidate.create({
            data: {
                name: candidateName,
                category: category,
                image: blob?.url || null,
                nomineeId: nomineeId,
            },
            include: {
                votes: true,
            },
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}

