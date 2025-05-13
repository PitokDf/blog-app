import { Metadata } from 'next';
import { PostsList } from '@/components/posts/posts-list';

export const metadata: Metadata = {
  title: 'Posts | Content Hub Admin',
  description: 'Manage all your blog posts',
};

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">
          Create and manage all your blog posts
        </p>
      </div>
      
      <PostsList />
    </div>
  );
}