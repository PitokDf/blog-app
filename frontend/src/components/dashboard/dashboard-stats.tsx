'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axiosInstance from '@/lib/axios';
import { FileText, Eye, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function DashboardStats() {
  const [stats, setStats] = useState<{ userCount: number, viewCount: number, postCount: number }>()

  useEffect(() => {
    try {
      const fetc = async () => {
        const res = (await axiosInstance.get("/dashboard/stats")).data.data
        setStats(res)
      }

      fetc()
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <CardStats Icon={Users} title='Total Users' value={stats?.userCount.toString()!} />
      <CardStats Icon={FileText} title='Total Posts' value={stats?.postCount.toString()!} />
      <CardStats Icon={Eye} title='Total Views' value={stats?.viewCount.toString()!} />
    </div>
  );
}

function CardStats({ Icon, title, value }: { title: string, Icon: any, value: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}