'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, ZoomIn } from 'lucide-react';

interface GemGalleryProps {
  images: string[];
  title: string;
  labCertificate: string;
}

export default function GemGallery({ images, title, labCertificate }: GemGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = images[selectedIndex] || images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="flex flex-col gap-4">
      {/* Featured Primary High-Res Display */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-neutral-950 shadow-2xl shadow-neutral-950">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20 pointer-events-none" />

        {/* Certificate Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-neutral-950/80 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300 backdrop-blur-md shadow-lg">
          <Award className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{labCertificate}</span>
        </div>

        {/* Zoom Hint Indicator */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-md bg-neutral-900/80 px-2.5 py-1 text-xs text-neutral-400 border border-neutral-800 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-[11px] uppercase tracking-wider">Hover to Inspect</span>
        </div>
      </div>

      {/* Thumbnail Selector Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? 'border-amber-400 ring-2 ring-amber-400/40 opacity-100 scale-100'
                  : 'border-neutral-800 opacity-60 hover:opacity-90 scale-95'
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

