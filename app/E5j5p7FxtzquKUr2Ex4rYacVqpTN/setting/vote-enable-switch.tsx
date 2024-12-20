"use client";
import { Switch } from "@/components/ui/switch";
import client from "@/lib/axios";
import { useEffect, useState } from "react";

export function VoteEnableSwitch() {
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSwitch = async () => {
        try {
            setLoading(true);
            const response = await client.put("/setting", {
                is_vote_open: !enabled,
            });

            setEnabled(response.data.is_vote_open);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const response = await client.get("/setting");
                setEnabled(response.data.is_vote_open);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSetting();
    }, []);

    return (
        <div className="w-full md:w-1/2 flex justify-between items-center space-x-2 border rounded p-4">
            <div className="space-y-0.5">
                <div className="font-medium">Voting System</div>
                <div className="text-sm text-gray-500">
                    Toggle to enable or disable the voting system
                </div>
            </div>
            <div>
                <Switch
                    disabled={loading}
                    checked={enabled}
                    onCheckedChange={handleSwitch}
                />
            </div>
        </div>
    );
}
