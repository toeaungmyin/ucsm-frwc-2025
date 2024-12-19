"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function LinkCard({ cat }: { cat: string }) {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const category = cat
        .split("_")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    return (
        <Link
            href={`/candidates/${category}?code=${code}`}
            className="bg-gray-50 border shadow-md p-1 rounded text-xl font-medium self-stretch aspect-[2/1] flex justify-center items-center"
        >
            <div className="flex justify-center text-center">{category}</div>
        </Link>
    );
}
