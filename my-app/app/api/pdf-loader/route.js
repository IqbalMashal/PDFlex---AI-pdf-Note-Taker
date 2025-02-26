
import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL); // Ensure proper parsing
        const pdfUrl = searchParams.get("pdfUrl");

        if (!pdfUrl) {
            return NextResponse.json({ error: "Missing pdfUrl parameter" }, { status: 400 });
        }

        const response = await fetch(pdfUrl);
        if (!response.ok) {
            return NextResponse.json({ 
                error: `Failed to fetch PDF: ${response.statusText}` 
            }, { status: response.status });
        }

        const blob = await response.blob();
        const file = new File([blob], "file.pdf", { type: "application/pdf" }); // Convert blob to file
        const loader = new WebPDFLoader(file);
        const docs = await loader.load();
        const pdfTextContent = docs.map(doc => doc.pageContent).join(" ");


        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000, // Reduce chunk size for more splits
            chunkOverlap: 20, // Increase overlap for context retention
            separators: ["\n\n", "\n", " ", ""], // Explicitly define split points
          });

        const texts = [];
        for (const doc of docs) {
        const pageTexts = await textSplitter.splitText(doc.pageContent);
        texts.push(...pageTexts);
        }
        return NextResponse.json({ result: texts });
    } catch (error) {
        console.error("PDF processing error:", error);
        return NextResponse.json({ 
            error: `PDF processing failed: ${error.message}` 
        }, { status: 500 });
    }
}

