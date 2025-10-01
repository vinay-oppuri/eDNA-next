'use client';

import Image from 'next/image';

interface PhylogeneticTreeProps {
  imageUrl: string;
  width?: number;
  height?: number;
}

export function PhylogeneticTree({ imageUrl, width = 500, height = 500 }: PhylogeneticTreeProps) {
  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <Image
        src={imageUrl}
        alt="Phylogenetic Tree"
        width={width}
        height={height}
        className="w-full h-auto rounded-lg border border-gray-300 shadow-md"
        priority
      />
    </div>
  );
}