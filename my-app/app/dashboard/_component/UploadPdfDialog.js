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
import { toast } from "sonner";

export default function UploadPdfDialog({ children, isMaxFile }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDB);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const { user } = useUser();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const onFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(""); // Clear error on valid file selection
    } else {
      setError("Please select a valid PDF file.");
      setFile(null); // Reset file state
    }
  };

  const onUpload = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Generate upload URL
      const postUrl = await generateUploadUrl();
      console.log("Upload URL:", postUrl);

      // Step 2: Upload file to storage
      const uploadResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const { storageId } = await uploadResponse.json();
      console.log("Storage ID:", storageId);

      // Step 3: Get file URL
      const fileUrl = await getFileUrl({ storageId });
      if (!fileUrl) throw new Error("Failed to retrieve file URL");

      // Step 4: Add file entry to database
      const fileId = uuidv4();
      const createdBy = user?.primaryEmailAddress?.emailAddress || "anonymous";

      await addFileEntry({
        fileId,
        storageId,
        fileName: fileName || "Untitled file",
        fileUrl,
        createdBy,
      });

      // Step 5: Fetch PDF content and embed it
      const pdfLoaderResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
      console.log("PDF Loader Response:", pdfLoaderResponse.data.result);

      await embeddDocument({
        splitText: pdfLoaderResponse.data.result,
        fileId: fileId,
      });

      // Success
      toast.success("File uploaded and processed successfully!");
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("Upload or processing failed:", error);
      setError(`Failed to upload or process file: ${error.message}`);
      toast.error("Failed to upload or process file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          onClick={() => setOpen(true)}
          disabled={isMaxFile}
        >
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
            <label className="text-sm font-medium text-gray-700">Select a File:</label>
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
            onClick={onUpload}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}