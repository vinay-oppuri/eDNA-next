'use client';

import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Database,
  Search,
  Star,
  Settings,
  PlusCircle,
  FileText,
  BrainCircuit,
  ChevronsLeft,
  ChevronsRight,
  User,
  Dna, // Added for user panel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Dataset, View } from '@/types/types';
import Link from 'next/link';

// Define navigation items and user data types for clarity
type NavItem = {
  view: View;
  label: string;
  icon: React.ElementType;
};

type UserData = {
  name: string;
  email: string;
  avatarUrl?: string;
};

// --- Props Interface ---
interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onAddDataset: () => void;
  onAddQuery: () => void;
  datasets: Dataset[];
  defaultCollapsed?: boolean;
}

// --- Main Sidebar Component ---
export function Sidebar({
  currentView,
  onViewChange,
  onAddDataset,
  onAddQuery,
  datasets,
  defaultCollapsed = false,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Header and Collapse Toggle */}
        <header className="relative flex items-center justify-between border-b p-4">
          <Link href='/' className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <Dna className="h-7 w-7 text-blue-600" />
            <span className="text-2xl font-semibold tracking-tight">EDeepNA</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-background border hover:bg-muted"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </Button>
        </header>

        {/* Navigation and Actions */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <NavLinks isCollapsed={isCollapsed} currentView={currentView} onViewChange={onViewChange} />

          <div className="my-4 border-t" />

          <DatasetList isCollapsed={isCollapsed} datasets={datasets} currentView={currentView} onViewChange={onViewChange} />

          {/* Action buttons appear only when expanded */}
          {!isCollapsed && (
            <div className="px-4 py-2 space-y-2">
              <Button size="sm" className="w-full gap-2" onClick={onAddDataset}>
                <PlusCircle className="h-4 w-4" /> Add Dataset
              </Button>
              <Button size="sm" variant="outline" className="w-full gap-2" onClick={onAddQuery}>
                <PlusCircle className="h-4 w-4" /> Add Query
              </Button>
            </div>
          )}
        </div>

        {/* User Panel and Settings */}
        <footer className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            {/* User info */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Dr. Marine</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Data Scientist</p>
            </div>
            {/* Settings / Logout */}
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              ⚙️
            </button>
          </div>
        </footer>
      </aside>
    </TooltipProvider>
  );
}

// --- Sub-components for better organization ---

const mainNavItems: NavItem[] = [
  { view: 'global-overview', label: 'Global Overview', icon: LayoutDashboard },
  { view: 'datasets', label: 'Datasets', icon: Database },
  { view: 'queries', label: 'Query Analysis', icon: Search },
  { view: 'review', label: 'Review Panel', icon: Star },
];

function NavLinks({ isCollapsed, currentView, onViewChange }: { isCollapsed: boolean; currentView: View; onViewChange: (view: View) => void; }) {
  return (
    <nav className="grid gap-1 p-4">
      {mainNavItems.map((item) => (
        <Tooltip key={item.view}>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === item.view ? 'default' : 'ghost'}
              className={cn("justify-start gap-3", isCollapsed && "justify-center px-0 w-12 h-12")}
              onClick={() => onViewChange(item.view)}
            >
              <item.icon className="h-5 w-5" />
              <span className={cn("transition-opacity", isCollapsed && "opacity-0 w-0")}>{item.label}</span>
            </Button>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
        </Tooltip>
      ))}
    </nav>
  );
}

function DatasetList({ isCollapsed, datasets, currentView, onViewChange }: { isCollapsed: boolean; datasets: Dataset[]; currentView: View; onViewChange: (view: View) => void; }) {
  if (isCollapsed) {
    return (
      <div className="grid gap-1 p-4">
        {datasets.slice(0, 5).map((ds) => (
          <Tooltip key={ds.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === `dataset-${ds.id}` ? 'default' : 'ghost'}
                size="icon"
                className="w-12 h-12"
                onClick={() => onViewChange(`dataset-${ds.id}`)}
              >
                <FileText className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{ds.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="datasets-accordion" className="px-4">
      <AccordionItem value="datasets-accordion" className="border-none">
        <AccordionTrigger className="hover:no-underline">Your Datasets</AccordionTrigger>
        <AccordionContent className="pt-1">
          <div className="flex max-h-48 flex-col gap-1 overflow-y-auto pr-2">
            {datasets.map((ds) => (
              <Button
                key={ds.id}
                variant={currentView === `dataset-${ds.id}` ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3"
                size="sm"
                onClick={() => onViewChange(`dataset-${ds.id}`)}
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{ds.name}</span>
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}