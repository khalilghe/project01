import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export function EmailEditor({ content, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            ['clean']
          ]
        },
      });

      quillRef.current.on('text-change', () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }

    if (quillRef.current) {
      quillRef.current.root.innerHTML = content;
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
      <div ref={editorRef} className="h-64" />
    </div>
  );
}

