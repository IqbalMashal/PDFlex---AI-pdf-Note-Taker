import React from 'react'
import { Bold, Italic } from "lucide-react"

export default function EditorExtension({editor}) {
  return editor&&(
    <div className='p-5'>
        <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
        </div>
        </div>
    </div>
  )
}
