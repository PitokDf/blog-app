import { ModeToggle } from "@/components/mode-toggle";
import QuillViewer from "@/components/QuilViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { format } from "date-fns";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { slug } = params;
    // Contoh fetch data post berdasarkan slug
    const post = await fetch(`http://localhost:8080/api/posts/${slug}`).then(res => res.json());
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

export default async function PostPage({ params }: { params: { slug: string } }) {
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
        <div className="max-w-4xl mx-3 md:mx-auto">
            <Link href="/post" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Blog
            </Link>

            <article className="space-y-8">
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {post.category.map((category: any, index: number) => (
                            <Badge key={index} variant="secondary">
                                {category.name}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(post.publishedAt, 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-b py-4 italic text-muted-foreground">
                    {post.summary}
                </div>

                <div className="max-w-none">
                    <QuillViewer html={post.content.replace(/\n/g, '<br>')} />
                </div>
            </article>
        </div>
    );
}
