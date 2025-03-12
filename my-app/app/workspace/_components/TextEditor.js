import React, { useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtension from "./EditorExtension";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const TextEditor = forwardRef(({ fileId }, ref) => {
    const [isEditorReady, setIsEditorReady] = useState(false); // Track editor readiness
    const notes = useQuery(api.notes.GetNotes, { fileId: fileId });
    const saveNotes = useMutation(api.notes.AddNotes);
    const { user } = useUser();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start taking your notes here...",
            }),
        ],
        content: "", // Initialize with empty content
        editorProps: {
            attributes: {
                class: "focus:outline-none p-5 min-h-[88vh]",
            },
        },
        onUpdate: ({ editor }) => {
            // Optional: Auto-save logic can be added here
        },
    });

    // Load existing notes into the editor
    useEffect(() => {
        if (editor && notes && !isEditorReady) {
            editor.commands.setContent(notes);
            setIsEditorReady(true); // Mark editor as ready after loading notes
        }
    }, [notes, editor, isEditorReady]);

    // Expose the save function to the parent component
    useImperativeHandle(ref, () => ({
        saveNotes: async () => {
            if (editor) {
                try {
                    await saveNotes({
                        notes: editor.getHTML(),
                        fileId: fileId,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                    });
                    console.log("Notes saved successfully!");
                } catch (error) {
                    console.error("Failed to save notes:", error);
                }
            }
        },
    }));

    // Handle hydration issues by ensuring the editor is only rendered on the client
    if (typeof window === "undefined") {
        return null; // Render nothing on the server
    }

    return (
        <div className="w-full">
            <EditorExtension editor={editor} />
            <div className="overflow-y-auto h-[88vh] border rounded-lg">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
});

TextEditor.displayName = "TextEditor"; // Add display name for debugging
export default TextEditor;