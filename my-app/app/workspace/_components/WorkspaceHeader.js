"use client"; // Ensure it's a client component

import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ Works for App Router

export default function WorkspaceHeader({ fileName, onSave }) {
  const router = useRouter(); // ✅ Router hook

  return (
    <div className="p-4 flex justify-between items-center bg-white shadow-md border-b">
      {/* Left Section - Image */}
      <div className="flex items-center gap-4">
        <Image 
          src="/logo.png" // Replace with your actual logo path
          alt="Logo"
          width={90}
          height={90}
          className="rounded-full"
        />
      </div>

      {/* Center - File Name */}
      {/* Center - File Name (Absolute Centering) */}
      <h2 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg text-blue-600">
        {fileName}
      </h2>
      {/* Right Section - Save Button, Dashboard Button & User */}
      <div className="flex items-center gap-4">
        <Button 
          className="bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={onSave} // Call the save function when clicked
        >
          Save
        </Button>
        <Button 
          className="bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => router.push('/dashboard')} // ✅ Now works
        >
          Dashboard
        </Button>
        <div className="flex items-center gap-6">
          <UserButton appearance={{ variables: { colorPrimary: '#3b82f6' } }} />
        </div>
      </div>
    </div>
  );
}
