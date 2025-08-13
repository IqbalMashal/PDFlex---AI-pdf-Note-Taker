"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const { isLoaded, user } = useUser();
  const path = usePathname();

  // Only run query if user is loaded and has an email
  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    isLoaded && user?.primaryEmailAddress?.emailAddress
      ? { userEmail: user.primaryEmailAddress.emailAddress }
      : "skip"
  );

  const fileCount = fileList?.length || 0;


  if (!isLoaded) {
    return (
      <div className="shadow-lg h-screen bg-white text-blue-900 flex items-center justify-center">
        <p className="text-blue-700 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="shadow-lg h-screen bg-white text-blue-900 flex flex-col items-center p-5 border-r border-blue-200 relative">
      {/* Logo */}
      <Link href={"/"}>
        <div className="mb-8 cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={170} height={120} priority />
        </div>
      </Link>

      {/* Upload PDF Button */}
      <UploadPdfDialog isMaxFile={fileCount >= 5}>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
          Upload PDF
        </Button>
      </UploadPdfDialog>

      {/* Menu Items */}
      <nav className="w-full mt-8 space-y-3">
        <SidebarLink
          href="/dashboard"
          icon={<Layout className="text-blue-600" />}
          label="Workspace"
          active={path === "/dashboard"}
        />
        <SidebarLink
          href="/dashboard/upgrade"
          icon={<Shield className="text-blue-600" />}
          label="Upgrade"
          active={path === "/dashboard/upgrade"}
        />
      </nav>

      {/* Storage Progress */}
      <div className="absolute bottom-10 w-[80%] text-center bg-blue-50 p-4 rounded-xl shadow-md">
        <Progress value={(fileCount / 5) * 100} className="h-2 bg-blue-300" />
        <p className="text-sm mt-2 font-medium text-blue-800">
          {fileCount} out of 5 PDFs Uploaded
        </p>
        <p className="text-xs text-blue-600 mt-2">
          Upgrade to upload more PDFs
        </p>
      </div>
    </div>
  );
}

const SidebarLink = ({ href, icon, label, active }) => {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-100 ${
          active ? "bg-blue-200" : ""
        }`}
      >
        {icon}
        <h2 className="font-medium">{label}</h2>
      </div>
    </Link>
  );
};
