"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { PostsFilter } from './posts-filter';
import axiosInstance from '@/lib/axios';
import { DataTable } from '../ui/data-table';
import { DeleteConfirmDialog } from '../ui/delete-confirm-dialog';
import { useToast } from '@/hooks/use-toast';


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
  const { toast } = useToast();
  const [currentPost, setCurrentPost] = useState<{ id: number, title: string } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [data, setData] = useState<DataPost[]>([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    try {
      setLoadingData(true)
      const getData = async () => {
        const res = (await axiosInstance.get("/posts")).data.data
        setData(res)
      }

      getData()
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false)
    }
  }, [])

  const handleDelete = async () => {
    try {
      const hapusData = async () => {
        const res = await axiosInstance.delete(`/posts/${currentPost?.id}`)
        setData(data.filter((item) => item.id !== currentPost?.id))
        if (res.data.success) {
          toast({
            description: `${res.data.message}`
          })
          setCurrentPost(null)
        }
      }

      hapusData()
    } catch (error) {
      toast({
        description: "Terjadi masalah saat menghapus post"
      })
    }
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/posts/create">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      <DataTable
        isLoading={loadingData}
        data={data}
        columns={[
          {
            header: "Title", accessorKey: "title",
            cell: (item) => (
              <Link href={`/post/${item.slug}`} target='_blank'>{item.title}</Link>
            )
          },
          { header: "Author", accessorKey: "author" },
          {
            header: "Category", accessorKey: "category",
            cell: (item) => (
              <>
                {
                  item.category.length > 0 ? (
                    item.category.slice(0, 2).map((categori) => (
                      <Badge variant={'default'} className='mr-2'>
                        {categori}
                      </Badge>
                    ))) : (
                    <span className="text-muted-foreground">No categories set</span>
                  )}
              </>
            )

          },
          {
            header: "Created", accessorKey: "publishedAt",
            cell: (item) => (
              <>
                {item.publishedAt ? format(item.publishedAt, 'MMM d, yyyy') : '-'}
              </>
            )
          },
          {
            header: "Actions", accessorKey: "id",


            cell: (item) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/posts/update/${item.slug}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    setCurrentPost({ id: item.id, title: item.title })
                    setDeleteDialogOpen(true)
                  }} className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        ]}
      />
      {
        deleteDialogOpen && currentPost?.id! && (
          <DeleteConfirmDialog
            title='Konfirmasi Delete'
            description={`Yakin ingin menghapus post "${currentPost.title}", proses tidak akan bisa dikembalikan.`}
            onConfirm={handleDelete}
            onOpenChange={setDeleteDialogOpen}
            open={deleteDialogOpen}
            titleButton='Delete'
          />
        )
      }
    </div>
  );
}