import React from 'react'
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';

export default function WorkspaceHeader() {
  return (
      <div className="p-4 flex justify-between shadow-md h-90">
        <Image src={"/logo.png"} alt="Logo" width={170} height={90} />
        <UserButton/>
      </div>
  )
}
