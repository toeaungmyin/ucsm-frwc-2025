"use client";

import React, { useEffect, useState } from "react";
import client from "@/lib/axios";
import TableHeader from "./table-header";
import { Candidate, Category } from "@prisma/client";
import { DataTable } from "@/components/data.table";
import { toast } from "@/hooks/use-toast";
import { columns } from "./columns";

export default function Page() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [category, setCategory] = useState<Category>("KING");

    const handleDelete = async (id: number) => {
        try {
            await client.delete(`/candidates/${id}`);
            setCandidates((prev) =>
                prev.filter((candidate) => candidate.id !== id)
            );
            toast({
                description: "Candidate deleted successfully",
            });
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    description: error.message || "An error occurred",
                    variant: "destructive",
                });
            } else {
                toast({
                    description: "An unknown error occurred",
                    variant: "destructive",
                });
            }
        }
    }

    const tableMeta = { handleDelete };

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await client.get(
                    `/candidates?category=${category}`
                );
                
                setCandidates(response.data);

            } catch (error) {
                if (error instanceof Error) {
                    toast({
                        description: error.message || "An error occurred",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        description: "An unknown error occurred",
                        variant: "destructive",
                    });
                }
            }
        };

        if (category) {
            fetchCandidates();
        }
    }, [category]);

    return (
        <div className="container mx-auto py-10 flex flex-col gap-4">
            <TableHeader
                category={category}
                setCategory={setCategory}
                setCandidates={setCandidates}
            />
            <DataTable meta={tableMeta} columns={columns} data={candidates} />
        </div>
    );
}
