import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";

export default function SideBar() {
  return (
    <div className="shadow-lg h-screen bg-white text-blue-900 flex flex-col items-center p-5 border-r border-blue-200">
      {/* Logo */}
      <div className="mb-8">
        <Image src={"/logo.png"} alt="Logo" width={170} height={120} />
      </div>

      {/* Upload PDF Button */}
      <UploadPdfDialog>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
            Upload PDF
        </Button>
      </UploadPdfDialog>

      {/* Menu Items */}
      <div className="w-full mt-8">
        <div className="flex items-center gap-3 p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-200">
          <Layout className="text-blue-600" />
          <h2 className="font-medium">Workspace</h2>
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="w-full mt-6">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
          Upgrade
        </Button>

        <div className="flex items-center gap-3 p-3 mt-3 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-200">
          <Shield className="text-blue-600" />
          <h2 className="font-medium">Upgrade Plan</h2>
        </div>
      </div>

      {/* Storage Progress */}
      <div className="absolute bottom-10 w-[80%] text-center bg-blue-50 p-4 rounded-xl shadow-md">
        <Progress value={33} className="h-2 bg-blue-300" />
        <p className="text-sm mt-2 font-medium text-blue-800">2 out of 5 PDFs Uploaded</p>
        <p className="text-xs text-blue-600 mt-2">Upgrade to upload more PDFs</p>
      </div>
    </div>
  );
}
