'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Users,
  Database,
  Zap,
  Globe,
  Microscope,
  ArrowRight,
  CheckCircle,
  Dna,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const features = [
  {
    icon: Database,
    title: 'Comprehensive Analysis',
    description:
      'Upload DNA datasets or individual queries for deep analysis through our bioinformatics pipeline.',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description:
      'Track pipeline progress with visual indicators and get instant results as analysis completes.',
  },
  {
    icon: Globe,
    title: 'Interactive Dashboards',
    description:
      'Explore results through interactive visualizations, cluster browsers, and taxonomic breakdowns.',
  },
  {
    icon: Microscope,
    title: 'Scientist Review',
    description:
      'Human-in-the-loop validation system for novel discoveries with integrated review workflows.',
  },
];

const useCases = [
  'Biodiversity assessment in unexplored marine environments',
  'Novel species discovery through eDNA clustering',
  'Taxonomic classification of unknown sequences',
  'Marine ecosystem monitoring and conservation',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Dna className="h-7 w-7 text-blue-600" />
              <span className="text-2xl font-semibold tracking-tight">EDeepNA</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="#about">
                <Button variant="ghost" className="hover:bg-muted">
                  About
                </Button>
              </Link>
              <Link href="/login">
                <Button className="shadow-sm hover:shadow-md">Get Started</Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6" variant="outline">
              Deep-Sea eDNA Analysis Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Discover Marine <br />
              <span className="text-blue-600">Biodiversity</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Advanced bioinformatics platform for environmental DNA analysis —
              enabling marine biologists to uncover novel species and understand
              deep-sea ecosystems with unmatched precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="px-8 shadow-sm hover:shadow-md">
                  <Users className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-8 hover:bg-muted transition"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Advanced Analysis Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for marine eDNA research
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow border border-muted-foreground/10">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Revolutionizing Marine Biology Research
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              EDeepNA combines state-of-the-art bioinformatics algorithms with
              intuitive interfaces to help marine biologists analyze
              environmental DNA samples from the deep sea. Discover novel
              species and unlock insights into unexplored ecosystems.
            </p>
            <div className="space-y-3 mb-8">
              {useCases.map((useCase) => (
                <div key={useCase} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{useCase}</span>
                </div>
              ))}
            </div>
            <Link href="/login">
              <Button size="lg" className="px-8 shadow-sm hover:shadow-md">
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 shadow-lg border border-muted-foreground/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Analysis Progress</span>
                  <Badge variant="secondary">Running</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Quality Control</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Sequence Alignment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm">Clustering Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 bg-muted rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      Taxonomic Classification
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-xs text-muted-foreground mb-2">
                    Novel clusters found
                  </div>
                  <div className="text-2xl font-bold text-blue-600">267</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Dna className="h-7 w-7 text-blue-600" />
              <span className="text-xl font-semibold">EDeepNA</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Advancing marine biodiversity research through environmental DNA analysis
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 EDeepNA Project. All rights reserved. | Restricted to verified scientists only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}