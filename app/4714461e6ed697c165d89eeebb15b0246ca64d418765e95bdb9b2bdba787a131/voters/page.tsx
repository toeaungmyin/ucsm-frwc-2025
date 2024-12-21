import { get_voters } from "@/app/lib/action";
import VotersTable from "./voters-table";
import { toast } from "@/hooks/use-toast";
import { Voter } from "@prisma/client";

export default async function page() {

    let voters: Voter[] = [];

    try {
        const response = await get_voters();

        if ("message" in response) {
            toast({ description: response.message, variant: "destructive" });
        } else {
            voters = response;
        }
    } catch (error) {
        console.log(error);
        toast({ description: "An error occurred", variant: "destructive" });
    }

    return (
        <div className="container mx-auto py-10 flex flex-col gap-4">
            <VotersTable data={voters} />
        </div>
    );
}
