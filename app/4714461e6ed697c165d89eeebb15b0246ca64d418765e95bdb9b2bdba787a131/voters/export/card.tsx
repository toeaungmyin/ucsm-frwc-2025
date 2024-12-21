import { Voter } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
import QRCode from "react-qr-code";
import ucsm_logo from '@/components/assets/images/logo_ucsm.png'

export default function Card({ data }: { data: Voter }) {
    const [host, setHost] = React.useState("");

    React.useEffect(() => {
        setHost(window.location.host);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-2 bg-cyan-500 px-2 py-2">
            <div className="flex flex-col gap-1 items-center">
                <Image
                    src={ucsm_logo}
                    className="aspect-square object-contain w-12 h-auto"
                    alt="UCSM_LOGO"
                    width={100}
                    height={0}
                />

                <h1 className="font-rubik font-bold text-2xl">UCSM</h1>
                <h2 className="font-mono font-bold text-lg">2024-2025</h2>
                <h2 className="font-mono font-bold text-lg">Fresher Welcome</h2>
            </div>
            <div className="font-mono font-bold text-lg mb-3 italic tracking-tighter">
                <span className="lowercase">Lucky Number - </span>
                <span className="tracking-wide">{data.serial}</span>
            </div>
            <div className="bg-white p-2">
                <QRCode
                    value={`${host}?code=${data.id}`}
                    size={128}
                    level="Q"
                />
            </div>
        </div>
    );
}
