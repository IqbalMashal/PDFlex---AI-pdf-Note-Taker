import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtension from "./EditorExtension";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const TextEditor = forwardRef(({ fileId }, ref) => {
    const notes = useQuery(api.notes.GetNotes, { fileId: fileId });
    const saveNotes = useMutation(api.notes.AddNotes);
    const { user } = useUser();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start Taking your notes here...",
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "focus:outline-none h-screen p-5",
            },
        },
    });

    // Load existing notes
    useEffect(() => {
        if (editor && notes) {
            editor.commands.setContent(notes);
        }
    }, [notes, editor]);

    // Expose the save function to parent
    useImperativeHandle(ref, () => ({
        saveNotes: () => {
            if (editor) {
                saveNotes({
                    notes: editor.getHTML(),
                    fileId: fileId,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                });
            }
        },
    }));

    return (
        <div>
            <EditorExtension editor={editor} />
            <div className="overflow-scroll h-[88vh]">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
});

export default TextEditor;
