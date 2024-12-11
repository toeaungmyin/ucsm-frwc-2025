import { Button } from '@/components/ui/button';
import { Candidate, Category } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export default function Card({ candidate }: { candidate: Candidate }) {
    
    if (candidate.image && candidate.category !== Category.BEST_PERFORMANCE && candidate.category !== Category.BEST_SINGER) {
        return (
            <div className="w-full md:max-w-sm bg-white shadow border rounded p-4 flex flex-col gap-2">
                <Image
                    src={candidate.image}
                    alt={candidate.name}
                    className="object-cover w-full h-auto rounded"
                    width={200}
                    height={0}
                    priority
                />
                <h2 className="font-bold font-rubik text-lg">{`${candidate.nomineeId}. ${candidate.name}`}</h2>
                <Button variant={'default'} size={"default"} className='w-full rounded-sm'>
                    Vote
                </Button>
            </div>
        );
    } else {
        return (
            <div className="bg-white shadow border p-4">
                <h2 className="font-bold text-lg">{candidate.name}</h2>
            </div>
        );
    }

    
}
