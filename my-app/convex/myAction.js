import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai"; // Add missing import

export const ingest = action({
  args: {
    splitText: v.array(v.string()), // Fixed schema
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const embeddingOptions = {
        apiKey: ctx.env.GOOGLE_API_KEY, // Works in dev and prod
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT, // Use enum
        title: "Document title",
      };

      await ConvexVectorStore.fromTexts(
        args.splitText,
        { fileId: args.fileId }, // Use consistent metadata key
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


export const search = action({
    args: {
      query: v.string(),
      fileId: v.string(),
    },
    handler: async (ctx, args) => {
      try {
        const embeddingOptions = {
          apiKey: process.env.GOOGLE_API_KEY,
          model: "text-embedding-004",
          taskType: "RETRIEVAL_DOCUMENT",
          title: "Document title",
        };
  
        console.log("Performing search for:", args.query);
  
        // Create a vector store instance
        const vectorStore = new ConvexVectorStore(
          new GoogleGenerativeAIEmbeddings(embeddingOptions),
          { ctx }
        );
  
        // Perform similarity search
        const results = await vectorStore.similaritySearch(args.query, 1); // Fetch top 5 results
        console.log("Raw search results:", results);
  
        // Filter results by fileId
        const filteredResults = results.filter((q) => q.metadata?.id === args.fileId);
        console.log("Filtered results for fileId:", args.fileId, filteredResults);
  
        return JSON.stringify(filteredResults)
        
      } catch (error) {
        console.error("Search error:", error);
        throw new Error(`Search failed: ${error.message}`);
      }
    },
  });
  

// export const search = action({
//     args: {
//       query: v.string(),
//       fileId: v.string()
//     },
//     handler: async (ctx, args) => {
//       const embeddingOptions = {
//         apiKey: process.env.GOOGLE_API_KEY,
//         model: "text-embedding-004",
//         taskType: "RETRIEVAL_DOCUMENT", // Direct string value
//         title: "Document title",
//       };

//       const vectorStore = new ConvexVectorStore(
//         new GoogleGenerativeAIEmbeddings(embeddingOptions),
//         { ctx }
//       );

//     //   const results = await vectorStore.similaritySearch(args.query, 1);
//     //   const resultOne = results.filter(q => q.metadata.fileId == args.fileId);
//     //   console.log("resultOne",resultOne);

//     //   return JSON.stringify(resultOne)

//       const storedDocs = await ctx.db.query("documents").collect();
//       console.log("Stored documents:", storedDocs);

//     },
//   });