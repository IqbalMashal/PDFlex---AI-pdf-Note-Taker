"use client"

import { useParams } from 'next/navigation';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import { api } from "@/convex/_generated/api";
import React, { useEffect } from 'react';
import { useQuery } from 'convex/react';
import TextEditor from '../_components/TextEditor';

export default function Workspace() {
    const { fileId } = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
    });

    // Reference to the TextEditor instance
    let textEditorRef = null;

    // Function to save notes
    const handleSave = () => {
        if (textEditorRef) {
            textEditorRef.saveNotes();
        }
    };

    return (
        <div>
            {/* Pass handleSave to the header */}
            <WorkspaceHeader fileName={fileInfo?.fileName} onSave={handleSave} /> 

            <div className="grid grid-cols-2 gap-5">
                <div>
                    {/* Pass the reference to TextEditor */}
                    <TextEditor fileId={fileId} ref={(ref) => (textEditorRef = ref)} />
                </div>
                <div>
                    <PdfViewer fileUrl={fileInfo?.fileUrl} />
                </div>
            </div>
        </div>
    );
}
