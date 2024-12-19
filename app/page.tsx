import { Category } from "@prisma/client";
import Image from "next/image";
import ucsm_logo from "@/components/assets/images/logo_ucsm.png";
import LinkCard from "./LinkCard";
import { Suspense } from "react";

export default function page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-cyan-400 py-4 px-4 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-2 items-center">
                <Image
                    src={ucsm_logo}
                    className="aspect-square object-contain w-32 h-auto"
                    alt="UCSM_LOGO"
                    width={100}
                    height={0}
                    priority
                    quality={100}
                />
                <div className="flex flex-col items-center">
                    <h1 className="font-medium font-rubik text-4xl">UCSM</h1>
                    <h2 className="font-medium text-lg">FRESHERS WELCOME</h2>
                </div>
            </div>
            <div className="w-full md:w-1/3 grid grid-cols-2 items-center gap-2">
                {Object.values(Category).map((cat, index) => {
                    return (
                        <Suspense key={index} fallback={<div>Loading...</div>}>
                            <LinkCard cat={cat} />
                        </Suspense>
                    );
                })}
            </div>
        </div>
    );
}
