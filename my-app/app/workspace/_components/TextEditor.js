import React from 'react'
import { EditorContent,useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import EditorExtension from './EditorExtension'

export default function TextEditor() {

    const editor = useEditor({
        extensions: [StarterKit,

            Placeholder.configure({
                // Use a placeholder:
                placeholder: 'Start Taking your notes here...',

              }),
            ],
        content: '',
        editorProps:{
            attributes:{
                class:"focus:outline-none h-screen p-5"
            }
        }
      })

  return (
    <div>
        <div>
            <EditorExtension editor={editor}/>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}
