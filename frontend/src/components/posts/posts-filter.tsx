"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

// Mock data
const authors = ['All Authors', 'Jane Smith', 'Mike Johnson', 'Sarah Lee', 'David Chen', 'Lisa Wang', 'John Miller', 'Emma Wilson'];
const categories = ['All Categories', 'Technology', 'Business', 'Design', 'Marketing'];
const tags = ['All Tags', 'Next.js', 'React', 'TypeScript', 'CSS', 'API', 'UI', 'UX', 'Web Dev'];
const statuses = ['All Statuses', 'Published', 'Draft'];

export function PostsFilter() {
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTag, setSelectedTag] = useState('All Tags');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  
  const resetFilters = () => {
    setSelectedAuthor('All Authors');
    setSelectedCategory('All Categories');
    setSelectedTag('All Tags');
    setSelectedStatus('All Statuses');
  };
  
  const hasActiveFilters = 
    selectedAuthor !== 'All Authors' ||
    selectedCategory !== 'All Categories' ||
    selectedTag !== 'All Tags' ||
    selectedStatus !== 'All Statuses';
  
  return (
    <Card className="border border-border">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Filter Posts</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-muted-foreground"
              onClick={resetFilters}
            >
              <X className="h-4 w-4 mr-1" /> 
              Clear filters
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {authors.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tag</label>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={resetFilters}>Reset</Button>
          <Button>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}