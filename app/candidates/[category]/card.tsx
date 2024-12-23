import { Icons } from "@/components/assets/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import client from "@/lib/axios";
import { Prisma, Vote } from "@prisma/client";
import { AxiosError } from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type CandidateWithVotes = Prisma.CandidateGetPayload<{
    include: { votes: true };
}>;

type VoterWithVotes = Prisma.VoterGetPayload<{
    include: { votes: true };
}>;

export default function Card({
    candidate,
    auth,
}: {
    candidate: CandidateWithVotes;
    auth: VoterWithVotes;
}) {
    const searchParam = useSearchParams();
    const code = searchParam.get("code");

    const [votes, setVotes] = useState<Vote[] | null>(auth.votes || []);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleVote = async () => {
        try {
            setLoading(true);
            const response = await client.post(`/votes`, {
                candidateId: candidate.id,
                category: candidate.category,
                code,
            });

            toast({
                description: "Voted successfully",
            });

            setVotes((prev: Vote[] | null) => {
                if (prev === null) {
                    return [response.data];
                }
                return [...prev, response.data];
            });
        } catch (error) {
            const axiosError = error as AxiosError<{
                error: { code: string };
                message: string;
            }>;
            if (axiosError.response?.data?.error?.code === "P2002") {
                toast({
                    description: "You have already voted for this category",
                    variant: "destructive",
                });
            } else {
                toast({
                    description:
                        axiosError.response?.data?.message ||
                        "An error occurred",
                    variant: "destructive",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle vote removal
    const handleRemoveVote = async () => {
        try {
            setLoading(true);
            await client.delete(
                `/votes?code=${code}&candidateId=${candidate.id}`
            );

            toast({
                description: "Vote removed successfully",
            });

            setVotes((prevVotes) => {
                if (prevVotes === null) {
                    return [];
                }
                return prevVotes.filter(
                    (vote) => vote.candidateId !== candidate.id
                );
            });
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                description:
                    axiosError.response?.data?.message || "An error occurred",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVoteAction = () => {
        const vote = votes?.find((v) => v.candidateId === candidate.id);
        if (vote) {
            handleRemoveVote();
        } else {
            handleVote();
        }
    };

    // Render image card for candidates in valid categories
    if (candidate.image) {
        const hasVoted =
            votes?.some((v) => v.candidateId === candidate.id) || false;
        return (
            <div className="w-full md:max-w-sm bg-white shadow border rounded p-4 flex flex-col gap-2">
                <Image
                    src={candidate.image}
                    alt={candidate.name}
                    className="object-cover w-full h-auto rounded"
                    width={200}
                    height={0}
                    quality={100}
                    priority
                />
                <h2 className="font-bold font-rubik text-lg">{`${candidate.nomineeId}. ${candidate.name}`}</h2>
                <Button
                    onClick={handleVoteAction}
                    variant="default"
                    size="default"
                    className={`w-full rounded-sm ${
                        hasVoted ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    disabled={isLoading}
                >
                    {votes?.some((v) => v.candidateId === candidate.id) ? (
                        <div className="flex justify-center items-center gap-1">
                            Voted <Icons.true />
                        </div>
                    ) : (
                        "Vote"
                    )}
                    {isLoading && <Icons.spinner className="animate-spin" />}
                </Button>
            </div>
        );
    } else {
        return (
            <div className="w-full md:max-w-sm bg-white shadow border rounded px-4 py-2 flex justify-between items-center gap-2">
                <h2 className="font-bold font-rubik text-lg">
                    {candidate.nomineeId}.
                    <span className="ms-2">{candidate.name}</span>
                </h2>
                <Button
                    onClick={handleVoteAction}
                    variant="default"
                    size="default"
                    className={`rounded-sm !py-1 ${
                        votes?.some((v) => v.candidateId === candidate.id)
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                    }`}
                    disabled={
                        isLoading ||
                        votes?.some((v) => v.candidateId === candidate.id)
                    }
                >
                    {votes?.some((v) => v.candidateId === candidate.id) ? (
                        <div className="flex justify-center items-center gap-1">
                            Voted <Icons.true />
                        </div>
                    ) : (
                        "Vote"
                    )}
                    {isLoading && <Icons.spinner className="animate-spin" />}
                </Button>
            </div>
        );
    }
}
