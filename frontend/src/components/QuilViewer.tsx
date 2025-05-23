'use client';
import React from 'react';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/monokai-sublime.css';

interface Props { html: string; }

export default function QuillViewer({ html }: Props) {
    const cleanHtml = DOMPurify.sanitize(html, { ADD_ATTR: ["class", "id"], MATHML_TEXT_INTEGRATION_POINTS: { mText: true } });
    return (
        <div className="ql-editor ql-snow" style={{ minHeight: "max-content" }}>
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>

    );
}
