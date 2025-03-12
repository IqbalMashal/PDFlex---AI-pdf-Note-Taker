import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

// Define metadata for the app
export const metadata = {
  title: "PDFlex - AI-Powered Note-Taking",
  description: "Revolutionize your note-taking with PDFlex. Harness the power of AI to extract, organize, and summarize your ideas effortlessly.",
  authors: [{ name: "Iqbal Mashal", url: "https://github.com/IqbalMashal" }], // Add author information
  keywords: ["AI note-taking", "PDF summarization", "productivity tools"], // Add relevant keywords
};

// Load the Outfit font
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          {/* Wrap children with Provider for context or state management */}
          <Provider>
            {children}
          </Provider>
          
          {/* Add Toaster for notifications */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}