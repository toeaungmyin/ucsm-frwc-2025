import { get_voters } from "@/app/lib/action";
import VotersTable from "./voters-table";
import { toast } from "@/hooks/use-toast";
import { Voter } from "@prisma/client";

export default async function page() {
    const response = await get_voters();
    
    if ('error' in response) {
        console.log(response);
        toast({ description: "An error occured", variant: "destructive" });
        return null;
    }

    const voters = response as Voter[];
    
    return (
        <div className="container mx-auto py-10 flex flex-col gap-4">
            <VotersTable data={voters} />
        </div>
    );
}
