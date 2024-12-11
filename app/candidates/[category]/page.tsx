'use client'

import { toast } from '@/hooks/use-toast';
import client from '@/lib/axios';
import { Candidate } from '@prisma/client';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Card from './card';
import { Icons } from '@/components/assets/icons';

export default function Page() {
    const params = useParams<{ category: string }>();
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const response = await client.get(
                    `/candidates?category=${params.category}`
                );

                setCandidates(response.data);
                setLoading(false);
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

        if (params.category) {
            fetchCandidates();
        }
    }, [params.category]);

    return (
        <div className="flex flex-col justify-center items-center px-4 py-4 gap-2">
            {!isLoading ? 
            candidates.length > 1 ? (
                candidates.map(
                    (candidate) =>
                        candidate && (
                            <Card key={candidate.id} candidate={candidate} />
                        )
                )
            ) : (
                <div className="w-full min-h-40 flex justify-center items-center">
                    <h2 className="text-center text-gray-500">
                        No candidates found
                    </h2>
                </div>
            ):
                (
                <div className="w-full min-h-40 flex justify-center items-center">
                    <Icons.spinner className="animate-spin self-center text-cyan-500 w-12 h-12" />
                </div>
                )
            }
        </div>
    );
}
