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

    useEffect(() => {
        console.log("this is fileId: ", fileId);
    }, [fileId]); // Changed to depend on fileId

    return (
        <div>
            <WorkspaceHeader /> 

            <div className='grid grid-cols-2 gap-5'>
                <div>
                    {/* You can add additional content or components here if needed */}
                    <TextEditor />
                </div>
                <div>
                    {/* Pass the fileUrl to the PdfViewer component */}
                    <PdfViewer fileUrl={fileInfo?.fileUrl} />
                </div>
            </div>
        </div>
    );
}