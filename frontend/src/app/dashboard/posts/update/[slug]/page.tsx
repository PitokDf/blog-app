
import { PostEditor } from '@/components/posts/post-editor';
import axiosInstance from '@/lib/axios';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params;
  console.log(slug);

  // Contoh fetch data post berdasarkan slug
  const post = (await axiosInstance.get(`/posts/${slug}`)).data;
  if (!post) return {};
  return {
    title: post.data.title,
    description: post.data.summary,
    openGraph: {
      title: post.data.title,
      description: post.data.summary
    },
    twitter: {
      card: 'summary_large_image',
      title: post.data.title,
      description: post.data.summary,
    },
  };
}

export default async function UpdatePostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let post: any;
  // contoh fetch data dari API/DB
  try {
    const res = (await axiosInstance.get(`/posts/${slug}`)).data;
    post = res.data

    if (!res.success) return notFound()
  } catch (error) {
    if (!post) {
      return notFound();
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Update Post</h1>
        <p className="text-muted-foreground">
          Edit blog post for your content hub
        </p>
      </div>

      <PostEditor
        isEdit={true}
        defaultValues={
          { content: post.content, selectedCategories: post.category, slug: post.slug, summary: post.summary, title: post.title }
        }
        id={post.id}
      />
    </div>
  );
}