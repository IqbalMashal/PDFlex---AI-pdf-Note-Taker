import React from 'react';

export default function PdfViewer({ fileUrl }) {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`}
        width="100%"
        height="100%"
        className="h-full w-full"
        style={{ border: "none", margin: 0, padding: 0 }}
        title="PDF Viewer" // Added title for accessibility
      />
    </div>
  );
}

{/* <div>
  <iframe src={fileUrl+"#toolbar=0"} height="90vh" width="100%" className='h-[90vs]'/>
</div> */}