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
        <div className="border-2">
            <div
                ref={pageRef}
                className="p-4 bg-white grid grid-cols-4 gap-2 aspect-[210/297] w-full items-stretch overflow-hidden"
            >
                {page.map((voter, i) => (
                    <Card key={i} data={voter} />
                ))}
            </div>
        </div>
    );
}
