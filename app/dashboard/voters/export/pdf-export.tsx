'use client'

import { Voter } from '@prisma/client'
import React, { useState } from 'react'
import PdfContainer from './pdf-container';
import generatePDF, { Margin, Options, Resolution } from "react-to-pdf";
import { Icons } from "@/components/assets/icons";
import { Button } from '@/components/ui/button';

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

    const [isLoding, setIsLoading] = useState(false);
    const [refs, setRefs] = useState([]);
    const pages = [];
    const cardPerPage = 16;
    for (let i = 0; i < data.length; i += cardPerPage) {
        pages.push(data.slice(i, i + cardPerPage));
    }

    const handleExport = async () => {
        try {
            setIsLoading(true);
            
            refs.forEach(async (ref: any) => {
                await generatePDF(ref, options);
            });
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full h-auto">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Preview</h1>
                <Button
                    variant={"outline"}
                    onClick={handleExport}
                    disabled={isLoding}
                >
                    {isLoding ? (
                        <Icons.spinner className="animate-spin" />
                    ) : (
                        "Print"
                    )}
                </Button>
            </div>
            {pages.length > 0 && pages.map((page, index) => (
                        <PdfContainer key={index} page={page} setRefs={setRefs} />
                    ))
            }
        </div>
    );
}