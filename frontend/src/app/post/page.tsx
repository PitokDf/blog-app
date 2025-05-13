"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  ArrowUpRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import axiosInstance from "@/lib/axios";


type Data = {
  id: number
  title: string
  slug: string
  author: string
  summary: string
  publishedAt: string
  category: string[]
  content: string
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [data, setData] = useState<Data[]>([])
  const [filteredPosts, setFilteredPosts] = useState(data);
  const [mounted, setMounted] = useState(false);


  // Filter posts based on search query and selected category
  useEffect(() => {
    const filtered = data.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || post.category.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, data]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axiosInstance.get("/posts")
        setData(res.data.data)
        console.log(data);
      }

      getData()
    } catch (error) {
      console.log(error);
    }
  }, [])

  if (!mounted) {
    return null;
  }

  const allCategories = Array.from(
    new Set(data.flatMap((cate) => cate.category))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* <BlogHeader />
       */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest articles, tutorials, and insights about web development, design, and technology.
            </p>
          </div>

          <div className="gap-6 mb-8">
            <div className="relative flex-1 mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-9 dark:bg-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <div className="bg-white w-full dark:bg-gray-800 rounded-lg shadow-sm p-3 flex flex-wrap gap-2 border">
                <span className="flex items-center text-sm font-medium mr-1">
                  <Filter className="mr-1 h-4 w-4" />
                  Categories:
                </span>
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {allCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your search criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link
                  href={`/post/${post.slug}`}
                  key={post.id}
                  className="group"
                >
                  <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.category.map(category => (
                          <Badge key={category} variant="secondary" className="font-normal">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                        {post.summary}
                      </p>
                      <div className="mt-auto pt-4 border-t flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(post.publishedAt, "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}