'use client'

import { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { ChevronDown, FileDown, Search, Filter, CheckCircle, Send } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis
} from 'recharts';

// --- MOCK DATA & TYPES ---
const mockDatasetDetails = {
  id: 'ds1',
  name: 'DeepSea_Pacific_2024',
  createdAt: new Date('2024-01-15'),
  status: 'Processed',
  source: 'Pacific Ocean, Mariana Trench',
  stats: {
    totalReads: 1258394,
    totalClusters: 8472,
    novelClusters: 1932,
    avgNovelty: 34.7,
  },
};

const mockClusters = Array.from({ length: 50 }, (_, i) => ({
  id: `C${String(i + 1).padStart(3, '0')}`,
  size: Math.floor(Math.random() * 500) + 10,
  novelty: Math.round(Math.random() * 1000) / 10,
  annotation: ['Unknown', 'Bacteria', 'Archaea', 'Metazoa'][Math.floor(Math.random() * 4)],
  p_value: Number(Math.random().toExponential(2)),
  tax_confidence: `${(Math.random() * 30 + 70).toFixed(1)}%`,
  rep_seq_id: `contig_${1000 + i}`,
  top_db_match: [
    'Bathymodiolus thermophilus',
    'Sulfurimonas autotrophica',
    'Methanococcus maripaludis',
    'Candida albicans',
    'Unknown species'
  ][Math.floor(Math.random() * 5)],
  function_signal: [
    'Methane metabolism domain',
    'Sulfur oxidation pathway',
    'Methanogenesis enzyme',
    'Cell wall biosynthesis',
    'Hypothetical protein'
  ][Math.floor(Math.random() * 5)],
  abundance: `${(Math.random() * 10).toFixed(1)}%`,
  env_assoc: [
    'Linked to C021 (vents)',
    'Sediment core',
    'Hydrothermal vents',
    'Human gut',
    'Open ocean'
  ][Math.floor(Math.random() * 5)],
  novelty_category: [
    'Known genus',
    'Known species',
    'Novel genus candidate',
    'Novel species candidate'
  ][Math.floor(Math.random() * 4)],
  expert_validation: ['Reviewed ✅', 'Pending ⏳', 'Rejected ❌'][Math.floor(Math.random() * 3)],
}));

const noveltyDistributionData = Array.from({ length: 20 }, (_, i) => ({
  score: i * 5,
  count: Math.floor(Math.random() * (100 - Math.abs(i - 10) * 5) * 2) + 20
}));

const clusterSizeData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 1000,
  y: Math.random() * 100,
  z: Math.random() * 500
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm text-white p-3 rounded-lg border border-gray-700 shadow-lg">
        <p className="font-bold text-base">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {pld.name}: {pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- COMPONENT ---
export function DatasetAnalysis({ datasetId }: { datasetId: string }) {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<{ key: keyof typeof mockClusters[0]; direction: 'asc' | 'desc' }>({ key: 'novelty', direction: 'desc' });

  const handleSort = (key: keyof typeof mockClusters[0]) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const sortedClusters = [...mockClusters]
    .filter(c => c.id.toLowerCase().includes(filter.toLowerCase()) || c.annotation.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sort.key];
      const valB = b[sort.key];
      if (typeof valA === 'number' && typeof valB === 'number') return sort.direction === 'asc' ? valA - valB : valB - valA;
      if (typeof valA === 'string' && typeof valB === 'string') return sort.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return 0;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{mockDatasetDetails.name}</h1>
        <p className="text-muted-foreground">Analysis for dataset ID: {datasetId}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Total Reads</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{mockDatasetDetails.stats.totalReads.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Clusters</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{mockDatasetDetails.stats.totalClusters.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Novel Clusters</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{mockDatasetDetails.stats.novelClusters.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Avg. Novelty</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{mockDatasetDetails.stats.avgNovelty}%</p></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clusters">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clusters">Cluster Analysis</TabsTrigger>
          <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="clusters">
          <Card>
            <CardHeader>
              <CardTitle>Cluster Details</CardTitle>
              <CardDescription>Detailed breakdown of each cluster identified in the dataset.</CardDescription>
              <div className="flex items-center space-x-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Filter by ID or annotation..." className="pl-10" value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>By Novelty Score</DropdownMenuItem>
                    <DropdownMenuItem>By Annotation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => handleSort("id")}>Cluster ID <ChevronDown className="inline h-4 w-4" /></TableHead>
                      <TableHead onClick={() => handleSort("size")}>Size <ChevronDown className="inline h-4 w-4" /></TableHead>
                      <TableHead onClick={() => handleSort("novelty")}>Novelty <ChevronDown className="inline h-4 w-4" /></TableHead>
                      <TableHead>Annotation</TableHead>
                      <TableHead>P-value</TableHead>
                      <TableHead>Tax. Confidence</TableHead>
                      <TableHead>Rep. Seq ID</TableHead>
                      <TableHead>Top DB Match</TableHead>
                      <TableHead>Function Signal</TableHead>
                      <TableHead>Abundance</TableHead>
                      <TableHead>Env. Assoc.</TableHead>
                      <TableHead>Novelty Category</TableHead>
                      <TableHead>Expert Validation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedClusters.map(cluster => (
                      <TableRow key={cluster.id}>
                        <TableCell className="font-medium">{cluster.id}</TableCell>
                        <TableCell>{cluster.size}</TableCell>
                        <TableCell>
                          <Badge variant={cluster.novelty > 75 ? "destructive" : cluster.novelty > 25 ? "secondary" : "default"}>
                            {cluster.novelty}%
                          </Badge>
                        </TableCell>
                        <TableCell>{cluster.annotation}</TableCell>
                        <TableCell>{cluster.p_value}</TableCell>
                        <TableCell>{cluster.tax_confidence}</TableCell>
                        <TableCell>{cluster.rep_seq_id}</TableCell>
                        <TableCell>{cluster.top_db_match}</TableCell>
                        <TableCell>{cluster.function_signal}</TableCell>
                        <TableCell>{cluster.abundance}</TableCell>
                        <TableCell>{cluster.env_assoc}</TableCell>
                        <TableCell>{cluster.novelty_category}</TableCell>
                        <TableCell>{cluster.expert_validation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50">
              <CardHeader>
                <CardTitle className="flex items-center"><CheckCircle className="mr-3 text-green-500" />Review & Actions</CardTitle>
                <CardDescription>Provide feedback, approve the dataset, or flag for further investigation.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Enter your comments here..." className="h-24" />
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Flag for Review</Button>
                <Button><Send className="h-4 w-4 mr-2" />Submit & Approve</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Novelty Score Distribution</CardTitle>
                <CardDescription>Distribution of novelty scores across clusters</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={noveltyDistributionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNovelty" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="score" unit="%" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="count" name="Cluster Count" stroke="#8884d8" fill="url(#colorNovelty)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cluster Size Distribution</CardTitle>
                <CardDescription>Relationship between cluster size and novelty</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" name="Size" unit=" reads" />
                    <YAxis type="number" dataKey="y" name="Novelty" unit="%" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="count" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    <Scatter name='Clusters' data={clusterSizeData} fill="#8884d8" stroke="#FFFFFF" shape="circle" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}