import { Metadata } from 'next';
import { PostEditor } from '@/components/posts/post-editor';

export const metadata: Metadata = {
  title: 'Create Post | Content Hub Admin',
  description: 'Create a new blog post',
};

export default function CreatePostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post for your content hub
        </p>
      </div>
      
      <PostEditor />
    </div>
  );
}