"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Code,
  Quote
} from 'lucide-react';
import { Textarea } from '../ui/textarea';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('edit');

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newValue = beforeText + prefix + selectedText + suffix + afterText;
    onChange(newValue);

    // Set cursor position after formatting is applied
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = start + prefix.length + selectedText.length;
    }, 0);
  };

  const handleBold = () => insertMarkdown('**', '**');
  const handleItalic = () => insertMarkdown('*', '*');
  const handleUnorderedList = () => insertMarkdown('- ');
  const handleOrderedList = () => insertMarkdown('1. ');
  const handleLink = () => insertMarkdown('[', '](https://)');
  const handleImage = () => insertMarkdown('![alt text](', ')');
  const handleCode = () => insertMarkdown('```\n', '\n```');
  const handleQuote = () => insertMarkdown('> ');

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={handleBold}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleItalic}>
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleUnorderedList}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleOrderedList}>
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLink}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleImage}>
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCode}>
              <Code className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleQuote}>
              <Quote className="h-4 w-4" />
            </Button>
          </div>

          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="min-h-[300px] mt-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your post in Markdown..."
            className="min-h-[300px] font-mono resize-none"
          />
        </TabsContent>

        <TabsContent value="preview" className="min-h-[300px] mt-4">
          <div className="border rounded-md p-4 min-h-[300px] prose dark:prose-invert max-w-none">
            {value ? (
              <div dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }} />
            ) : (
              <p className="text-muted-foreground">Preview will appear here...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Very simple markdown parser for preview (in a real app, use a proper markdown library)
function parseMarkdown(markdown: string): string {
  // This is a very simplified parser, in a real app use a library
  let html = markdown;
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />');
  // Lists
  html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^[0-9]+\. (.*$)/gm, '<li>$1</li>');
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
  // Paragraphs
  html = html.replace(/\n\n(.*)/g, '<p>$1</p>');

  return html;
}