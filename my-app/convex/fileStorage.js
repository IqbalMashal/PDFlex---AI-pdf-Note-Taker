import { mutation, query } from "./_generated/server";
import { v } from "convex/values"; 

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDB = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      fileUrl: args.fileUrl,
      createdBy: args.createdBy,
    });
    return "Inserted";
  },
});

// ✅ Fixed typo (args instead of agrs)
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId); // ✅ Correctly using args.storageId
  },
});


export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId)) // ✅ Correct usage
      .unique();

    console.log("Query result:", res);
    return res;
  },
});

