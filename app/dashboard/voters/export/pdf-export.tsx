'use client'
import React, { useState, useEffect } from "react";
import { Voter } from "@prisma/client";
import PdfContainer from "./pdf-container";
import generatePDF, { Margin, Options, Resolution } from "react-to-pdf";
import { Icons } from "@/components/assets/icons";
import { Button } from "@/components/ui/button";

const options: Options = {
    method: "save",
    filename: "voting-ticket.pdf",
    resolution: Resolution.MEDIUM,
    page: {
        margin: Margin.SMALL,
        format: "A4",
        orientation: "portrait",
    },
};

export default function PdfExport({ data }: { data: Voter[] }) {
    const [isLoading, setIsLoading] = useState(false);
    const [refs, setRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
    const pages: Voter[][] = [];
    const cardPerPage = 16;

    for (let i = 0; i < data.length; i += cardPerPage) {
        pages.push(data.slice(i, i + cardPerPage));
    }

    const handleExport = async () => {
        try {
            setIsLoading(true);
            const promises = refs.map((ref) => {
                if (ref) {
                    return generatePDF(ref, options);
                }
            });
            await Promise.all(promises);
        } catch (error) {
            console.error(error);
            // Consider providing user feedback here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full h-auto">
            <div className="flex justify-between">
                <div className="font-semibold text-lg">Print Preview (A4)</div>
                <Button
                    variant={"outline"}
                    onClick={handleExport}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Icons.spinner className="animate-spin" />
                    ) : (
                        "Print"
                    )}
                </Button>
            </div>
            <div className="bg-gray-500 flex flex-col gap-4 p-4 rounded-md">
                {pages.length > 0 &&
                    pages.map((page, index) => (
                        <PdfContainer
                            key={index}
                            page={page}
                            setRefs={setRefs}
                        />
                    ))}
            </div>
        </div>
    );
}
