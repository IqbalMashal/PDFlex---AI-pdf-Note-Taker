"use client"; // Ensure it's a client component

import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ Works for App Router
import { FiSave, FiHome } from "react-icons/fi"; // Icons for better UX

export default function WorkspaceHeader({ fileName, onSave }) {
  const router = useRouter(); // ✅ Router hook

  return (
    <div className="p-4 flex justify-between items-center bg-white shadow-md border-b sticky top-0 z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-4">
        <Image 
          src="/logo.png" // Replace with your actual logo path
          alt="Logo"
          width={90}
          height={90}
          className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push("/")} // Navigate to home on logo click
        />
      </div>

      {/* Center - File Name */}
      <h2 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg text-blue-600 truncate max-w-[40%]">
        {fileName}
      </h2>

      {/* Right Section - Save Button, Dashboard Button & User */}
      <div className="flex items-center gap-4">
        <Button 
          className="bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
          onClick={onSave} // Call the save function when clicked
        >
          <FiSave className="h-5 w-5" /> {/* Save icon */}
          Save
        </Button>
        <Button 
          className="bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
          onClick={() => router.push('/dashboard')} // ✅ Now works
        >
          <FiHome className="h-5 w-5" /> {/* Dashboard icon */}
          Dashboard
        </Button>
        <div className="flex items-center gap-6">
          <UserButton appearance={{ variables: { colorPrimary: '#3b82f6' } }} />
        </div>
      </div>
    </div>
  );
}