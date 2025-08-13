// "use client";

// import Image from "next/image";
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "convex/react";
// import React from "react";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";

// export default function Dashboard() {

//     const { user, isLoaded } = useUser(); // Track if user data is loaded
//     const fileList = useQuery(api.fileStorage.GetUserFiles, {
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//     });

//     // Handle hydration issues by ensuring user data is loaded
//     if (!isLoaded) {
//         return null; // Render nothing until user data is available
//     }

//     return (
//         <div className="p-5">
//             <h2 className="font-medium text-2xl text-blue-600 mb-4">Workspace</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
//                 {fileList?.length > 0 ? (
//                     fileList.map((file) => (
//                         <Link key={file.fileId} href={`/workspace/${file.fileId}`}>
//                             <div className="flex p-5 shadow-lg rounded-md flex-col items-center justify-center border border-blue-300 cursor-pointer hover:scale-105 transition-all bg-white">
//                                 <Image
//                                     src="/pdf1.png"
//                                     alt="file"
//                                     width={40}
//                                     height={40}
//                                     className="w-10 h-10"
//                                 />
//                                 <h2 className="mt-3 font-medium text-lg text-blue-800 truncate w-full text-center">
//                                     {file?.fileName}
//                                 </h2>
//                             </div>
//                         </Link>
//                     ))
//                 ) : (
//                     // Skeleton loading state
//                     Array.from({ length: 7 }).map((_, index) => (
//                         <div
//                             key={index}
//                             className="bg-slate-200 rounded-md h-[150px] animate-pulse"
//                         ></div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function Dashboard() {
    const { user, isLoaded } = useUser();
    const createUser = useMutation(api.user.createUser);
    
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
    });

    useEffect(() => {
        if (user) {
            CheckUser();
        }
    }, [user]);

    const CheckUser = async () => {
        const result = await createUser({
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            userName: user?.fullName
        });
    };

    // Handle hydration issues by ensuring user data is loaded
    if (!isLoaded) {
        return null; // Render nothing until user data is available
    }

    return (
        <div className="p-5">
            <h2 className="font-medium text-2xl text-blue-600 mb-4">Workspace</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
                {fileList?.length > 0 ? (
                    fileList.map((file) => (
                        <Link key={file.fileId} href={`/workspace/${file.fileId}`}>
                            <div className="flex p-5 shadow-lg rounded-md flex-col items-center justify-center border border-blue-300 cursor-pointer hover:scale-105 transition-all bg-white">
                                <Image
                                    src="/pdf1.png"
                                    alt="file"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10"
                                />
                                <h2 className="mt-3 font-medium text-lg text-blue-800 truncate w-full text-center">
                                    {file?.fileName}
                                </h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Skeleton loading state
                    Array.from({ length: 7 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-slate-200 rounded-md h-[150px] animate-pulse"
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
}