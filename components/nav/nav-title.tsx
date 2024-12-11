import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ucsm_logo from '@/components/assets/images/logo_ucsm.png'
export default function Navtitle() {
  return (
      <Link href={"/dashboard"} className="px-4 py-2 flex gap-2 w-full">
          <Image src={ucsm_logo} className='aspect-square object-contain w-12 h-auto' alt="UCSM_LOGO" width={100} height={0} />
          <h1 className='font-medium font-rubik text-lg'>UCSM VOTING DASHBOARD</h1>
      </Link>
  );
}
