"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Dataset {
  id: string;
  name: string;
  createdAt: string | Date;
}

interface Props {
  datasets: Dataset[];
  onDatasetClick: (id: string) => void;
}

export function Datasets({ datasets, onDatasetClick }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {datasets.map((dataset) => {
        const createdAt = dataset.createdAt instanceof Date ? dataset.createdAt : new Date(dataset.createdAt);
        return (
          <Card
            key={dataset.id}
            className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200"
            onClick={() => onDatasetClick(dataset.id)}
          >
            <CardHeader>
              <CardTitle>{dataset.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Created: {createdAt.toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">ID: {dataset.id}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}