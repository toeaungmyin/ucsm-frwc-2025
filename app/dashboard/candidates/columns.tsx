"use client";

import { Icons } from "@/components/assets/icons";
import { Button } from "@/components/ui/button";
import { Candidate } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";

export const columns: ColumnDef<Candidate>[] = [
    {
        accessorKey: "nomineeId",
        header: "NOMINEE NO",
    },
    {
        accessorKey: "name",
        header: "NAME",
    },
    {
        accessorKey: "image",
        header: "IMAGE",
        cell: ({ row }) => {
            const candidate = row.original;
            console.log(candidate);

            return (
                candidate?.image && (
                    <a href={candidate.image} target="_blank">
                        <Image
                            className="aspect-square object-contain w-12 h-auto"
                            width={100}
                            height={0}
                            src={candidate.image}
                            alt={candidate.name}
                        />
                    </a>
                )
            );
        },
    },
    {
        accessorKey: "votes",
        header: "VOTES",
        cell: ({ row }) => {
            const candidate = row.original;
            return candidate?.votes?.length || 0;
        },
    },
    {
        accessorKey: "createdAt",
        header: "CREATED_AT",
    },
    {
        id: "action",
        enableHiding: false,
        cell: ({ row, table }) => {
            const [isLoading, setIsLoading] = useState(false);

            const onDelete = async () => {
                setIsLoading(true);
                await table.options.meta?.handleDelete(row.original.id);
                setIsLoading(false);
            };
            return (
                <Button
                    onClick={() => onDelete()}
                    variant="destructive"
                    size="sm"
                    disabled={isLoading}
                >
                    <Icons.trash />
                </Button>
            );
        },
    },
];