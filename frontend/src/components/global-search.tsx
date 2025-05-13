"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command';
import {
  FileText,
  User,
  FolderArchive,
  Tag,
  MessageSquare,
  Calendar,
  Smile,
  Calculator,
  CreditCard,
  Settings
} from 'lucide-react';

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd> {"                       "} to search a feature
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Posts">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/posts/create'))}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Create New Post</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/posts'))}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>View All Posts</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Categories & Tags">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/categories'))}
            >
              <FolderArchive className="mr-2 h-4 w-4" />
              <span>Manage Categories</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/tags'))}
            >
              <Tag className="mr-2 h-4 w-4" />
              <span>Manage Tags</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Users & Comments">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/users'))}
            >
              <User className="mr-2 h-4 w-4" />
              <span>View Users</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/comments'))}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Moderate Comments</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}