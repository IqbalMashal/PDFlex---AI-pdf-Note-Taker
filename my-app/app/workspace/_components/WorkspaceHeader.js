import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function WorkspaceHeader({ fileName, onSave }) {
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
      <h2 className="font-bold text-lg text-gray-800">{fileName}</h2>

      {/* Right Section - Save Button & User */}
      <div className="flex items-center gap-4">
        <Button 
          className="bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={onSave} // Call the save function when clicked
        >
          Save
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
