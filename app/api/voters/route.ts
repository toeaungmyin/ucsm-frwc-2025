import { format_serial_number } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "..";

export async function GET() {    
    const voters = await prisma.voter.findMany();
    return NextResponse.json(voters);
}

export async function POST(request: NextRequest) {

    try {

        const body = await request.json();
        const setting = await prisma.setting.findFirst();

        if (!setting) {
            return NextResponse.json(
                { message: "Setting not found" },
                { status: 404 }
            );
        }

        let curr_index = setting.curr_index;

        const voters = Array.from({ length: parseInt(body.quantity) }, () => ({
            serial: format_serial_number(4, curr_index++),
        }));

        const data = await prisma.voter.createManyAndReturn({
            data: voters,
        });

        update_current_index(curr_index);

        return NextResponse.json(data);

    } catch (error) {

        return NextResponse.json({ message: "An error occured",error: error }, { status: 500 });
        
    }
    
}

export async function DELETE() {
    await prisma.voter.deleteMany();
    update_current_index(1);
    return NextResponse.json({ message: "All voters deleted" });
}

const update_current_index = async (to_index: number): Promise<void> => {
    const curr_index = (await prisma.setting.findFirst()) || {
        id: 1,
        curr_index: 1,
    };

    await prisma.setting.update({
        where: { id: curr_index.id },
        data: { curr_index: to_index },
    });
}