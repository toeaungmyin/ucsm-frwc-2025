'use client'

import { Voter } from '@prisma/client'
import React, { useState } from 'react'
import TableHeader from './table-header';
import { columns } from "./columns";
import { DataTable } from '@/components/data.table';

export default function VotersTable({ data }: { data: Voter[] }) {
    const [voters, setVoters] = useState(data);
    
    return (
        <>
            <TableHeader setVoters={setVoters} />
            {voters && <DataTable columns={columns} data={voters} />}
        </>
    );
}
