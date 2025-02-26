import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { v } from "convex/values";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const embeddingOptions = {
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: "RETRIEVAL_DOCUMENT", // Direct string value
        title: "Document title",
      };

      await ConvexVectorStore.fromTexts(
        args.splitText,
        { id: args.fileId },
        new GoogleGenerativeAIEmbeddings(embeddingOptions),
        { ctx }
      );

      return "Completed";
    } catch (error) {
      console.error("Document embedding error:", error);
      throw new Error(`Failed to embed document: ${error.message}`);
    }
  },
});