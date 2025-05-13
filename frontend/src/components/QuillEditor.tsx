'use client'

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

type QuillEditorProps = {
    value: string,
    onChange: (value: string) => void
}


const ReactQuill = dynamic(
    async () => {
        // Konfigurasi highlight.js: daftar bahasa yang lo butuh
        hljs.configure({ languages: ['javascript', 'typescript', 'css', 'html', "java"] });
        // Pasang hljs ke window agar Quill bisa akses
        // @ts-ignore
        window.hljs = hljs;

        const { default: RQ } = await import('react-quill');
        return RQ;
    },
    { ssr: false }
);

export function QuillEditor({ onChange, value }: QuillEditorProps) {
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            className='max-h-[400px]'
            preserveWhitespace
            modules={{
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean'],
                ],
                history: {
                    delay: 2500,
                    userOnly: true
                },
                syntax: true
            }} />
    )
}