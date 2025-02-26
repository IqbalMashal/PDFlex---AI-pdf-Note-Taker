'use client'
import Image from 'next/image';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import React from 'react'
import { api } from "@/convex/_generated/api";
import Link from 'next/link';

export default function Dashboard() {
    const { user } = useUser();
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    });

    return (
        <div className='p-5'>
            <h2 className='font-medium text-2xl text-blue-600 mb-4'>Workspace</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>
                {fileList?.length > 0 ? (
                    fileList.map((file) => (
                        <Link key={file.fileId} href={`/workspace/${file.fileId}`}>
                            <div className='flex p-5 shadow-lg rounded-md flex-col items-center justify-center border border-blue-300 cursor-pointer hover:scale-105 transition-all bg-white'>
                                <Image src='/pdf1.png' alt='file' width={40} height={40} />
                                <h2 className='mt-3 font-medium text-lg text-blue-800'>{file?.fileName}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className='bg-slate-200 rounded-md h-[150px] animate-pulse'></div>
                    ))
                )}
            </div>
        </div>
    );
}
