"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image,
  Heading1,
  Heading2,
  Quote,
  Code,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('edit');
  
  // In a real app, you would use a proper rich text editor like TipTap or SlateJS
  // This is a simplified version for demonstration
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-wrap gap-1 border-b pb-2">
            <div className="flex gap-1 mr-2">
              <Button variant="ghost" size="icon">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heading2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-1 mr-2">
              <Button variant="ghost" size="icon">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-1 mr-2">
              <Button variant="ghost" size="icon">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-1 mr-2">
              <Button variant="ghost" size="icon">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Quote className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-1">
              <Button variant="ghost" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Code className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="ml-auto">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>
        
        <TabsContent value="edit" className="min-h-[300px] mt-4">
          <div
            className="min-h-[300px] p-4 border rounded-md"
            contentEditable
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="min-h-[300px] mt-4">
          <div className="border rounded-md p-4 min-h-[300px] prose dark:prose-invert max-w-none">
            {value ? (
              <div dangerouslySetInnerHTML={{ __html: value }} />
            ) : (
              <p className="text-muted-foreground">Preview will appear here...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}