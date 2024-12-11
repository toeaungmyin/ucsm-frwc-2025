import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("------ Seeding started ------");
    await prisma.setting.create({
        data: {
            curr_index: 0,
            vote_open: false,
        }
    })
}

main()
    .then(() => {
            console.log("------ Seeding completed ------");
    })
    .catch((e) => {
        console.error("Error while seeding:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
