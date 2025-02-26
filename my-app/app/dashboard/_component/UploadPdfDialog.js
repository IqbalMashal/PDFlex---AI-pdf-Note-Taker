"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDB);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  const [open, setOpen] = useState(false)

  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }
  
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const postUrl = await generateUploadUrl();
      console.log("Upload URL:", postUrl); // Log the upload URL
  
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
  
      console.log("Fetch response status:", result.status); // Log the response status
  
      if (!result.ok) throw new Error("Upload failed");
  
      const { storageId } = await result.json();
      console.log("Storage ID:", storageId); // Log the storage ID
  
      const fileId = uuidv4();
      const fileUrl = await getFileUrl({ storageId });
  
      console.log("File URL:", fileUrl); // Log the file URL
  
      if (!fileUrl) throw new Error("Failed to retrieve file URL");
  
      const createdBy = user?.id || "anonymous";
  
      const resp = await addFileEntry({
        fileId,
        storageId,
        fileName: fileName || "Untitled file",
        fileUrl,
        createdBy,
      });
  
      console.log("File uploaded successfully:", resp);
      alert("File uploaded successfully!");
  
      // Fetch PDF content and embed it
      const ApiResp = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
      console.log("API Response for PDF loader:", ApiResp.data.result); // Log the API response
  
      const embadedResult = await embeddDocument({
        splitText: ApiResp.data.result,
        fileId: fileId
      });
  
      console.log("Embedding result:", embadedResult); // Log the embedding result
  
    } catch (error) {
      console.error("Upload or embedding failed:", error); // Log the error details
      setError(`Failed to upload or process file: ${error.message}`); // Set error message with detail
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        onClick={() => setOpen(true)}>
           Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a PDF File</DialogTitle>
          <DialogDescription>
            Select a file to upload and provide a name.
          </DialogDescription>
        </DialogHeader>

        {/* File Upload Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Select a File:</h2>
            <input
              type="file"
              accept="application/pdf"
              className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              onChange={onFileSelect}
            />
          </div>

          {/* File Name Input */}
          <div>
            <label className="text-sm font-medium text-gray-700">File Name *</label>
            <Input
              placeholder="Enter file name"
              onChange={(e) => setFileName(e.target.value)}
              value={fileName}
              className="mt-1"
            />
          </div>

          {/* Error Message Display */}
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex justify-end space-x-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            onClick={onUpload} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
}
