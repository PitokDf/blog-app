"use client";

import { useState, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QuillEditor } from '../QuillEditor';
import QuillViewer from '../QuilViewer';
import axiosInstance from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

type PostEditorProps = {
  isEdit?: boolean;
  defaultValues?: { title: string, slug: string, summary: string, content: string, selectedCategories: string[] };
  id?: number
}

export function PostEditor({ defaultValues, isEdit, id }: PostEditorProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState(isEdit ? defaultValues?.title : "");
  const [slug, setSlug] = useState(isEdit ? defaultValues?.slug : "");
  const [summary, setSummary] = useState(isEdit ? defaultValues?.summary : "");
  const [content, setContent] = useState(isEdit ? defaultValues?.content : "");
  const [categories, setCategories] = useState<{ value: string, label: string }[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(isEdit ? defaultValues?.selectedCategories.map((cate: any) => cate.id) || [] : []);
  const { toast } = useToast()

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axiosInstance.get("/categories")
        const cate = res.data.data as []

        const categoriesData = cate.map((category: any) => ({
          value: category.id,
          label: category.name
        }))

        setCategories(categoriesData)
      }

      getData()
    } catch (error) {
      console.log(error);

    }
  }, [])

  useEffect(() => {
    if (title) {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-'));
    }
  }, [title]);

  const handleCategorySelect = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };


  const handlePublish = async () => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/posts/${id}`, {
          "author_id": user?.id, slug, title, content, summary, categoryIds: selectedCategories
        })
        toast({ description: "Yee, post berhasil di diperbarui." })
      } else {
        await axiosInstance.post("/posts", {
          "author_id": user?.id, slug, title, content, summary, categoryIds: selectedCategories
        })
        toast({ description: "Yee, post berhasil di simpan." })
      }
      router.push("/dashboard/posts")
    } catch (error) {
      console.log(error);

      toast({ description: "Haha ada yang error nih, hehe :->" })
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex gap-2 items-center">
                <div className="text-sm text-muted-foreground">/</div>
                <Input
                  id="slug"
                  placeholder="post-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Brief summary of your post"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="min-h-[550px]">
        <CardContent className="p-6">
          <Tabs defaultValue='edit'>
            <div className="ml-auto">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='edit' className='min-h-max'>
              <QuillEditor value={content!} onChange={setContent} />
            </TabsContent>
            <TabsContent value='preview'>
              <QuillViewer html={content!} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.value}
                    variant={selectedCategories.includes(category.value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategorySelect(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end gap-2">
            <Button onClick={handlePublish}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}