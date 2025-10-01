'use client';

import { Button } from '@/components/ui/button';
import { Dataset, View } from '@/types/types'

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onAddDataset: () => void;
  onAddQuery: () => void;
  datasets: Dataset[];
}

export function Sidebar({
  currentView,
  onViewChange,
  onAddDataset,
  onAddQuery,
  datasets,
}: SidebarProps) {
  return (
    <div className="w-64 border-r bg-transparent p-6 flex flex-col h-full">
      <div className="space-y-2">
        <Button
          variant={currentView === 'global-overview' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onViewChange('global-overview')}
        >
          Global Overview
        </Button>
        <Button
          variant={currentView === 'datasets' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onViewChange('datasets')}
        >
          Datasets
        </Button>
        <Button
          variant={currentView === 'queries' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onViewChange('queries')}
        >
          Query Analysis
        </Button>
        <Button
          variant={currentView === 'review' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onViewChange('review')}
        >
          Review Panel
        </Button>
        <Button
          variant={currentView === 'settings' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onViewChange('settings')}
        >
          Settings
        </Button>
      </div>

      <div className="mt-auto space-y-2">
        <Button size="sm" className="w-full" onClick={onAddDataset}>
          + Add Dataset
        </Button>
        <Button size="sm" className="w-full" onClick={onAddQuery}>
          + Add Query
        </Button>

        {datasets.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Your Datasets</h3>
            <ul className="space-y-1">
              {datasets.map((ds) => (
                <li key={ds.id}>
                  <Button
                    variant={currentView === `dataset-${ds.id}` ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => onViewChange(`dataset-${ds.id}`)}
                  >
                    {ds.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}