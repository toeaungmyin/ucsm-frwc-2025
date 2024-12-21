import React, { useEffect } from "react";
import { Voter } from "@prisma/client";
import Card from "./card";

export default function PdfContainer({
    page,
    setRefs,
}: {
    page: Voter[];
    setRefs: React.Dispatch<
        React.SetStateAction<React.RefObject<HTMLDivElement>[]>
    >;
}) {
    const pageRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setRefs((prev) => [...prev, pageRef]);
    }, [setRefs]);

    return (
        <div
            ref={pageRef}
            className="bg-white p-1 grid grid-cols-4 grid-rows-4 gap-2 aspect-[210/297] w-full items-stretch overflow-hidden rounded"
        >
            {page.map((voter, i) => (
                <Card key={i} data={voter} />
            ))}
        </div>
    );
}
