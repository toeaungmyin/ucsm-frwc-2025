import { Icons } from '@/components/assets/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import client from '@/lib/axios';
import { Category, Prisma } from "@prisma/client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type CandidateWithVotes = Prisma.CandidateGetPayload<{
    include: { votes: true };
}>;

type Inputs = {
    nomineeId: string;
    name: string;
    category: Category;
    image: File | undefined;
};

type Props = {
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
    setCandidates: React.Dispatch<React.SetStateAction<CandidateWithVotes[]>>;
};

export default function TableHeader({
    category,
    setCategory,
    setCandidates
}: Props) {
    
    const [open, setOpen] = useState<boolean>(false);
    const [catInput, setCatInput] = useState<Category>(Category.KING);
    const [isLoding, setIsLoding] = useState(false);

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            nomineeId: "",
            name: "",
            category: Category.KING,
            image: undefined,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsLoding(true);

            const formData = new FormData();

            formData.append("nomineeId", data.nomineeId);
            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("image", data.image as Blob);

            const response = await client.post("/candidates", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setCandidates((prev) => [...prev, response.data]);
            setOpen(false);
            toast({ description: "Candidate generated successfully" });

            reset();
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
        } finally {
            setIsLoding(false);
        }
    };
    
    const handleCategoryChange = (value: Category) => { 
        setCatInput(value);
        setValue("category", value);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setValue("image", file);
        }
    };

    return (
        <div className="flex justify-between">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Candidate</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="font-roboto tracking-wide font-bold">
                                Create Candidate
                            </DialogTitle>
                            <DialogDescription>
                                Fill in the form below to create a new candidate
                                profile.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nominee Id
                                </Label>
                                <Input
                                    id="nomineeId"
                                    className="col-span-3"
                                    {...register("nomineeId", {
                                        required: true,
                                    })}
                                />
                                {errors.nomineeId && (
                                    <span className="col-span-3 col-start-2 text-xs text-red-500">
                                        {errors.nomineeId.message ||
                                            "This field is required"}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && (
                                    <span className="col-span-3 col-start-2 text-xs text-red-500">
                                        {errors.name.message ||
                                            "This field is required"}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="category"
                                    className="text-right"
                                >
                                    Category
                                </Label>
                                <Select
                                    value={catInput}
                                    onValueChange={(value: Category) =>
                                        handleCategoryChange(value)
                                    }
                                >
                                    <SelectTrigger className="w-[250px] md:w-[275px]">
                                        <SelectValue placeholder="select candidate" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Category).map(
                                            (cat, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={cat}
                                                >
                                                    {cat}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <span className="col-span-3 col-start-2 text-xs text-red-500">
                                        {errors.category.message ||
                                            "This field is required"}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">
                                    Image
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    className="col-span-3"
                                    onChange={(e) => handleFileChange(e)}
                                />
                                {errors.image && (
                                    <span className="col-span-3 col-start-2 text-xs text-red-500">
                                        {errors.image.message ||
                                            "This field is required"}
                                    </span>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                {isLoding ? (
                                    <Icons.spinner className="animate-spin" />
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Select
                value={category}
                onValueChange={(value: Category) => setCategory(value)}
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Candidate type" />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(Category).map((cat, index) => (
                        <SelectItem
                            className="font-rubik"
                            key={index}
                            value={cat.toString()}
                        >
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
