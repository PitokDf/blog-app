import { BookOpen } from "lucide-react";
import Link from "next/link";

export function FooterBlog() {
    return (
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
    )
}