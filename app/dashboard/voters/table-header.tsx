'use client'

import { Button } from '@/components/ui/button';
import React, { MouseEventHandler, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/assets/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import client from '@/lib/axios';
import { Voter } from '@prisma/client';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

type Inputs = {
    quantity: number;
}

type LodingStatus = {
    generate: boolean;
    delete: boolean;
    export: boolean;
};

export default function TableHeader({ setVoters }:{setVoters: React.Dispatch<React.SetStateAction<Voter[]>>}) {
    const [isLoding, setIsLoding] = useState<LodingStatus>({
        generate: false,
        delete: false,
        export: false,
    });

    const [open, setOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            setIsLoding({ ...isLoding, generate: true });
            const response = await client.post("/voters", data);
            setVoters((prev) => [...prev, ...response.data]);
            setOpen(false);
            toast({description: "Voters generated successfully"});
        } catch (error) {

            console.error(error);
            
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

        } finally {
            setIsLoding({ ...isLoding, generate: false });
        }
    };

    const handleDelete: MouseEventHandler = async () => {
        try {
            setIsLoding({ ...isLoding, delete: true });
            await client.delete("/voters");
            setVoters([]);
            toast({ description: "All voters deleted successfully" });
        } catch (error) {
            console.error(error);

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
            
        } finally {
            setIsLoding({ ...isLoding, delete: false });
        }
    };

    // const handleExport: MouseEventHandler = async () => { 
    //     try {
    //         setIsLoding({ ...isLoding, export: true });
            
    //     } catch (error) {
    //         console.log(error);
    //         toast({
    //             description: error?.message || "An error occured",
    //             variant: "destructive",
    //         });
    //     } finally {
    //         setIsLoding({ ...isLoding, export: false });
    //     }
    // }

    return (
        <div className="flex justify-between">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="uppercase" variant="default">
                        Generate
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Generate Voters</DialogTitle>
                        <DialogDescription>
                            Generate a specified number of voters
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center space-x-2"
                    >
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="quantity" className="sr-only">
                                Number of voters to generate
                            </Label>
                            <Input
                                id="quantity"
                                defaultValue="10"
                                type="number"
                                {...register("quantity", { required: true })}
                            />
                            {errors.quantity && (
                                <span className="text-red-500">
                                    {errors.quantity.message ||
                                        "This field is required"}
                                </span>
                            )}
                        </div>
                        <Button type="submit" size="sm" className="px-3">
                            {isLoding.generate ? (
                                <Icons.spinner className="animate-spin" />
                            ) : (
                                "Generate"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex gap-2">
                <Button
                    onClick={handleDelete}
                    className="uppercase"
                    variant="destructive"
                >
                    {isLoding.delete ? (
                        <Icons.spinner className="animate-spin" />
                    ) : (
                        "Delete"
                    )}
                </Button>
                <Link href={"/dashboard/voters/export"}>
                    <Button className="uppercase" variant="outline">
                        Export
                    </Button>
                </Link>
            </div>
        </div>
    );
}
