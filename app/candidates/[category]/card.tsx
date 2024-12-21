import { Icons } from "@/components/assets/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import client from "@/lib/axios";
import { Prisma, Vote, Voter } from "@prisma/client";
import { AxiosError } from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type CandidateWithVotes = Prisma.CandidateGetPayload<{
    include: { votes: true };
}>;

export default function Card({
    candidate,
    auth,
}: {
    candidate: CandidateWithVotes;
    auth: Voter;
}) {
    const searchParam = useSearchParams();
    const code = searchParam.get("code");

    const [vote, setVote] = useState<Vote | null>(
        candidate?.votes?.find((vote: Vote) => vote.voterId === auth.id) || null
    );
    const [isLoading, setLoading] = useState<boolean>(false);

    // Handle vote submission
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

            setVote(response.data);
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

            setVote(null);
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

    // Toggle vote action
    const handleVoteAction = () => {
        if (vote) {
            handleRemoveVote();
        } else {
            handleVote();
        }
    };

    // Render image card for candidates in valid categories
    if (candidate.image) {
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
                        vote ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    disabled={
                        isLoading ||
                        (!!vote && vote.candidateId !== candidate.id)
                    }
                >
                    {vote ? (
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
                        vote ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    disabled={
                        isLoading ||
                        (!!vote && vote.candidateId !== candidate.id)
                    }
                >
                    {vote ? (
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
