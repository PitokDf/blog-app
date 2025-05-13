"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { PostsFilter } from './posts-filter';
import axiosInstance from '@/lib/axios';

// Mock data
const posts = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    slug: 'getting-started-with-nextjs-15',
    author: 'Jane Smith',
    status: 'Published',
    publishedAt: new Date(2025, 4, 15),
    createdAt: new Date(2025, 4, 10),
    category: 'Technology',
  },
  {
    id: '2',
    title: 'The Complete Guide to Tailwind CSS',
    slug: 'complete-guide-tailwind-css',
    author: 'Mike Johnson',
    status: 'Draft',
    publishedAt: null,
    createdAt: new Date(2025, 4, 12),
    category: 'Design',
  },
  {
    id: '3',
    title: 'React Server Components Explained',
    slug: 'react-server-components-explained',
    author: 'Sarah Lee',
    status: 'Published',
    publishedAt: new Date(2025, 4, 8),
    createdAt: new Date(2025, 4, 5),
    category: 'Technology',
  },
  {
    id: '4',
    title: 'Building an API with Node.js',
    slug: 'building-api-with-nodejs',
    author: 'David Chen',
    status: 'Published',
    publishedAt: new Date(2025, 4, 6),
    createdAt: new Date(2025, 4, 3),
    category: 'Technology',
  },
  {
    id: '5',
    title: 'Introduction to TypeScript',
    slug: 'introduction-to-typescript',
    author: 'Lisa Wang',
    status: 'Draft',
    publishedAt: null,
    createdAt: new Date(2025, 4, 14),
    category: 'Technology',
  },
  {
    id: '6',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    author: 'John Miller',
    status: 'Published',
    publishedAt: new Date(2025, 4, 1),
    createdAt: new Date(2025, 3, 28),
    category: 'Business',
  },
  {
    id: '7',
    title: 'Designing for Accessibility',
    slug: 'designing-for-accessibility',
    author: 'Emma Wilson',
    status: 'Published',
    publishedAt: new Date(2025, 3, 25),
    createdAt: new Date(2025, 3, 20),
    category: 'Design',
  },
];

type DataPost = {
  id: number
  title: string
  slug: string
  author: string
  publishedAt: string
  category: string[]
  content: string
}

export function PostsList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<DataPost[]>([])

  useEffect(() => {
    try {
      const getData = async () => {
        const res = (await axiosInstance.get("/posts")).data.data
        setData(res)
      }

      getData()
    } catch (error) {
      console.log(error);

    }
  }, [])

  const filteredPosts = data.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button asChild>
            <Link href="/dashboard/posts/create">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && <PostsFilter />}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link
                      href={`/post/${post.slug}`}
                      className="hover:text-primary transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                  <TableCell className="hidden lg:table-cell ">{
                    post.category.length > 0 ? (
                      post.category.slice(0, 2).map((categori) => (
                        <Badge variant={'default'} className='mr-2'>
                          {categori}
                        </Badge>
                      ))) : (
                      <span className="text-muted-foreground">No categories set</span>
                    )}
                    {post.category.length > 2 && (
                      <Badge variant={'outline'} className='mr-2'>+{post.category.length - 2} more </Badge>
                    )}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {post.publishedAt ? format(post.publishedAt, 'MMM d, yyyy') : '-'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {format(post.publishedAt, 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/posts/update/${post.slug}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPosts.length}</span> of{" "}
          <span className="font-medium">{posts.length}</span> results
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}