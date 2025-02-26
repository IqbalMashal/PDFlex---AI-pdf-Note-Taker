import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-end items-center bg-white shadow-md px-6 py-3 border-b border-blue-200">
      <div className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-all duration-300">
        <UserButton />
      </div>
    </div>
  );
}
