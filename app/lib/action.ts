'use server'

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function get_voters() { 
    try {
        const voters = await prisma.voter.findMany();
        return voters;
    } catch (error) {
        return { message: "An error occured", error: error };
    }
}

export async function get_candidates() {
    try {
        const voters = await prisma.candidate.findMany();
        return voters;
    } catch (error) {
        return { message: "An error occured", error: error };
    }
}