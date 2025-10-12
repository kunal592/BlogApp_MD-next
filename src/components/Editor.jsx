// src/components/Editor.jsx
'use client'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function Editor({ value, onChange }) {
  return (
    <ReactQuill 
      theme="snow"
      value={value}
      onChange={onChange}
      className="bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg"
      modules={{
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['code-block'],
          ['clean']
        ],
      }}
    />
  )
}
