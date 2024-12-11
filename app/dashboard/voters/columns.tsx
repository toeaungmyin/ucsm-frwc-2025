"use client";

import { Voter } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Voters = {
//     id: string;
//     serial: string;
//     code: string;
//     createdAt: string;
// };

export const columns: ColumnDef<Voter>[] = [
    {
        accessorKey: "serial",
        header: "SERIAL",
    },
    {
        accessorKey: "id",
        header: "UUID",
    },
];
