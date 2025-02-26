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
  const { user } = useUser();
  const path = usePathname();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div className="shadow-lg h-screen bg-white text-blue-900 flex flex-col items-center p-5 border-r border-blue-200">
      {/* Logo */}
      <div className="mb-8">
        <Image src="/logo.png" alt="Logo" width={170} height={120} />
      </div>

      {/* Upload PDF Button */}
      <UploadPdfDialog isMaxFile={fileList?.length >= 5}>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
          Upload PDF
        </Button>
      </UploadPdfDialog>

      {/* Menu Items */}
      <div className="w-full mt-8 space-y-3">
        <Link href="/dashboard">
          <div
            className={`flex items-center gap-3 p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-200 ${
              path === "/dashboard" ? "bg-blue-200" : ""
            }`}
          >
            <Layout className="text-blue-600" />
            <h2 className="font-medium">Workspace</h2>
          </div>
        </Link>

        <Link href="/dashboard/upgrade">
          <div
            className={`flex items-center mt-8 gap-3 p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-200 ${
              path === "/dashboard/upgrade" ? "bg-blue-200" : ""
            }`}
          >
            <Shield className="text-blue-600" />
            <h2 className="font-medium">Upgrade</h2>
          </div>
        </Link>
      </div>

      {/* Storage Progress */}
      <div className="absolute bottom-10 w-[80%] text-center bg-blue-50 p-4 rounded-xl shadow-md">
        <Progress value={(fileList?.length / 5) * 100} className="h-2 bg-blue-300" />
        <p className="text-sm mt-2 font-medium text-blue-800">
          {fileList?.length} out of 5 PDFs Uploaded
        </p>
        <p className="text-xs text-blue-600 mt-2">Upgrade to upload more PDFs</p>
      </div>
    </div>
  );
}
