'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { TrendingUp, BarChart2, Compass, Target } from 'lucide-react';
import React from 'react';

// --- MOCK DATA ---
const trendData = [
  { name: 'Jan', value: 180 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 220 },
  { name: 'Apr', value: 410 },
  { name: 'May', value: 280 },
  { name: 'Jun', value: 350 },
];

const taxonomicData = [
  { name: 'DS_01', familyA: 40, familyB: 30, familyC: 20, familyD: 5, other: 5 },
  { name: 'DS_02', familyA: 25, familyB: 20, familyC: 30, familyD: 15, other: 10 },
  { name: 'Vent_04', familyA: 15, familyB: 45, familyC: 25, familyD: 10, other: 5 },
];

const novelVsKnownData = [
  { name: 'Novel', value: 22 },
  { name: 'Known', value: 78 },
];

const topClustersData = [
    { name: 'C01', value: 1200 },
    { name: 'C02', value: 980 },
    { name: 'C03', value: 850 },
    { name: 'C04', value: 700 },
    { name: 'C05', value: 650 },
    { name: 'C06', value: 580 },
    { name: 'C07', value: 540 },
    { name: 'C08', value: 490 },
    { name: 'C09', value: 450 },
    { name: 'C10', value: 410 },
];

const datasetComparisonData = {
  labels: ['DS_01', 'DS_02', 'DS_03', 'AV_04', 'AV_05'],
  matrix: [
    [0, 120, 45, 10, 5],
    [120, 0, 80, 15, 8],
    [45, 80, 0, 25, 12],
    [10, 15, 25, 0, 90],
    [5, 8, 12, 90, 0],
  ],
};


import type { TooltipProps } from 'recharts';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/80 backdrop-blur-sm text-card-foreground p-3 rounded-lg border-border shadow-lg">
        <p className="font-bold text-base">{label}</p>
        {payload.map((pld, index) => {
          if (
            typeof pld === 'object' &&
            pld !== null &&
            'name' in pld &&
            'value' in pld &&
            'color' in pld
          ) {
            return (
              <p key={index} style={{ color: (pld as { color?: string }).color }}>
                {(pld as { name?: string }).name}: {(pld as { value?: number }).value}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};


export function GlobalOverview() {
  return (
    <div className="space-y-8 p-4 md:p-8 rounded-2xl">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">Global Overview</h1>
                <p className="text-muted-foreground text-md md:text-lg">Comprehensive analysis across all datasets</p>
            </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Trend of Novel Clusters Over Time */}
        <Card className="shadow-2xl bg-card/60 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold"> Trend of Novel Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--chart-1)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={2} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxonomic Coverage */}
        <Card className="shadow-2xl bg-card/60 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">Taxonomic Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taxonomicData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" width={60} tickLine={false} axisLine={false} fontSize={12} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(var(--primary-foreground-rgb), 0.1)' }} />
                    <Legend wrapperStyle={{ paddingBottom: '20px' }} align="center" />
                    <Bar dataKey="familyA" stackId="a" fill="var(--chart-2)" name="familyA" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="familyB" stackId="a" fill="var(--chart-3)" name="familyB" radius={[0, 4, 4, 0]}/>
                    <Bar dataKey="familyC" stackId="a" fill="var(--chart-4)" name="familyC" radius={[0, 4, 4, 0]}/>
                    <Bar dataKey="familyD" stackId="a" fill="var(--chart-5)" name="familyD" radius={[0, 4, 4, 0]}/>
                    <Bar dataKey="other" stackId="a" fill="var(--muted)" name="Other" radius={[0, 4, 4, 0]}/>
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Novel vs. Known Ratio */}
        <Card className="shadow-2xl bg-card/60 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">Novel vs. Known Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={novelVsKnownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="var(--chart-1)"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell key={`cell-0`} fill="var(--chart-2)" />
                  <Cell key={`cell-1`} fill="var(--muted)" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="central" fill="var(--chart-2)" className="text-4xl font-bold">
                  22%
                </text>
                 <text x="50%" y="55%" dy={5} textAnchor="middle" fill="var(--muted-foreground)">
                  Novel
                </text>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 10 Largest Clusters */}
        <Card className="shadow-2xl bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">Top 10 Largest Clusters</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topClustersData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                         <defs>
                            <linearGradient id="colorCluster" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0.2}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={12}/>
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(var(--primary-foreground-rgb), 0.1)' }} />
                        <Bar dataKey="value" name="Size" fill="url(#colorCluster)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Dataset Comparison (Shared Clusters) */}
        <Card className="lg:col-span-2 shadow-2xl bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">Dataset Comparison (Shared Clusters)</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-4">
                <div className="w-full max-w-lg grid grid-cols-[auto_repeat(5,minmax(0,1fr))] gap-2 aspect-square">
                    <div />
                    {datasetComparisonData.labels.map(label => (
                        <div key={label} className="flex items-center justify-center font-bold text-sm text-muted-foreground p-1">{label}</div>
                    ))}

                    {datasetComparisonData.matrix.flatMap((row, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center justify-center font-bold text-sm text-muted-foreground p-1">{datasetComparisonData.labels[i]}</div>
                            {row.map((value, j) => {
                                const intensity = value > 0 ? Math.min(Math.floor(value / 20), 4) : 0;
                                const colorClasses = ['bg-muted/20', 'bg-accent/40', 'bg-accent/60', 'bg-secondary/80', 'bg-primary/90'];
								const bgColor = i === j ? 'bg-card' : colorClasses[intensity];

                                return (
                                <div
                                    key={j}
                                    className={`aspect-square flex items-center justify-center rounded-md text-primary-foreground font-bold text-xs md:text-sm transition-transform duration-200 ${bgColor} ${i === j ? 'opacity-50' : 'hover:scale-105'}`}
                                    title={`Shared: ${value}`}
                                >
                                    {i !== j ? value : ''}
                                </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
