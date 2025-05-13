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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:rotate-6 transition-transform duration-300" />
                    <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 tracking-tight">
                        BlogSphere
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors">
                            Masuk
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md dark:shadow-none transition-colors">
                            Daftar Sekarang
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 container mx-auto py-10 ">
                <div className="max-w-4xl mx-auto">
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

                        <div className="prose dark:prose-invert max-w-none">
                            <QuillViewer html={post.content.replace(/\n/g, '<br>')} />
                        </div>
                    </article>
                </div>
            </main>
            <footer className="bg-gray-100 dark:bg-gray-800 mt-20 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-6 md:mb-0">
                            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            <span className="font-bold text-xl">BlogSphere</span>
                        </div>
                        <div className="flex gap-8">
                            <Link href="/blog" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                                Blog
                            </Link>
                            <Link href="/about" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                                Tentang
                            </Link>
                            <Link href="/contact" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                                Kontak
                            </Link>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
                        <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
