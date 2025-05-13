"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  FileText,
  FolderArchive,
  Tag,
  MessageSquare,
  Users,
  Settings,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

function NavItem({ href, icon: Icon, label, isCollapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const content = (
    <Link href={href} passHref>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="lg"
        className={cn(
          "w-full flex items-center justify-start h-12",
          isActive && "bg-secondary"
        )}
      >
        <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="ml-1">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

export function Sidebar({ open }: SidebarProps) {
  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/posts', icon: FileText, label: 'Posts' },
    { href: '/dashboard/categories', icon: FolderArchive, label: 'Categories' },
    { href: '/dashboard/users', icon: Users, label: 'Users' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-full bg-background border-r transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-center h-16 border-b">
        {open ? (
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">Content Hub</span>
          </div>
        ) : (
          <BookOpen className="h-6 w-6 text-primary" />
        )}
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isCollapsed={!open}
          />
        ))}
      </nav>
    </aside>
  );
}