import React, { useState, useEffect } from "react";

export default function PdfViewer({ fileUrl }) {
    const [isClient, setIsClient] = useState(false); // Track client-side rendering
    const [isIframeSupported, setIsIframeSupported] = useState(true); // Track iframe support
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    // Ensure component is only rendered on the client to avoid hydration issues
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle cases where the file URL is not provided
    if (!fileUrl) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Render nothing on the server to avoid hydration mismatches
    if (!isClient) {
        return null;
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-gray-100">
            {isIframeSupported ? (
                <>
                    {isLoading && (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                        width="100%"
                        height="100%"
                        className="h-full w-full"
                        style={{ border: "none", margin: 0, padding: 0, display: isLoading ? "none" : "block" }}
                        title="PDF Viewer"
                        aria-label="PDF Viewer"
                        onLoad={() => setIsLoading(false)} // Hide loader when iframe loads
                        onError={() => setIsIframeSupported(false)} // Handle iframe loading errors
                    />
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                    <p className="text-gray-600">Your browser does not support embedded PDFs.</p>
                    <a
                        href={fileUrl}
                        download
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Download PDF
                    </a>
                </div>
            )}
        </div>
    );
}