"use client";

import React from "react";
import {
  Bold,
  Italic,
  Code,
  Highlighter,
  Underline,
  Sparkles,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "@/configs/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const searchAi = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();

  const onAiClick = async () => {
    if (!editor) return;

    toast("AI is working...");

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    if (!selectedText.trim()) {
      toast.error("Please select text first.");
      return;
    }

    const res = await searchAi({
      query: selectedText,
      fileId: fileId,
    });

    const UnformattedAnswer = JSON.parse(res);
    let AllUnformattedAnswer = "";

    UnformattedAnswer?.forEach((item) => {
      AllUnformattedAnswer += item.pageContent + " ";
    });

    const MAX_CONTEXT_LENGTH = 500;
    const trimmedContext = AllUnformattedAnswer.substring(0, MAX_CONTEXT_LENGTH);

    const PROMPT = `Question: ${selectedText}  
    Given the following context, provide a **short, 1-2 sentence answer** in HTML format, followed by a supporting evidence quote from the source.  
    Context: ${trimmedContext}  
    **Format:**  
    - **Answer:** [Your short response]  
    - **Evidence:** [Relevant quote from the source]`;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const FinalAns = (await AiModelResult.response.text())
      .replace(/```html|```/g, "")
      .trim();

    editor.commands.setContent(
      editor.getHTML() + `<p><strong>Answer:</strong> ${FinalAns}</p>`
    );

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user.primaryEmailAddress?.emailAddress,
    });
  };

  return (
    editor && (
      <div className="p-5 border-b bg-white shadow-sm">
        <div className="control-group">
          <div className="button-group flex gap-3 flex-wrap">
            {/* Formatting Buttons */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <Bold />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <Italic />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
            >
              <Underline />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "text-blue-500" : ""}
            >
              <Strikethrough />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "text-blue-500" : ""}
            >
              <Code />
            </button>

            <button
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color: "#FFFF00" }).run()
              }
              className={editor.isActive("highlight") ? "text-blue-500" : ""}
            >
              <Highlighter />
            </button>

            {/* List & Blockquote */}
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "text-blue-500" : ""}
            >
              <List />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "text-blue-500" : ""}
            >
              <ListOrdered />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "text-blue-500" : ""}
            >
              <Quote />
            </button>

            {/* Undo/Redo */}
            <button onClick={() => editor.chain().focus().undo().run()}>
              <Undo />
            </button>

            <button onClick={() => editor.chain().focus().redo().run()}>
              <Redo />
            </button>

            {/* AI Button */}
            <button onClick={onAiClick} className="hover:text-blue-500">
              <Sparkles />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
