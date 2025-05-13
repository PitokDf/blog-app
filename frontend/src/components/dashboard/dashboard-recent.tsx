"use client";

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
export interface RecentPostType {
  id: number
  title: string
  slug: string
  author: string
  date: string
  views: number
}

export function DashboardRecent() {
  const [recentPosts, setRecentPosts] = useState<RecentPostType[]>([])

  useEffect(() => {
    try {
      const getData = async () => {
        const res = (await axiosInstance.get("/dashboard/recent-posts")).data.data
        setRecentPosts(res)
      }

      getData()
    } catch (error) {
      console.log(error);

    }

  }, [])
  return (
    <Tabs defaultValue="posts" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="posts" className="mt-0">
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Card key={post?.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/post/${post.slug}`} className="hover:underline">
                      <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                    </Link>
                    <CardDescription>
                      {formatDistanceToNow(post.date, { addSuffix: true })} by {post.author}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="pt-2 pb-4 flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </div>
                </div>
                <Link href={`/post/${post.slug}`} passHref>
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}