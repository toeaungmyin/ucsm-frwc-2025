'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ucsm_logo from "@/components/assets/images/logo_ucsm.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Nav() {
    const params = useParams<{ category: Category }>();
    const searchParam = useSearchParams();
    const code = searchParam.get("code");
    const [category, setCategory] = useState<Category | null>(params.category);
    const router = useRouter();

    useEffect(() => {
        router.push(`/candidates/${category}?code=${code}`);
    }, [category, router, code]);

    return (
        <div className="flex justify-between items-center p-2 bg-cyan-400">
            <div className="flex items-center gap-2">
                <Image
                    src={ucsm_logo}
                    className="ms-2 aspect-square object-contain w-10 h-auto"
                    alt="UCSM_LOGO"
                    width={100}
                    height={0}
                    priority
                />
                <h1 className="font-medium font-rubik md:text-2xl text-md text-gray-50">
                    Fresher Welcome 2024-2025
                </h1>
            </div>
            <Select
                value={category as string}
                onValueChange={(value: Category) => setCategory(value)}
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Candidate type" />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(Category).map((cat, index) => (
                        <SelectItem
                            className="font-rubik"
                            key={index}
                            value={cat.toString()}
                        >
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
