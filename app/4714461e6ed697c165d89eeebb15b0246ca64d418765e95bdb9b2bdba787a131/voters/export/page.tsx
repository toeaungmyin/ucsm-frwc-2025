import React from 'react'
import { get_voters } from '@/app/lib/action';
import { Voter } from '@prisma/client';
import PdfExport from './pdf-export';

export default async function page() {
    const data = (await get_voters()) as Voter[];

    return (
        <PdfExport data={data} />
    )
}
