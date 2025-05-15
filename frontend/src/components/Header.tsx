'use client'

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export function HeaderBlog() {
    const { isLoggedIn } = useAuth()
    return (
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
                <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-extrabold md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 tracking-tight">
                    BlogSphere
                </span>
            </Link>

            <div className="flex items-center gap-3">
                {
                    !isLoggedIn ? (
                        <Link href="/login">
                            <Button variant="ghost" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md dark:shadow-none transition-colors">
                                Masuk
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/dashboard">
                            <Button variant="ghost" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md dark:shadow-none transition-colors">
                                To Dashboard
                            </Button>
                        </Link>
                    )
                }
            </div>
        </header>
    )
}