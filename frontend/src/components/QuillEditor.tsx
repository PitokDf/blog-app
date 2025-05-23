'use client';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import 'quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const ReactQuill = dynamic(
  async () => {
    hljs.configure({ languages: ['javascript', 'typescript', 'css', 'html', 'java'] });

    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.hljs = hljs;
    }

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
      className="max-h-[400px]"
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
          userOnly: true,
        },
        syntax: true,
      }}
    />
  );
}
